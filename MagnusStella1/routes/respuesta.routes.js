const express = require("express");
const router = express.Router();

const respuestasC = require("../controllers/respuesta.controller");

router.post('/MailResponse', respuestasC.post_MailResponse);
router.get('/RespuestExitosa',respuestasC.getEncuestExitosa);
router.get('/RespuestaDuplicada',respuestasC.getEncuestaRepetida);
module.exports = router