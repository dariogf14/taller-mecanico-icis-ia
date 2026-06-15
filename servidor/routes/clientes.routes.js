const express = require("express");
const router = express.Router();

const {
  obtenerClientes,
  obtenerClientePorId,
} = require("../controllers/clientes.controller");

router.get("/", obtenerClientes);
router.get("/:id", obtenerClientePorId);

module.exports = router;