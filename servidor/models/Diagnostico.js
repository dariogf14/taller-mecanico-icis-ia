const mongoose = require("mongoose");

const diagnosticoSchema = new mongoose.Schema(
  {
    id_reparacion_mysql: {
      type: Number,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      enum: ["Pendiente", "En revisión", "Resuelto", "Descartado"],
      default: "Pendiente",
      required: true,
    },
    prioridad: {
      type: String,
      enum: ["Baja", "Media", "Alta", "Crítica"],
      default: "Media",
      required: true,
    },
    metadatos_tecnicos: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    fecha_creacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "diagnosticos",
    versionKey: false,
  }
);

const Diagnostico = mongoose.model("Diagnostico", diagnosticoSchema);

module.exports = Diagnostico;