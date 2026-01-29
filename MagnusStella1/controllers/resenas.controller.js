const Reviews = require("../models/resenas.model");
const Correos = require("../models/correos.model");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

//Definimos las variables para nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_KEY,
  },
});

exports.get_resenas_completas = async (request, response, next) => {
  try {
    const marca = request.params.marca;
    const idReview = request.params.id; 
    const total_p = await Reviews.reviewtotalpreguntas(idReview); // Espera a que se resuelva la promesa
    const id_p = await Reviews.reviewpreguntaid(idReview);
  
    const respuestas = [];
    const total_respuestas = [];
    const preguntas = [];

    for (let i = 0; i < total_p; i++) {
      const respuesta = await Reviews.reviewrespuestas(idReview, id_p[i].fk_respuestas_pregunta);
      const total_r = await Reviews.reviewtotalrespuestas(idReview, id_p[i].fk_respuestas_pregunta);
      const pregunta = await Reviews.pregunta_descrip(id_p[i].fk_respuestas_pregunta);
      respuestas.push(respuesta);
      total_respuestas.push(total_r);
      preguntas.push(pregunta);
    }
    
    
    // Obtiene el ID de la reseña de los parámetros de la solicitud
    // Llama al método fetchCompleto del modelo para obtener los datos de la reseña completa
    Reviews.fetchCompleto(idReview, (err, resenaCompleta) => {
      if (err) {
        return response.status(500).send("Error fetching complete review");
      }

      if (!resenaCompleta) {
        return response.status(404).send("Reseña no encontrada");
      }

      // Renderiza la vista de la reseña completa y pasa los datos de la reseña
      response.render("resenas_completas", {
        resena: resenaCompleta,
        titulo: "Reseña Completa",
        marca: marca || "LU1",
        csrfToken: request.csrfToken(),
        ruta: "/reviews/resenas",
        permisos: request.session.permisos || [],
        total_p: total_p,
        total_respuestas: total_respuestas,
        respuestas: respuestas,
        preguntas: preguntas,
      });
    });
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    response.status(500).send("Error interno del servidor");
  }
};

exports.get_resenas = (request, response, next) => {
  const marca = request.params.marca;
  const idReview = request.params.id;
  Reviews.fetchAll(marca, (err, resenasList) => {
    if (err) {
      return response.status(500);
    }
    const resenas = resenasList.map((resena) => ({
      id: resena.idreview,
      title: resena.titulo,
      resena_descrip: resena.descripcion,
      estrellas: resena.puntaje,
      itemcode: resena.idProducto,
      visibilidad: resena.visible,
      fecha: resena.fecha,
    }));

    response.render("resenas", {
      resenas: resenas,
      titulo: "Reseñas",
      marca: marca || "LU1",
      id: idReview,
      ruta: "/reviews/resenas",
      csrfToken: request.csrfToken(),
      permisos: request.session.permisos || [],
    });
  });
};

exports.get_buscar = (request, response, next) => {
  const marca = request.params.marca;
  const valor_busqueda = request.params.valor_busqueda;
  const permisos = request.session.permisos || [];
  Reviews.search(valor_busqueda, marca, (err, resenas) => {
    if (err) {
      console.log(err);
      return response.status(500).json({ error: "Error al buscar reseñas" });
    }
    return response.status(200).json({ resenas: resenas, permisos:permisos });
  });
};

//---------------------------------------------------------------Enviar Correos ---------------------------------------------------

exports.enviar_resenia = async (
  marcaS,
  nombreProducto,
  nombreCliente,
  idVenta,
  mail
) => {
  const marca = marcaS;
  let marcaNombre = "";

  if (marcaS === "LU1") {
    marcaNombre = "Luuna";
  } else if (marcaS === "NO1") {
    marcaNombre = "Nooz";
  } else {
    marcaNombre = "Mappa";
  }

  try {
    //Recuperamos los valores para el template de resenias
    const total = await Correos.emailpreguntas(marca); // Espera a que se resuelva la promesa

    const { preguntas, idp } = await Correos.emailConfiguration(marca);
    const tipos = [];
    const opciones = [];
    const total_opciones = [];
    for (let i = 0; i < total; i++) {
      const tipo = await Correos.emailtipo_pre(idp[i].idPregunta);
      const opcion = await Correos.emailopciones(idp[i].idPregunta);
      const to_opcion = await Correos.emailcountopcion(idp[i].idPregunta);
      tipos.push(tipo);
      opciones.push(opcion);
      total_opciones.push(to_opcion);
    }

    //Renderizamos el template del ejs
    ejs.renderFile(
      "views/prueba_correo.ejs",
      {
        preguntas: preguntas,
        nombreProducto: nombreProducto,
        nombreCliente: nombreCliente,
        idVenta: idVenta,
        titulo: "Correos",
        marca: marca,
        ruta: "/reviews/resenas/enviar_resenia/LU1",
        idp: idp,
        total: total,
        tipos: tipos,
        opciones: opciones,
        idp: idp,
        total_opciones: total_opciones,
        attachments: [
          {
            filename: "image.png",
            path: `./public/images/${marca}.png`,
            cid: "unique@nodemailer.com", //same cid value as in the html img src
          },
        ],
      },
      function (err, template) {
        if (err) {
          console.log("Error: ", err);
        } else {
          //Usamos main para enviar los correos
          async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
              from: `Nos encantaria tu opinion sobre ${marcaNombre} <magnusstellacore@gmail.com>`, // sender address
              to: mail, // list of receivers //va a ser cambiado por mail
              subject: `Hola ${nombreCliente} nos interesa tu opinion acerca de ${nombreProducto} `, // Subject line
              html: template,
              attachments: [
                {
                  filename: "image.png",
                  path: `./public/images/${marca}.png`,
                  cid: "unique@nodemailer.com", //same cid value as in the html img src
                },
              ],
            });

            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
          }

          //Mandamos a crear el correo y si falla nos manda el error
          main().catch(console.error);
        }
      }
    );
  } catch (error) {
    console.error("Error al cargar las preguntas:", error);
    response.status(500).send("Error interno del servidor");
  }
};

exports.post_visibilidad = (request, response, next) => {
  const nvisibilidad = request.body.visibilidad;
  const idrev = request.params.id;
  Reviews.actualizarvisibilidad(idrev, nvisibilidad, (err, resenas) => {
    if (err) {
      console.log(err);
      return response
        .status(500)
        .json({ error: "Error al actualizar visibilidad" });
    }
    return response.status(200).json({ resenas: resenas });
  }); //Toma el estado de la visibilidad del body y el id de la review a modificar del url.
};

exports.get_resenas_f = (request, response, next) => {
  const marca = request.params.marca;
  const idReview = request.params.id;
  let orden = request.body.orden || "*"; //"AN1133V"
  let startDate = request.body.startDate || "*";
  let endDate = request.body.endDate || "*";
  Reviews.fetch_f(marca, orden, startDate, endDate, (err, resenasList) => {
    const resenas = resenasList.map((resena) => ({
      id: resena.idreview,
      title: resena.titulo,
      resena_descrip: resena.descripcion,
      estrellas: resena.puntaje,
      itemcode: resena.idProducto,
      visibilidad: resena.visible,
      fecha: resena.fecha,
    }));

    response.render("resenas", {
      resenas: resenas,
      titulo: "Reseñas",
      marca: marca || "LU1",
      id: idReview,
      ruta: "/reviews/resenas",
      csrfToken: request.csrfToken(),
      permisos: request.session.permisos || [],
    });
  });
};
