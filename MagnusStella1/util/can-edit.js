module.exports = (request, response, next) => {
  let can_edit = false;
  for (let permiso of request.session.permisos) {
    if (permiso.funcion == "editar") {
      can_edit = true;
    }
  }

  if (can_edit) {
    next();
  } else {
    response.status(403);
    return response.render("403", {
      marca: marca || "LU1",
      permisos: request.session.permisos || [],
      ruta: "/graphics/dashboard",
    });
  }
};
