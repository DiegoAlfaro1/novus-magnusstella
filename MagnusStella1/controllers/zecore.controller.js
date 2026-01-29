const ZecoreSaleHelper = require("../models/zecoresaleshelper.model");
const ZecoreProductHelper = require("../models/zecoreproducthelper.model");

exports.validateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  // validar token
  if (!token || token !== process.env.API_KEY) {
    return res.status(403).json({ message: "Acceso no autorizado." });
  }
  // token ok, seguir
  next();
};

exports.post_ModifyProduct = (request, response, next) => {
  const MP = request.body;
  const ModifyProduct = new ZecoreProductHelper();
  ModifyProduct.ModificarProducto(MP.idProducto, MP.Columna, MP.NuevoValor)
    .then(() => {
      return response
        .status(200)
        .json({ message: "Hemos recibido la información" });
    })
    .catch((error) => {
      let errorMessage;
      if (error.message.startsWith("Unknown column")){
        errorMessage = "Parece haber un error de sintáxis en la columna a editar, favor de verificarlo. Si tiene dudas, acceda al documento 'Manual de uso Zecore'."
      }else if (error.message.startsWith("Bind parameters must not contain undefined")){
        errorMessage = "Asegúrese de capturar todos los parámetros necesarios para la modificación";}
      else{
        errorMessage = error.message
      }
      console.log("Error al recibir la información: " + errorMessage);
      return response
        .status(500)
        .json({ message: "Error al recibir la información: " + errorMessage });
    });
};

exports.post_NewProduct = (request, response, next) => {
  const data = request.body;
  const { idProducto, marcaProducto, nombre, imagen, descripcion, categoria } =
    data;
  const NEWproduct = new ZecoreProductHelper(
    idProducto,
    marcaProducto,
    nombre,
    imagen,
    descripcion,
    categoria
  );
  NEWproduct.RegistrarProducto()
    .then(() => {
      return response
        .status(200)
        .json({ message: "Hemos recibido la información" });
    })
    .catch((error) => {
      let errorMessage;
      if (error.message.startsWith("Bind parameters must not contain undefined")){
        errorMessage = "Asegúrese de capturar todos los parámetros necesarios para la creación del producto. Para más información consulte 'Manual de uso - Zecore'."
      }else if (error.message.startsWith("Cannot add or update a child row")){
        errorMessage = "Asegúrese de mandar correctamente el id de la marca. Si necesita ayuda, acceda al recurso 'Manual de uso - Zecore'.";
      }else{
        errorMessage = error.message
      }
      console.log("Error al recibir la información: " + errorMessage);
      return response
        .status(500)
        .json({ message: "Error al recibir la información: " + errorMessage });
    });
};

exports.post_venta = async (request, response, next) => {
  const data = request.body;
  const { Cliente, Nombre, Correo, Producto_id, Fecha, SalesON} = data;
  const venta = new ZecoreSaleHelper(Cliente,Nombre,Correo, Producto_id, Fecha, SalesON);
  let x= await venta.FindCliente()
  if(x === false){
    await venta.AddCliente();
  }
  await venta.RegistrarVenta()
    .then(() => {
      return response.status(200).json({
        message: "Hemos recibido la información",
      });
    })
    .catch((error) => {
      let errorMessage;
      if (error.message.startsWith("Cannot add or update a child row")){
        errorMessage = "Uso inapropiado de llaves foráneas, asegúrese de que el producto esté disponible en la base de datos"
      }else if (error.message.startsWith("Bind parameters must not contain undefined")){
        errorMessage = "Asegúrese de capturar todos los parámetros necesarios para la modificación";}
      else{
        errorMessage = error.message
      }
      console.log("Error al recibir la información " + errorMessage);
      return response
        .status(500)
        .json({ message: "Error al recibir la información: " + errorMessage});
    });
};
