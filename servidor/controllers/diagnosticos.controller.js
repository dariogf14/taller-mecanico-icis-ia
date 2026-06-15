const Diagnostico = require("../models/Diagnostico");
const { Reparacion } = require("../models");

const obtenerDiagnosticos = async (req, res) => {
  try {
    const { estado, prioridad, id_reparacion_mysql } = req.query;

    const filtros = {};

    if (estado) {
      filtros.estado = estado;
    }

    if (prioridad) {
      filtros.prioridad = prioridad;
    }

    if (id_reparacion_mysql) {
      filtros.id_reparacion_mysql = Number(id_reparacion_mysql);
    }

    const diagnosticos = await Diagnostico.find(filtros).sort({
      fecha_creacion: -1,
    });

    res.json(diagnosticos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los diagnósticos",
      error: error.message,
    });
  }
};

const obtenerDiagnosticoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const diagnostico = await Diagnostico.findById(id);

    if (!diagnostico) {
      return res.status(404).json({
        mensaje: "Diagnóstico no encontrado",
      });
    }

    res.json(diagnostico);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el diagnóstico",
      error: error.message,
    });
  }
};

const crearDiagnostico = async (req, res) => {
  try {
    const {
      id_reparacion_mysql,
      titulo,
      descripcion,
      estado,
      prioridad,
      metadatos_tecnicos,
    } = req.body;

    if (!id_reparacion_mysql || !titulo || !descripcion || !estado || !prioridad) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios",
      });
    }

    const reparacion = await Reparacion.findByPk(id_reparacion_mysql);

    if (!reparacion) {
      return res.status(404).json({
        mensaje: "La reparación indicada no existe en MySQL",
      });
    }

    const nuevoDiagnostico = await Diagnostico.create({
      id_reparacion_mysql,
      titulo,
      descripcion,
      estado,
      prioridad,
      metadatos_tecnicos: metadatos_tecnicos || {},
    });

    res.status(201).json({
      mensaje: "Diagnóstico creado correctamente",
      diagnostico: nuevoDiagnostico,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el diagnóstico",
      error: error.message,
    });
  }
};

const actualizarDiagnostico = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      id_reparacion_mysql,
      titulo,
      descripcion,
      estado,
      prioridad,
      metadatos_tecnicos,
    } = req.body;

    if (!id_reparacion_mysql || !titulo || !descripcion || !estado || !prioridad) {
      return res.status(400).json({
        mensaje: "Faltan campos obligatorios",
      });
    }

    const reparacion = await Reparacion.findByPk(id_reparacion_mysql);

    if (!reparacion) {
      return res.status(404).json({
        mensaje: "La reparación indicada no existe en MySQL",
      });
    }

    const diagnosticoActualizado = await Diagnostico.findByIdAndUpdate(
      id,
      {
        id_reparacion_mysql,
        titulo,
        descripcion,
        estado,
        prioridad,
        metadatos_tecnicos: metadatos_tecnicos || {},
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!diagnosticoActualizado) {
      return res.status(404).json({
        mensaje: "Diagnóstico no encontrado",
      });
    }

    res.json({
      mensaje: "Diagnóstico actualizado correctamente",
      diagnostico: diagnosticoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el diagnóstico",
      error: error.message,
    });
  }
};

const borrarDiagnostico = async (req, res) => {
  try {
    const { id } = req.params;

    const diagnostico = await Diagnostico.findByIdAndDelete(id);

    if (!diagnostico) {
      return res.status(404).json({
        mensaje: "Diagnóstico no encontrado",
      });
    }

    res.json({
      mensaje: "Diagnóstico borrado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al borrar el diagnóstico",
      error: error.message,
    });
  }
};

module.exports = {
  obtenerDiagnosticos,
  obtenerDiagnosticoPorId,
  crearDiagnostico,
  actualizarDiagnostico,
  borrarDiagnostico,
};