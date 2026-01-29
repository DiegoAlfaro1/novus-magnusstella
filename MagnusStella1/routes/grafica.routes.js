const express = require("express");
const router = express.Router();
const csrf = require("csurf");
// const csrfProtection = csrf();
const controladores = require("../controllers/grafica.controller");
const isAuth = require("../util/is-auth");
const canView = require("../util/can-view");

// router.use(csrfProtection)

router.get("/dashboard/:marca", isAuth, canView, controladores.get_dashboard);
router.get("/dashboard/:marca/:categoria", isAuth, canView, controladores.get_dashboard);
router.post("/dashboard/:marca", isAuth, canView, controladores.get_dashboard);

module.exports = router;
