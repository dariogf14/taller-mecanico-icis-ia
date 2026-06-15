const express = require("express");
const router = express.Router();

const {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  borrarVehiculo,
} = require("../controllers/vehiculos.controller");

router.get("/", obtenerVehiculos);
router.get("/:id", obtenerVehiculoPorId);
router.post("/", crearVehiculo);
router.put("/:id", actualizarVehiculo);
router.delete("/:id", borrarVehiculo);

module.exports = router;