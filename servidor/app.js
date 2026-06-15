const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    mensaje: "API del Gestor de Taller Mecánico funcionando correctamente",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    estado: "ok",
    servicio: "servidor taller mecánico",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});