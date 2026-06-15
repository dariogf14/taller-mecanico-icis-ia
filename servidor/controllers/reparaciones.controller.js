const { Reparacion, Vehiculo, Mecanico, Cliente } = require("../models");

const obtenerReparaciones = async (req, res) => {
  try {
    const reparaciones = await Reparacion.findAll({
      include: [
        {
          model: Vehiculo,
          as: "vehiculo",
          include: [
            {
              model: Cliente,
              as: "cliente",
            },
          ],
        },
        {
          model: Mecanico,
          as: "mecanico",
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json(reparaciones);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las reparaciones",
      error: error.message,
    });
  }
};

const obtenerReparacionPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const reparacion = await Reparacion.findByPk(id, {
      include: [
        {
          model: Vehiculo,
          as: "vehiculo",
          include: [
            {
              model: Cliente,
              as: "cliente",
            },
          ],
        },
        {
          model: Mecanico,
          as: "mecanico",
        },
      ],
    });

    if (!reparacion) {
      return res.status(404).json({
        mensaje: "Reparación no encontrada",
      });
    }

    res.json(reparacion);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la reparación",
      error: error.message,
    });
  }
};

const crearReparacion = async (req, res) => {
  try {
    const {
      id_vehiculo,
      id_mecanico,
      titulo,
      descripcion,
      fecha_entrada,
      fecha_salida,
      estado,
      prioridad,
      coste_estimado,
      coste_final,
    } = req.body;

    if (
      !id_vehiculo ||
      !id_mecanico ||
      !titulo ||
      !descripcion ||
      !fecha_entrada ||
      !estado ||
      !prioridad ||
      coste_estimado === undefined
    ) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios",
      });
    }

    if (Number(coste_estimado) < 0 || Number(coste_final || 0) < 0) {
      return res.status(400).json({
        mensaje: "Los costes no pueden ser negativos",
      });
    }

    const vehiculo = await Vehiculo.findByPk(id_vehiculo);

    if (!vehiculo) {
      return res.status(404).json({
        mensaje: "El vehículo indicado no existe",
      });
    }

    const mecanico = await Mecanico.findByPk(id_mecanico);

    if (!mecanico) {
      return res.status(404).json({
        mensaje: "El mecánico indicado no existe",
      });
    }

    const nuevaReparacion = await Reparacion.create({
      id_vehiculo,
      id_mecanico,
      titulo,
      descripcion,
      fecha_entrada,
      fecha_salida: fecha_salida || null,
      estado,
      prioridad,
      coste_estimado,
      coste_final: coste_final || null,
    });

    res.status(201).json({
      mensaje: "Reparación creada correctamente",
      reparacion: nuevaReparacion,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la reparación",
      error: error.message,
    });
  }
};

const actualizarReparacion = async (req, res) => {
  try {
    const { id } = req.params;

    const reparacion = await Reparacion.findByPk(id);

    if (!reparacion) {
      return res.status(404).json({
        mensaje: "Reparación no encontrada",
      });
    }

    const {
      id_vehiculo,
      id_mecanico,
      titulo,
      descripcion,
      fecha_entrada,
      fecha_salida,
      estado,
      prioridad,
      coste_estimado,
      coste_final,
    } = req.body;

    if (
      !id_vehiculo ||
      !id_mecanico ||
      !titulo ||
      !descripcion ||
      !fecha_entrada ||
      !estado ||
      !prioridad ||
      coste_estimado === undefined
    ) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios",
      });
    }

    if (Number(coste_estimado) < 0 || Number(coste_final || 0) < 0) {
      return res.status(400).json({
        mensaje: "Los costes no pueden ser negativos",
      });
    }

    const vehiculo = await Vehiculo.findByPk(id_vehiculo);

    if (!vehiculo) {
      return res.status(404).json({
        mensaje: "El vehículo indicado no existe",
      });
    }

    const mecanico = await Mecanico.findByPk(id_mecanico);

    if (!mecanico) {
      return res.status(404).json({
        mensaje: "El mecánico indicado no existe",
      });
    }

    await reparacion.update({
      id_vehiculo,
      id_mecanico,
      titulo,
      descripcion,
      fecha_entrada,
      fecha_salida: fecha_salida || null,
      estado,
      prioridad,
      coste_estimado,
      coste_final: coste_final || null,
    });

    res.json({
      mensaje: "Reparación actualizada correctamente",
      reparacion,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la reparación",
      error: error.message,
    });
  }
};

const borrarReparacion = async (req, res) => {
  try {
    const { id } = req.params;

    const reparacion = await Reparacion.findByPk(id);

    if (!reparacion) {
      return res.status(404).json({
        mensaje: "Reparación no encontrada",
      });
    }

    await reparacion.destroy();

    res.json({
      mensaje: "Reparación borrada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al borrar la reparación",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerReparaciones,
  obtenerReparacionPorId,
  crearReparacion,
  actualizarReparacion,
  borrarReparacion,
};