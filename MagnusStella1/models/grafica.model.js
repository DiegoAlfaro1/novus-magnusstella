const { search } = require("../routes/routes1.routes");
const db = require("../util/database");

exports.StarAvgLine = (marca, categoriaS, productoS, startDate, endDate) => {
  //tabla review
  let query = `SELECT CONCAT(YEAR(MAX(r.Fecha)), '-', LPAD(MONTH(MAX(r.Fecha)), 2, '0')) as Mes,
       AVG(Puntaje) as Promedio
FROM review r
JOIN venta v ON r.fk_review_venta = v.idventa 
JOIN producto p ON v.fk_venta_producto = p.idproducto
WHERE fk_idMarca_Producto = ?`;
  let parametros = [marca];

  if (categoriaS !== "*") {
    query += `
    AND Categoria = ?`;
    parametros.push(categoriaS);
  }

  if (productoS !== "*") {
    query += `
    AND p.idProducto = ?`;
    parametros.push(productoS);
  }

  if (startDate !== "*" && endDate !== "*") {
    query += ` AND v.Fecha BETWEEN ? AND ?`;
    parametros.push(startDate, endDate);
  } else if (startDate !== "*") {
    query += ` AND v.Fecha >= ?`;
    parametros.push(startDate);
  } else if (endDate !== "*") {
    query += ` AND v.Fecha <= ?`;
    parametros.push(endDate);
  }

  // agregar WHERE star fecha y final fecha = a los dos parametros que le van a llegar de el ejs y push al arreglo

  query += ` 
GROUP BY YEAR(r.Fecha), MONTH(r.Fecha)
ORDER BY YEAR(r.Fecha), MONTH(r.Fecha) ASC;`;

  return db
    .execute(query, parametros)
    .then(([rows]) => {
      if (rows.length > 0) {
        return rows.map((row) => {
          return {
            mes: row.Mes,
            promedio: row.Promedio,
          };
        });
      }
      return [];
    })
    .catch((err) => {
      console.log("Error obteniendo la información", err);
      throw err;
    });
};

exports.tasaDeRespuesta = (
  marca,
  categoriaS,
  productoS,
  startDate,
  endDate
) => {
  let query1 = `SELECT COUNT(*) as contestadas
                FROM review r
                JOIN venta v ON r.fk_review_venta = v.idventa 
                JOIN producto p ON v.fk_venta_producto = p.idproducto
                WHERE r.fk_review_venta = v.idVenta
                AND v.fk_venta_producto = p.idproducto
                AND p.fk_idMarca_producto = ?`;

  let query2 = `SELECT COUNT(*) as enviadas
                FROM venta v
                JOIN producto p ON v.fk_venta_producto = p.idproducto
                WHERE v.fk_venta_producto = p.idproducto
                AND p.fk_idmarca_producto = ?`;

  let parametros = [marca];

  if (categoriaS !== "*") {
    query1 += `
      AND p.Categoria = ?`;
    query2 += `
      AND p.Categoria = ?`;
    parametros.push(categoriaS);
  }

  if (productoS !== "*") {
    query1 += `
      AND p.idProducto = ?`;
    query2 += `
      AND p.idProducto = ?`;
    parametros.push(productoS);
  }

  if (startDate !== "*" && endDate !== "*") {
    query1 += ` 
      AND v.Fecha BETWEEN ? AND ?`;
    query2 += ` 
      AND v.Fecha BETWEEN ? AND ?`;
    parametros.push(startDate, endDate);
  } else if (startDate !== "*") {
    query1 += ` 
    AND v.Fecha >= ?`;
    query2 += ` 
    AND v.Fecha >= ?`;
    parametros.push(startDate);
  } else if (endDate !== "*") {
    query1 += ` 
    AND v.Fecha <= ?`;
    query2 += ` 
    AND v.Fecha <= ?`;
    parametros.push(endDate);
  }

  // agregar WHERE star fecha y final fecha = a los dos parametros que le van a llegar de el ejs y push al arreglo

  return Promise.all([
    db.execute(query1, parametros),
    db.execute(query2, parametros),
  ])
    .then(([[resultContestadas, fieldData1], [resultEnviadas, fieldData2]]) => {
      let contestadas = resultContestadas[0]["contestadas"];
      let enviadas = resultEnviadas[0]["enviadas"];
      let resultado = (contestadas / enviadas) * 100;

      return resultado;
    })
    .catch((err) => {
      console.error(
        "Error obteniendo la información para la tasa de respuesta:",
        err
      );
      // throw err;
    });
};

