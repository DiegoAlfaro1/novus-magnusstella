const Usuarios = require("../models/usuarios.model");

exports.post_marca = (request, response, next) => {
  request.session.marca = "xxx";
};

exports.get_usuarios = (request, response, next) => {
  const marca = request.params.marca;
  const pag = parseInt(request.params.pag) || 1; // Asegúrate de que 'pag' sea un número

  Usuarios.fetchPag(pag)
    .then((result) => {
      response.render("usuarios", {
        usuarios: result.users,
        titulo: "Usuarios",
        marca: marca || "LU1",
        currentPage: pag,
        pageSize: result.pageSize,
        totalUsers: result.totalUsers,
        totalPages: result.totalPages,
        ruta: "/usuarios/" + pag,
        permisos: request.session.permisos || [],
        csrfToken: request.csrfToken(),
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send("Error al recuperar los usuarios");
    });
};

exports.get_editar = (request, response, next) => {

  const marca = request.params.marca;

  Usuarios.fetch(request.params.pag, request.params.usuario_id)
    .then(([rows, fieldData]) => {
      response.render("editar_usuarios", {
        usuarios: rows,
        titulo: "Usuarios",
        marca: marca || "LU1",
        ruta: "/usuarios/editar/" + request.params.usuario_id,
        permisos: request.session.permisos || [],
        csrfToken: request.csrfToken(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.post_editar = (request, response, next) => {
  var correo = request.body.correo || "";
  var password = request.body.password || "";
  var IdRol = request.body.idrol || "";
  var idUser = request.body.uIdusuario || "";
  var Nombre = request.body.nombre;
  var Estado = request.body.estado;
  // const correos = require("../app.js/")

  Usuarios.saveUsernameChanges(IdRol, password, correo, idUser, Nombre, Estado)
    .then(() => {
      response.redirect("/usuarios/1/LU1");
    })
    .catch((err) => {
      console.log("Error al hacer el guardado:", err);
      response.redirect("/usuarios/1/LU1");
    });
};

exports.post_delete = (request, response, next) => {
  let currentPage = request.body.currentPage || 1;
  let marca = request.body.marca || "LU1";
  Usuarios.delete(request.body.id)
    .then(() => {
      return Usuarios.usuarios_fetchPag(currentPage);
    })
    .then(([result1]) => {
      usuarios = result1
      return Usuarios.resto_fetchPag(currentPage);
    })
    .then((result2) => {
      return response.status(200).json({ 
        usuarios: usuarios,
        marca: request.body.marca || "LU1",
        currentPage: currentPage,
        pageSize: result2.pageSize,
        totalUsers: result2.totalUsers,
        totalPages: result2.totalPages,
      });

    })
    .catch((error) => {
      console.log(error);
    });
};

exports.get_registroUsuarios = (request, response, next) => {
  const marca = request.params.marca;

  Usuarios.getRegistros()
    .then(([usuarios, fieldData]) => {
      response.render("registroUsuarios", {
        usuarios: usuarios,
        titulo: "Usuarios",
        marca: marca,
        ruta: "/usuarios/registro",
        permisos: request.session.permisos || [],
        csrfToken: request.csrfToken(),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
