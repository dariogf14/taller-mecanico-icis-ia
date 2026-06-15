import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function ReparacionFormulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [vehiculos, setVehiculos] = useState([]);
  const [mecanicos, setMecanicos] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id_vehiculo: "",
    id_mecanico: "",
    titulo: "",
    descripcion: "",
    fecha_entrada: "",
    fecha_salida: "",
    estado: "Pendiente",
    prioridad: "Media",
    coste_estimado: "",
    coste_final: "",
  });

  useEffect(() => {
    cargarSelects();
    if (editando) cargarReparacion();
  }, [id]);

  const cargarSelects = async () => {
    const [vehiculosRes, mecanicosRes] = await Promise.all([
      api.get("/vehiculos"),
      api.get("/mecanicos"),
    ]);

    setVehiculos(vehiculosRes.data);
    setMecanicos(mecanicosRes.data);
  };

  const cargarReparacion = async () => {
    try {
      const res = await api.get(`/reparaciones/${id}`);
      setForm({
        id_vehiculo: res.data.id_vehiculo,
        id_mecanico: res.data.id_mecanico,
        titulo: res.data.titulo,
        descripcion: res.data.descripcion,
        fecha_entrada: res.data.fecha_entrada,
        fecha_salida: res.data.fecha_salida || "",
        estado: res.data.estado,
        prioridad: res.data.prioridad,
        coste_estimado: res.data.coste_estimado,
        coste_final: res.data.coste_final || "",
      });
    } catch (err) {
      setError("No se pudo cargar la reparación.");
    }
  };

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editando) {
        await api.put(`/reparaciones/${id}`, form);
      } else {
        await api.post("/reparaciones", form);
      }

      navigate("/reparaciones");
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al guardar reparación.");
    }
  };

  return (
    <section>
      <h2>{editando ? "Editar reparación" : "Nueva reparación"}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={enviar} className="form">
        <label>Vehículo</label>
        <select name="id_vehiculo" value={form.id_vehiculo} onChange={cambiar} required>
          <option value="">Selecciona vehículo</option>
          {vehiculos.map((v) => (
            <option key={v.id} value={v.id}>
              {v.marca} {v.modelo} - {v.matricula}
            </option>
          ))}
        </select>

        <label>Mecánico</label>
        <select name="id_mecanico" value={form.id_mecanico} onChange={cambiar} required>
          <option value="">Selecciona mecánico</option>
          {mecanicos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre} {m.apellidos}
            </option>
          ))}
        </select>

        <label>Título</label>
        <input name="titulo" value={form.titulo} onChange={cambiar} required maxLength="100" />

        <label>Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={cambiar} required />

        <label>Fecha entrada</label>
        <input name="fecha_entrada" type="date" value={form.fecha_entrada} onChange={cambiar} required />

        <label>Fecha salida</label>
        <input name="fecha_salida" type="date" value={form.fecha_salida} onChange={cambiar} />

        <label>Estado</label>
        <select name="estado" value={form.estado} onChange={cambiar} required>
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Finalizada">Finalizada</option>
          <option value="Cancelada">Cancelada</option>
        </select>

        <label>Prioridad</label>
        <select name="prioridad" value={form.prioridad} onChange={cambiar} required>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
          <option value="Urgente">Urgente</option>
        </select>

        <label>Coste estimado</label>
        <input name="coste_estimado" type="number" step="0.01" min="0" value={form.coste_estimado} onChange={cambiar} required />

        <label>Coste final</label>
        <input name="coste_final" type="number" step="0.01" min="0" value={form.coste_final} onChange={cambiar} />

        <div className="form-actions">
          <button className="btn" type="submit">Guardar</button>
          <Link className="btn secondary" to="/reparaciones">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}

export default ReparacionFormulario;