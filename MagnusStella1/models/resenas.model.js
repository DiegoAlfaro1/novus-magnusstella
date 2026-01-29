const db = require("../util/database.js");

module.exports = class Reviews {
  constructor(id, idventa, description, title, date, punctuation, marc) {
    this.idReview = id;
    this.review_Venta = idventa;
    this.descripcion = description;
    this.titulo = title;
    this.fecha = date;
    this.puntuacion = punctuation;
    this.marca = marc;
  }

  static fetchAll(marca, callback) {
    const query = `
        SELECT 
            r.idReview AS idreview, 
            r.Descripcion AS descripcion, 
            r.Titulo AS titulo, 
            CONCAT(DATE_FORMAT(r.Fecha, '%d'), " ",
            CASE
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Jan' THEN 'Ene'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Apr' THEN 'Abr'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Aug' THEN 'Ago'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Dec' THEN 'Dic'
              ELSE DATE_FORMAT(r.Fecha, '%b') 
            END, ", ",
            DATE_FORMAT(r.Fecha, '%Y')) AS fecha,
            r.Puntaje AS puntaje, 
            r.Visibilidad AS visible,
            v.Fk_Venta_Producto AS idProducto
  
        FROM 
            review r
        JOIN 
            venta v ON r.Fk_Review_Venta = v.idVenta
        JOIN 
            producto p ON v.Fk_Venta_Producto = p.idProducto
	
		WHERE 
			  p.FK_idMarca_Producto = ? `;
    db.execute(query, [marca])
      .then(([rows]) => {
        callback(null, rows);
      })
      .catch((err) => {
        console.error(
          "Error fetching reviews and product IDs from database:",
          err
        );
        callback(err, []);
      });
  }

  static fetchCompleto(idReview, callback) {
    const query = `
        SELECT 
            c.nombre AS nombre_cliente,
            p.nombre AS nombre_producto,
            r.Puntaje AS estrellas_resena,
            r.Titulo AS titulo_resena,
            CONCAT(DATE_FORMAT(r.Fecha, '%d'), " ",
            CASE
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Jan' THEN 'Ene'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Apr' THEN 'Abr'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Aug' THEN 'Ago'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Dec' THEN 'Dic'
              ELSE DATE_FORMAT(r.Fecha, '%b') 
            END, ", ",
            DATE_FORMAT(r.Fecha, '%Y')) AS fecha,
            r.Descripcion AS descripcion_resena,
            r.idReview AS id_resena,
            r.Visibilidad AS visibilidad,
            pre.Descripcion AS pregunta,
            resp.Descripción AS respuesta,
            p.FK_idMarca_Producto AS marca

        FROM 
            cliente c
        JOIN 
            venta v ON c.idCliente = v.Fk_Venta_Cliente
        JOIN 
            producto p ON v.Fk_Venta_Producto = p.idProducto
        JOIN 
            review r ON v.idVenta = r.Fk_Review_Venta
        JOIN
            respuestas resp ON r.idReview = resp.FK_Respuestas_Review 
        JOIN
            pregunta pre ON resp.Fk_Respuestas_Pregunta = pre.idPregunta

        WHERE
            r.idReview = ?`;
    db.execute(query, [idReview])
      .then(([rows]) => {
        if (rows.length > 0) {
          callback(null, rows[0]); // Devuelve solo la primera fila encontrada
        } else {
          callback(new Error("Review not found"), null);
        }
      })
      .catch((err) => {
        console.error("Error fetching complete review from database:", err);
        callback(err, null);
      });
  }
  static search(valor_busqueda, marca, callback) {
    const query = `
            SELECT 
                r.idReview AS idreview, 
                r.Descripcion AS descripcion, 
                r.Titulo AS titulo, 
                CONCAT(DATE_FORMAT(r.Fecha, '%d'), " ",
                CASE
                  WHEN DATE_FORMAT(r.Fecha, '%b') = 'Jan' THEN 'Ene'
                  WHEN DATE_FORMAT(r.Fecha, '%b') = 'Apr' THEN 'Abr'
                  WHEN DATE_FORMAT(r.Fecha, '%b') = 'Aug' THEN 'Ago'
                  WHEN DATE_FORMAT(r.Fecha, '%b') = 'Dec' THEN 'Dic'
                  ELSE DATE_FORMAT(r.Fecha, '%b') 
                END, ", ",
                DATE_FORMAT(r.Fecha, '%Y')) AS fecha,
                r.Puntaje AS puntaje, 
                r.Visibilidad AS visible,
                v.Fk_Venta_Producto AS idProducto

            FROM review r
            JOIN venta v ON r.Fk_Review_Venta = v.idVenta
            JOIN producto p ON v.Fk_Venta_Producto = p.idProducto 
            WHERE 
                p.idProducto LIKE ?
            AND
                p.FK_idMarca_Producto = ? `;

    const params = [valor_busqueda + "%", marca]; // Combinar los parámetros en un solo array

    db.execute(query, params) // Pasar solo un array de parámetros
      .then(([rows]) => {
        callback(null, rows);
      })
      .catch((err) => {
        console.error(
          "Error fetching reviews and product IDs from database:",
          err
        );
        callback(err, []);
      });
  }

  static async actualizarvisibilidad(idreview, visibilidad) {
    try {
      const [result] = await db.execute(
        `UPDATE review 
        SET Visibilidad = ? 
        WHERE idReview = ?`,
        [visibilidad, idreview]
      );

      // Verificar si se actualizó al menos una fila.
      if (result.affectedRows > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al actualizar la visibilidad:", error);
      throw error;
    }
  }

  static fetch_f(marca, orden, startDate, endDate, callback) {
    let query = `
        SELECT 
            r.idReview AS idreview, 
            r.Descripcion AS descripcion, 
            r.Titulo AS titulo, 
            CONCAT(DATE_FORMAT(r.Fecha, '%d'), " ",
            CASE
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Jan' THEN 'Ene'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Apr' THEN 'Abr'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Aug' THEN 'Ago'
              WHEN DATE_FORMAT(r.Fecha, '%b') = 'Dec' THEN 'Dic'
              ELSE DATE_FORMAT(r.Fecha, '%b') 
            END, ", ",
            DATE_FORMAT(r.Fecha, '%Y')) AS fecha,
            r.Puntaje AS puntaje, 
            r.Visibilidad AS visible,
            v.Fk_Venta_Producto AS idProducto
        FROM 
            review r
        JOIN 
            venta v ON r.Fk_Review_Venta = v.idVenta
        JOIN 
            producto p ON v.Fk_Venta_Producto = p.idProducto
        WHERE 
            p.FK_idMarca_Producto = ? `;

    let parametros = [marca];

    if (startDate !== "*" && endDate !== "*") {
      query += ` AND r.Fecha BETWEEN ? AND ?`;
      parametros.push(startDate, endDate);
    } else if (startDate !== "*") {
      query += ` AND r.Fecha >= ?`;
      parametros.push(startDate);
    } else if (endDate !== "*") {
      query += ` AND r.Fecha <= ?`;
      parametros.push(endDate);
    }

    if (orden === "ascendente") {
      query += ` ORDER BY r.Puntaje ASC`;
    } else if (orden === "descendente") {
      query += ` ORDER BY r.Puntaje DESC`;
    }

    db.execute(query, parametros)
      .then(([rows]) => {
        callback(null, rows);
      })
      .catch((err) => {
        console.error(
          "Error fetching reviews and product IDs from database:",
          err
        );
        callback(err, []);
      });
  }

  static async reviewtotalrespuestas(idreview, pregunta) {
    const query =
      "SELECT COUNT(Idrespuestas) as count FROM respuestas WHERE fk_respuestas_review = ? AND fk_respuestas_pregunta = ?";
    const [rows] = await db.execute(query, [idreview, pregunta]);
    return rows[0].count;
  }

  static async reviewtotalpreguntas(idreview) {
    const query =
      `SELECT  COUNT(DISTINCT fk_respuestas_pregunta)  as count 
       FROM respuestas
       WHERE fk_respuestas_review = ? `;
    const [rows] = await db.execute(query, [idreview]); // Usamos await para esperar la ejecución de la consulta
    return rows[0].count;
  }

  static async reviewpreguntaid(id_r) {
    const query = `
        SELECT fk_respuestas_pregunta
        FROM respuestas
        WHERE fk_respuestas_review = ?`;

        const [rows] = await db.execute(query, [id_r]); // Usamos await para esperar la ejecución de la consulta
        return rows;
  }  
  static async pregunta_descrip(idp) {
    const query = `
        SELECT Descripcion
        FROM pregunta
        WHERE idPregunta = ? `;

        const [rows] = await db.execute(query, [idp]); // Usamos await para esperar la ejecución de la consulta
        return rows.map(row => row['Descripcion']);
  }  
  static async reviewrespuestas(idreview, pregunta) {
    const query = `
        SELECT Descripción
        FROM respuestas
        WHERE fk_respuestas_review = ? AND fk_respuestas_pregunta = ?`;

        const [rows] = await db.execute(query, [idreview, pregunta]); // Usamos await para esperar la ejecución de la consulta
        return rows;
  }  
};



