const express = require("express");
const router = express.Router();
const csrf = require("csurf");
// const csrfProtection = csrf();
const controladores = require("../controllers/ayuda.controller");
const isAuth = require("../util/is-auth");
const canView = require("../util/can-view");
const canEdit = require("../util/can-edit");
const canAdmin = require("../util/can-admin");
// router.use(csrfProtection)

router.get("/:marca", isAuth, controladores.get_ayuda);

router.get("/login/:marca", isAuth, controladores.get_ayuda_login);
router.get("/dashboard/:marca", isAuth, canView, controladores.get_ayuda_dashboard);
router.get("/resenas/:marca", isAuth, canView, controladores.get_ayuda_resenas);
router.get("/correos/:marca", isAuth, canEdit, controladores.get_ayuda_correos);
router.get("/usuarios/:marca", isAuth, canAdmin, controladores.get_ayuda_usuarios);
router.get("/general/:marca", isAuth, canView, controladores.get_ayuda_general);

module.exports = router;
