const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const Reparacion = sequelize.define(
  "Reparacion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_mecanico: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha_entrada: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_salida: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM("Pendiente", "En proceso", "Finalizada", "Cancelada"),
      allowNull: false,
      defaultValue: "Pendiente",
    },
    prioridad: {
      type: DataTypes.ENUM("Baja", "Media", "Alta", "Urgente"),
      allowNull: false,
      defaultValue: "Media",
    },
    coste_estimado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    coste_final: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "reparaciones",
    timestamps: false,
  }
);

module.exports = Reparacion;