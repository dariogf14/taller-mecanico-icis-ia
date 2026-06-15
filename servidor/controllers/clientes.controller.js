const { Cliente, Vehiculo } = require("../models");

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      order: [["id", "ASC"]],
    });

    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los clientes",
      error: error.message,
    });
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id, {
      include: [
        {
          model: Vehiculo,
          as: "vehiculos",
        },
      ],
    });

    if (!cliente) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado",
      });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el cliente",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerClientes,
  obtenerClientePorId,
};