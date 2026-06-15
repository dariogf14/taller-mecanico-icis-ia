const express = require("express");
const router = express.Router();

const {
  obtenerReparaciones,
  obtenerReparacionPorId,
} = require("../controllers/reparaciones.controller");

router.get("/", obtenerReparaciones);
router.get("/:id", obtenerReparacionPorId);

module.exports = router;