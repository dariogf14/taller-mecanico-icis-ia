const mongoose = require("mongoose");
require("dotenv").config();

const conectarMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión a MongoDB correcta");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
  }
};

module.exports = conectarMongoDB;