const sequelize = require("../config/mysql");

const Cliente = require("./Cliente");
const Vehiculo = require("./Vehiculo");
const Mecanico = require("./Mecanico");
const Reparacion = require("./Reparacion");

// Relaciones Cliente - Vehiculo
Cliente.hasMany(Vehiculo, {
  foreignKey: "id_cliente",
  as: "vehiculos",
});

Vehiculo.belongsTo(Cliente, {
  foreignKey: "id_cliente",
  as: "cliente",
});

// Relaciones Vehiculo - Reparacion
Vehiculo.hasMany(Reparacion, {
  foreignKey: "id_vehiculo",
  as: "reparaciones",
});

Reparacion.belongsTo(Vehiculo, {
  foreignKey: "id_vehiculo",
  as: "vehiculo",
});

// Relaciones Mecanico - Reparacion
Mecanico.hasMany(Reparacion, {
  foreignKey: "id_mecanico",
  as: "reparaciones",
});

Reparacion.belongsTo(Mecanico, {
  foreignKey: "id_mecanico",
  as: "mecanico",
});

module.exports = {
  sequelize,
  Cliente,
  Vehiculo,
  Mecanico,
  Reparacion,
};