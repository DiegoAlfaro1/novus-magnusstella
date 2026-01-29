const express = require("express");
const router = express.Router();
const controladores = require("../controllers/renderHtml");
const isAuth = require("../util/is-auth");
const canAdmin = require("../util/can-admin");

router.get("/usuarios/editar/:usuario_id/:marca", isAuth, canAdmin, controladores.get_editar);
router.post("/usuarios/editar/:usuario_id", isAuth, canAdmin, controladores.post_editar);
router.get("/usuarios/registro/:marca", isAuth, canAdmin, controladores.get_registroUsuarios);
router.get("/usuarios/:pag/:marca", isAuth, canAdmin, controladores.get_usuarios);
router.post("/usuarios/delete", isAuth, canAdmin, controladores.post_delete);
router.get("/", isAuth,(request, response, next) => {
  response.redirect("/graphics/dashboard/LU1");
});

module.exports = router;
