const express = require("express");
const router = express.Router();
const controladores = require("../controllers/usuarios.controller");
const Usuarios = require("../models/usuarios.model");
const isAuth = require("../util/is-auth");
const canAdmin = require("../util/can-admin");

router.get("/login", controladores.get_login);
router.post("/login", controladores.post_login);
router.get("/logout", controladores.get_logout);
router.get("/signup/:marca", isAuth, canAdmin, controladores.get_signup);
router.post("/signup", isAuth, canAdmin, controladores.post_signup);

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
router.post("/validate-password", (req, res) => {
  const { password } = req.body;

  if (passwordRegex.test(password)) {
    res.json({ valid: true });
  } else {
    res.json({
      valid: false,
      message:
        "La contrasena tiene que tener al menos 10 caracteres, al menos una letra mayuscula y miniscula, un numero y uno de los siguientes simbolos especiales (@$!%*?&).",
    });
  }
});

module.exports = router;