exports.ReviewsSentxMonth = (
  marca,
  categoriaS,
  productoS,
  startDate,
  endDate
) => {
  //tabla venta
  let query = `SELECT 
    CONCAT(YEAR(MAX(v.fecha)), '-', LPAD(MONTH(MAX(v.fecha)), 2, '0')) AS mes,
    COUNT(*) AS Cantidad_Enviadas
FROM 
    venta v
INNER JOIN 
    producto p ON v.fk_venta_producto = p.idProducto
WHERE
    p.FK_idMarca_Producto = ?`;

  let parametros = [marca];

  if (categoriaS !== "*") {
    query += `
        AND p.Categoria = ?`;
    parametros.push(categoriaS);
  }

  if (productoS !== "*") {
    query += `
        AND p.idProducto = ?`;
    parametros.push(productoS);
  }

  if (startDate !== "*" && endDate !== "*") {
    query += ` AND v.Fecha BETWEEN ? AND ?`;
    parametros.push(startDate, endDate);
  } else if (startDate !== "*") {
    query += ` AND v.Fecha >= ?`;
    parametros.push(startDate);
  } else if (endDate !== "*") {
    query += ` AND v.Fecha <= ?`;
    parametros.push(endDate);
  }

  // agregar WHERE star fecha y final fecha = a los dos parametros que le van a llegar de el ejs y push al arreglo

  query += `
GROUP BY 
    YEAR(v.fecha), MONTH(v.fecha)
ORDER BY 
    YEAR(v.fecha), MONTH(v.fecha);`;

  return db
    .execute(query, parametros)
    .then(([rows]) => {
      if (rows.length > 0) {
        return rows.map((row) => {
          return {
            mes: row.mes,
            enviadas: row.Cantidad_Enviadas,
          };
        });
      }
      return [];
    })
    .catch((err) => {
      console.log("Error obteniendo la información", err);
    });
};

exports.StarAvgNumber = (marca, categoriaS, productoS, startDate, endDate) => {
  let query = `SELECT avg(Puntaje)
    FROM review r, venta v, producto p
    WHERE r.fk_review_venta = v.idventa
    AND v.fk_venta_producto = idproducto
AND fk_idmarca_producto = ? `;
  let parametros = [marca];

  if (categoriaS !== "*") {
    query += `
and Categoria = ? `;
    parametros.push(categoriaS);
  }

  if (productoS !== "*") {
    query += `
AND idproducto = ? `;
    parametros.push(productoS);
  }

  if (startDate !== "*" && endDate !== "*") {
    query += ` AND v.Fecha BETWEEN ? AND ?`;
    parametros.push(startDate, endDate);
  } else if (startDate !== "*") {
    query += ` AND v.Fecha >= ?`;
    parametros.push(startDate);
  } else if (endDate !== "*") {
    query += ` AND v.Fecha <= ?`;
    parametros.push(endDate);
  }

  query += `;`;

  // agregar WHERE star fecha y final fecha = a los dos parametros que le van a llegar de el ejs y push al arreglo

  return db
    .execute(query, parametros)
    .then((resultContestadas) => {
      let resultado = resultContestadas[0][0]["avg(Puntaje)"];
      return resultado;
    })
    .catch((err) => {
      console.error(
        "Error obteniendo la información para el promedio de estrellas:",
        err
      );
      // throw err;
    });
};

exports.search = (valor_busqueda, marca) => {
  let query = `SELECT * FROM producto WHERE idProducto = ?
    AND FK_idMarca_Producto = ?`;
  return db.execute(query, [valor_busqueda, marca]).then(([rows]) => {
    if (rows.length === 0) {
      return { error: "Producto no existente" };
    } else {
      return { error: undefined };
    }
  });
};
