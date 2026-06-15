const { Vehiculo, Cliente, Reparacion } = require("../models");

const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll({
      include: [
        {
          model: Cliente,
          as: "cliente",
        },
      ],
      order: [["id", "ASC"]],
    });

    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los vehículos",
      error: error.message,
    });
  }
};

const obtenerVehiculoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculo = await Vehiculo.findByPk(id, {
      include: [
        {
          model: Cliente,
          as: "cliente",
        },
        {
          model: Reparacion,
          as: "reparaciones",
        },
      ],
    });

    if (!vehiculo) {
      return res.status(404).json({
        mensaje: "Vehículo no encontrado",
      });
    }

    res.json(vehiculo);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el vehículo",
      error: error.message,
    });
  }
};

const crearVehiculo = async (req, res) => {
  try {
    const {
      id_cliente,
      marca,
      modelo,
      matricula,
      anio,
      tipo,
      kilometraje,
      estado,
    } = req.body;

    if (!id_cliente || !marca || !modelo || !matricula || !anio || !tipo) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios",
      });
    }

    if (kilometraje < 0) {
      return res.status(400).json({
        mensaje: "El kilometraje no puede ser negativo",
      });
    }

    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) {
      return res.status(404).json({
        mensaje: "El cliente indicado no existe",
      });
    }

    const matriculaExistente = await Vehiculo.findOne({
      where: { matricula },
    });

    if (matriculaExistente) {
      return res.status(400).json({
        mensaje: "Ya existe un vehículo con esa matrícula",
      });
    }

    const nuevoVehiculo = await Vehiculo.create({
      id_cliente,
      marca,
      modelo,
      matricula,
      anio,
      tipo,
      kilometraje,
      estado,
    });

    res.status(201).json({
      mensaje: "Vehículo creado correctamente",
      vehiculo: nuevoVehiculo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el vehículo",
      error: error.message,
    });
  }
};

const actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculo = await Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({
        mensaje: "Vehículo no encontrado",
      });
    }

    const {
      id_cliente,
      marca,
      modelo,
      matricula,
      anio,
      tipo,
      kilometraje,
      estado,
    } = req.body;

    if (!id_cliente || !marca || !modelo || !matricula || !anio || !tipo) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios",
      });
    }

    if (kilometraje < 0) {
      return res.status(400).json({
        mensaje: "El kilometraje no puede ser negativo",
      });
    }

    const cliente = await Cliente.findByPk(id_cliente);

    if (!cliente) {
      return res.status(404).json({
        mensaje: "El cliente indicado no existe",
      });
    }

    const matriculaExistente = await Vehiculo.findOne({
      where: { matricula },
    });

    if (matriculaExistente && matriculaExistente.id !== Number(id)) {
      return res.status(400).json({
        mensaje: "Ya existe otro vehículo con esa matrícula",
      });
    }

    await vehiculo.update({
      id_cliente,
      marca,
      modelo,
      matricula,
      anio,
      tipo,
      kilometraje,
      estado,
    });

    res.json({
      mensaje: "Vehículo actualizado correctamente",
      vehiculo,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el vehículo",
      error: error.message,
    });
  }
};

const borrarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculo = await Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({
        mensaje: "Vehículo no encontrado",
      });
    }

    const reparacionesAsociadas = await Reparacion.count({
      where: { id_vehiculo: id },
    });

    if (reparacionesAsociadas > 0) {
      return res.status(400).json({
        mensaje:
          "No se puede borrar el vehículo porque tiene reparaciones asociadas",
      });
    }

    await vehiculo.destroy();

    res.json({
      mensaje: "Vehículo borrado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al borrar el vehículo",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  borrarVehiculo,
};