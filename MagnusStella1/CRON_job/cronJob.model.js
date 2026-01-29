const db = require("../util/database");

exports.getVentasTime = () => {
  return db.execute(`
    SELECT
    c.nombre,
    c.Correo AS mail,
    p.nombre AS nombreProducto,
    m.idMarca,
    v.idVenta
FROM
    venta v
    JOIN cliente c ON v.FK_Venta_Cliente = c.idCliente
    JOIN producto p ON v.FK_Venta_Producto = p.idProducto
    JOIN marca m ON p.FK_idMarca_Producto = m.idMarca
WHERE
    DATEDIFF(CURRENT_TIMESTAMP(), v.Fecha) = m.Dias
    `);
};
