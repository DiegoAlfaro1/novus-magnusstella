const express = require("express");
const router = express.Router();
const controladores = require("../controllers/correos.controller");
const isAuth = require("../util/is-auth");
const canEdit = require("../util/can-edit");

router.get("/correos/editar/:marca/:pregunta_id", isAuth, canEdit, controladores.get_correos_editar);
router.delete("/delete/:pregunta_id", isAuth, canEdit, controladores.borrar_pregunta)
router.post("/correos/editar/", isAuth, canEdit, controladores.post_editar_correos);
router.get("/correos/:marca", isAuth, canEdit, controladores.get_correos);
router.get("/correos/crear/:marca", isAuth, canEdit, controladores.get_correos_crear);
router.post("/correos/crear/:marca", isAuth, canEdit, controladores.post_crear_correos);
router.post("/correos/actualizarDias/:marca", isAuth, canEdit, controladores.post_dias);
module.exports = router;
