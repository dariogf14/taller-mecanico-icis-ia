const express = require("express");
const router = express.Router();

const {
  obtenerMecanicos,
  obtenerMecanicoPorId,
} = require("../controllers/mecanicos.controller");

router.get("/", obtenerMecanicos);
router.get("/:id", obtenerMecanicoPorId);

module.exports = router;