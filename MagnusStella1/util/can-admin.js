module.exports = (request, response, next) => {
  let can_admin = false;
  for (let permiso of request.session.permisos) {
    if (permiso.funcion == "administracion") {
      can_admin = true;
    }
  }

  if (can_admin) {
    next();
  } else {
    response.status(403);
    return response.render("403", {
      titulo: "403",
      marca: "LU1",
      permisos: request.session.permisos || [],
      ruta: "/graphics/dashboard",
    });
  }
};
