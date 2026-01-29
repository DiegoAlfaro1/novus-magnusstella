module.exports = (request, response, next) => {
  let can_view = false;
  for (let permiso of request.session.permisos) {
    if (permiso.funcion == "ver") {
      can_view = true;
    }
  }

  if (can_view) {
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
