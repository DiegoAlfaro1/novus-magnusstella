const Usuarios = require("../models/usuarios.model");
const bcrypt = require("bcryptjs");

exports.get_login = (request, response, next) => {
  const error = request.session.error || "";
  // request.session.error = '';
  response.render("login", {
    username: request.session.username || "",
    registrar: false,
    error: error,
    csrfToken: request.csrfToken(),
    permisos: request.session.permisos || [],
  });
};

exports.post_login = (request, response, next) => {
  const email = request.body.name;
  const password = request.body.password;
  if (!email || !password) {
    return response.render("login", {
      error: "Llena todos los campos",
      csrfToken: request.csrfToken(),
    });
  }
  Usuarios.findByEmail(email)
    .then((user) => {
      if (user) {
          bcrypt
          .compare(password, user.user.contrasena)
          .then((doMatch) => {
            if (doMatch) {
              if (user.user.estado == 1) {
                Usuarios.getPermisos(email)
                  .then(([permisos, fieldData]) => {
                    request.session.isLoggedIn = true;
                    request.session.permisos = permisos;
                    request.session.user = user;
                    return request.session.save((err) => {
                      response.redirect("/");
                    });
                  })
                  .catch((error) => {
                    console.error("error en permisos");
                    console.log(error);
                  });
              } else {
                console.error("Usuario Inactivo");
                response.render("login", { 
                  error: "Usuario Inactivo",
                  csrfToken: request.csrfToken(),
                  });
              }
            } else {
              console.error("Contraseña inválida", err);
              response.render("login", {
                error: "Usuario o contrasena no son validas",
                csrfToken: request.csrfToken(),
              });
            }
          })
          .catch((err) => {
            console.error("Error during login despues de bycompare", err);
            response.render("login", {
              error: "Usuario o contrasena no son validas",
              csrfToken: request.csrfToken(),
            });
          });
      } else {
        response.redirect("/users/login");
        response.render("login", {
          error: "Usuario o contrasena no son validas" ,
          csrfToken: request.csrfToken(),
        });
      }
    })
    .catch((err) => {
      console.error("Error during login", err);
      response.render("login", {
        error: "Usuario o contrasena no son validas",
        csrfToken: request.csrfToken(),
      });
    });
};


exports.get_logout = (request, response, next) => {
  request.session.destroy(() => {
    response.redirect("/users/login");
  });
};

/////// Sign up ////////

exports.get_signup = (request, response, next) => {
  const marca = request.params.marca;

  response.render("signup", {
    titulo: "Anadir Usuarios",
    marca: marca || "LU1",
    ruta: "/users/signup",
    csrfToken: request.csrfToken(),
    permisos: request.session.permisos || [],
  });
};

exports.post_signup = (request, response, next) => {
  const marca = request.params.marca;
  const { name, email, password } = request.body;
  const IdRol = request.body.rol;
  const image = request.file?.filename || "default.png";

  if (!name || !password || !email) {
    return response.render("signup", {
      titulo: "Signup",
      error: "Llena todos los campos",
      marca: marca,
      ruta: "/usuarios/LU1/1",
    });
  }

  const usuarios = new Usuarios(name, email, password, image, IdRol);
  usuarios
    .save()
    .then(() => {
      response.redirect("/usuarios/1/LU1");
    })
    .catch((err) => {
      console.log("Error al hacer el signup:", err);
      response.redirect("/usuarios/1/LU1");
    });
};
