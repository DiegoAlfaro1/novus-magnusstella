const db = require("../util/database");

module.exports = class ZecoreSalesHelper {
  constructor(Clienteid,nom,correo, Producto_id, Fecha, SalesOrdernum) {
    this.Cliente_nom = Clienteid;
    this.nom = nom;
    this.correo = correo;
    this.Producto_id = Producto_id;
    this.Fecha = Fecha;
    this.SalesOrdernum = SalesOrdernum;
  }

  async FindCliente(){
    try{
      const result = await db.execute('select idCliente from cliente where idCliente = ?',[this.Cliente_nom]);
      console.log('Resultado Find: '+ result)
      if(result[0].length > 0){
        return true;
      }else{
        return false;
      }
    } catch (error){
      console.error('Error al acceder a la base de datos: '+ error);
      throw error;
    }
  }

  async AddCliente(){
    try{
      const result = await db.execute('insert into cliente (idCliente,nombre,Correo) values (?,?,?)',
      [this.Cliente_nom,this.nom,this.correo]);
      console.log("Se agregó el cliente con éxito");
      return result;
    } catch (error){
      console.error('Error al acceder a la base de datos: '+ error);
      throw error;
    }
  }

  async RegistrarVenta() {
    console.log("Registrando venta...");
    try {
      const result = await db.execute(
        "insert into venta (idVenta, Fk_Venta_Cliente, Fk_Venta_Producto, Fecha, SalesOrderNum) values (default, ?, ?, ?, ?)",
        [this.Cliente_nom, this.Producto_id, this.Fecha, this.SalesOrdernum]
      );
      console.log("Información guardada con éxito");
      return result;
    } catch (error) {
      console.error("Error en el guardado de datos: ", error);
      throw error;
    }
  }
};
