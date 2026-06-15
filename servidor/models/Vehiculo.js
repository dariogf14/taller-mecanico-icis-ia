const { DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const Vehiculo = sequelize.define(
  "Vehiculo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1980,
        max: 2030,
      },
    },
    tipo: {
      type: DataTypes.ENUM("Coche", "Moto", "Furgoneta", "Camión"),
      allowNull: false,
    },
    kilometraje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    estado: {
      type: DataTypes.ENUM("Activo", "En reparación", "Entregado", "Baja"),
      allowNull: false,
      defaultValue: "Activo",
    },
  },
  {
    tableName: "vehiculos",
    timestamps: false,
  }
);

module.exports = Vehiculo;