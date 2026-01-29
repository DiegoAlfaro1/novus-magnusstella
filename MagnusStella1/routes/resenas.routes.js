const express = require("express");
const router = express.Router();
const controladores = require("../controllers/resenas.controller");
const isAuth = require("../util/is-auth");
const canView = require("../util/can-view");

// Asigna controladores específicos a cada ruta
router.get("/resenas/:marca/buscar/:valor_busqueda", isAuth, canView, controladores.get_buscar);
router.get("/resenas/:marca/buscar", isAuth, canView, controladores.get_buscar);
router.get("/resenas/:marca", isAuth, canView, controladores.get_resenas);
router.post("/resenas/visibilidad/:id",isAuth,canView,controladores.post_visibilidad);
router.get("/resenas_completas/:marca/:id",isAuth,canView,controladores.get_resenas_completas);
router.get("/resenas/enviar_resenia/:marca",isAuth,canView,controladores.enviar_resenia);
router.post("/resenas/:marca", isAuth, canView, controladores.get_resenas_f);
// router.get("/correos/:marca", controladores.get_correos);

module.exports = router;
