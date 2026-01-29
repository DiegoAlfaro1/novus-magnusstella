const express = require("express");
const app = express();

const isAuth = require("./util/is-auth");

app.set("view engine", "ejs");
app.set("views", "views");

const session = require("express-session");

app.use(function (req, res, next) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const path = require("path");
app.use(express.static(path.join(__dirname, "/public")));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const cron = require("./CRON_job/cronJob.controller");

const multer = require("multer");
//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    //'public/uploads': Es el directorio del servidor donde se subirán los archivos
    callback(null, "public/uploads/usuarios");
  },
  filename: (request, file, callback) => {
    //aquí configuramos el nombre que queremos que tenga el archivo en el servidor,
    //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
    callback(null, file.originalname);
  },
});
app.use(multer({ storage: fileStorage }).single("image"));

const routesZecore = require("./routes/zecore.routes");
const routesRespuesta = require("./routes/respuesta.routes");

// Define las rutas más específicas primero
app.use("/api", routesZecore);
app.use("/respuesta", routesRespuesta);

//PROTECCION CONTRA CROSS-SITE REQUEST FORGERY
const csrf = require("csurf");
const csrfProtection = csrf();
app.use(csrfProtection);

//FIN CSRF

const routesAplicacionResenas = require("./routes/routes1.routes"); // Cambiar el nombre de el archivo de rutas a algo más substancial
const routesLogin = require("./routes/login.routes");
const routesReview = require("./routes/resenas.routes");
const routesCorreos = require("./routes/correos.routes");
const routesGraphics = require("./routes/grafica.routes");
const routesAyuda = require("./routes/ayuda.routes");
const { read } = require("fs");

cron.start();

app.use("/users", routesLogin);
app.use("/reviews", routesReview);
app.use("/emails", routesCorreos);
app.use("/graphics", routesGraphics);
app.use("/ayuda", routesAyuda);
app.use("/", routesAplicacionResenas);

app.use(isAuth,(request, response, next) => {
  response.status(404);
  const marca = request.params.marca;
  response.render("404", {
    titulo: "Error 404",
    modo: request.getMode,
    marca: marca || "LU1",
    ruta: "/graphics/dashboard",
    permisos: request.session.permisos || [],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto: ${PORT}`);
});
