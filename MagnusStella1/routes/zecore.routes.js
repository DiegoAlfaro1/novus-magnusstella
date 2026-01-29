const express = require("express");
const router = express.Router();

const zecoreC = require("../controllers/zecore.controller");

router.post(
  "/zecore/NewProduct",
  zecoreC.validateToken,
  zecoreC.post_NewProduct
);
router.post(
  "/zecore/ModifyProduct",
  zecoreC.validateToken,
  zecoreC.post_ModifyProduct
);
router.post("/zecore/venta", zecoreC.validateToken, zecoreC.post_venta);

module.exports = router;
