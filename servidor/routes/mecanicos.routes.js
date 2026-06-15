const express = require("express");
const router = express.Router();

const {
  obtenerReparaciones,
  obtenerReparacionPorId,
  crearReparacion,
  actualizarReparacion,
  borrarReparacion,
} = require("../controllers/reparaciones.controller");

router.get("/", obtenerReparaciones);
router.get("/:id", obtenerReparacionPorId);
router.post("/", crearReparacion);
router.put("/:id", actualizarReparacion);
router.delete("/:id", borrarReparacion);

module.exports = router;