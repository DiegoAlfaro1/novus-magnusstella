const respuestaM = require("../models/respuesta.model");


exports.post_MailResponse = async (request, response, next) => {
  const resp = request.body;
  rating = resp.rate;
  title = resp.titulo_review;
  desc = resp.descripcion_review;
  idventa = resp.idVenta;
  obj = new respuestaM()
  idrev = await obj.CreateReview(idventa,desc,title,rating);

  
  if(isNaN(idrev)){
    response.redirect("/respuesta/RespuestaDuplicada")
  }else{
    for (const clave in resp){
      if (clave.startsWith('answer_')){
        const idPregunta = parseInt(clave.split('_')[1]);
        const respuestas = resp[clave];
  
        if(Array.isArray(resp[clave])){
          for (const respuesta of respuestas){
            obj.AddResponse(idrev,respuesta,idPregunta);
          }
      }
      else{
        obj.AddResponse(idrev,respuestas,idPregunta);
      }
    }
  }
  response.redirect("/respuesta/RespuestExitosa");
  }
};

exports.getEncuestExitosa = (request,response,next) => {
  response.render('encuestaExitosa');
};

exports.getEncuestaRepetida = (request,response,next) => {
  response.render('encuestaRepetida');
};
