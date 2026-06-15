const express = require("express");
const router = express.Router();

const {
  obtenerDiagnosticos,
  obtenerDiagnosticoPorId,
  crearDiagnostico,
  actualizarDiagnostico,
  borrarDiagnostico,
} = require("../controllers/diagnosticos.controller");

router.get("/", obtenerDiagnosticos);
router.get("/:id", obtenerDiagnosticoPorId);
router.post("/", crearDiagnostico);
router.put("/:id", actualizarDiagnostico);
router.delete("/:id", borrarDiagnostico);

module.exports = router;