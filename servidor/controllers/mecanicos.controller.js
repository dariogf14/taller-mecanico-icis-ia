const { Mecanico, Reparacion } = require("../models");

const obtenerMecanicos = async (req, res) => {
  try {
    const mecanicos = await Mecanico.findAll({
      order: [["id", "ASC"]],
    });

    res.json(mecanicos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los mecánicos",
      error: error.message,
    });
  }
};

const obtenerMecanicoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const mecanico = await Mecanico.findByPk(id, {
      include: [
        {
          model: Reparacion,
          as: "reparaciones",
        },
      ],
    });

    if (!mecanico) {
      return res.status(404).json({
        mensaje: "Mecánico no encontrado",
      });
    }

    res.json(mecanico);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el mecánico",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerMecanicos,
  obtenerMecanicoPorId,
};