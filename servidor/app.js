const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarMongoDB = require("./config/mongodb");

const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());

const clientesRoutes = require("./routes/clientes.routes");
const vehiculosRoutes = require("./routes/vehiculos.routes");
const mecanicosRoutes = require("./routes/mecanicos.routes");
const reparacionesRoutes = require("./routes/reparaciones.routes");
const diagnosticosRoutes = require("./routes/diagnosticos.routes");

app.use("/api/clientes", clientesRoutes);
app.use("/api/vehiculos", vehiculosRoutes);
app.use("/api/mecanicos", mecanicosRoutes);
app.use("/api/reparaciones", reparacionesRoutes);
app.use("/api/diagnosticos", diagnosticosRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    mensaje: "API del Gestor de Taller Mecánico funcionando correctamente",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();

    res.json({
      estado: "ok",
      servicio: "servidor taller mecánico",
      mysql: "conectado",
    });
  } catch (error) {
    res.status(500).json({
      estado: "error",
      mensaje: "Error al conectar con MySQL",
      error: error.message,
    });
  }
});

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL correcta");

    await conectarMongoDB();

    await sequelize.sync();
    console.log("Modelos sincronizados con MySQL");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
  }
};

iniciarServidor();