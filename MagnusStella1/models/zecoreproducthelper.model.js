const db = require("../util/database");

module.exports = class ZecoreProductHelper {
  constructor(idProducto,marcaProducto,Nombre,Imagen,Descripcion,categoria) {
    this.idProducto = idProducto;
    this.marcaProducto = marcaProducto;
    this.Nombre = Nombre;
    this.Imagen = Imagen;
    this.Descripcion = Descripcion;
    this.categoria = categoria;
  }

  async RegistrarProducto() {
    console.log("Registrando Producto...");
    try {
      console.log(this.idProducto,this.marcaProducto,this.Nombre,this.Imagen,this.Descripcion,this.categoria)
      const result = await db.execute(
        "insert into producto(idProducto, FK_idMarca_producto, Nombre, Imagen, Descripcion, Categoria) values(?,?,?,?,?,?)",
        [
          this.idProducto,
          this.marcaProducto,
          this.Nombre,
          this.Imagen,
          this.Descripcion,
          this.categoria
        ]
      );
      console.log("Información guardada con éxito");
      console.log(result)
      return result;
    } catch (error) {
      console.error("Error en el guardado de datos: ", error);
      throw error;
    }
  }

  async ModificarProducto(id, columna, nuevoValor) {
    console.log("Modificando producto...");
    try {
      const result = await db.execute(
        `UPDATE producto SET ${columna} = ? WHERE idProducto = ?`,
        [nuevoValor, id]
      );
      console.log("Información modificada con éxito");
      return result;
    } catch (error) {
      console.error("Error en la modificación de datos: ", error);
      throw error;
    }
  }
};
