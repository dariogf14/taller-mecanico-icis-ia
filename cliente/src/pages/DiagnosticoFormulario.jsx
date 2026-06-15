import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function DiagnosticoFormulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [reparaciones, setReparaciones] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id_reparacion_mysql: "",
    titulo: "",
    descripcion: "",
    estado: "Pendiente",
    prioridad: "Media",
    codigo_error_obd: "",
    kilometraje: "",
    observaciones: "",
  });

  useEffect(() => {
    cargarReparaciones();
    if (editando) cargarDiagnostico();
  }, [id]);

  const cargarReparaciones = async () => {
    const res = await api.get("/reparaciones");
    setReparaciones(res.data);
  };

  const cargarDiagnostico = async () => {
    try {
      const res = await api.get(`/diagnosticos/${id}`);
      const d = res.data;

      setForm({
        id_reparacion_mysql: d.id_reparacion_mysql,
        titulo: d.titulo,
        descripcion: d.descripcion,
        estado: d.estado,
        prioridad: d.prioridad,
        codigo_error_obd: d.metadatos_tecnicos?.codigo_error_obd || "",
        kilometraje: d.metadatos_tecnicos?.kilometraje || "",
        observaciones: d.metadatos_tecnicos?.observaciones || "",
      });
    } catch (err) {
      setError("No se pudo cargar el diagnóstico.");
    }
  };

  const cambiar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      id_reparacion_mysql: Number(form.id_reparacion_mysql),
      titulo: form.titulo,
      descripcion: form.descripcion,
      estado: form.estado,
      prioridad: form.prioridad,
      metadatos_tecnicos: {
        codigo_error_obd: form.codigo_error_obd,
        kilometraje: form.kilometraje ? Number(form.kilometraje) : null,
        observaciones: form.observaciones,
      },
    };

    try {
      if (editando) {
        await api.put(`/diagnosticos/${id}`, payload);
      } else {
        await api.post("/diagnosticos", payload);
      }

      navigate("/diagnosticos");
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al guardar diagnóstico.");
    }
  };

  return (
    <section>
      <h2>{editando ? "Editar diagnóstico" : "Nuevo diagnóstico"}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={enviar} className="form">
        <label>Reparación asociada</label>
        <select
          name="id_reparacion_mysql"
          value={form.id_reparacion_mysql}
          onChange={cambiar}
          required
        >
          <option value="">Selecciona reparación</option>
          {reparaciones.map((r) => (
            <option key={r.id} value={r.id}>
              #{r.id} - {r.titulo}
            </option>
          ))}
        </select>

        <label>Título</label>
        <input name="titulo" value={form.titulo} onChange={cambiar} required />

        <label>Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={cambiar} required />

        <label>Estado</label>
        <select name="estado" value={form.estado} onChange={cambiar} required>
          <option value="Pendiente">Pendiente</option>
          <option value="En revisión">En revisión</option>
          <option value="Resuelto">Resuelto</option>
          <option value="Descartado">Descartado</option>
        </select>

        <label>Prioridad</label>
        <select name="prioridad" value={form.prioridad} onChange={cambiar} required>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
          <option value="Crítica">Crítica</option>
        </select>

        <label>Código error OBD</label>
        <input name="codigo_error_obd" value={form.codigo_error_obd} onChange={cambiar} />

        <label>Kilometraje</label>
        <input name="kilometraje" type="number" min="0" value={form.kilometraje} onChange={cambiar} />

        <label>Observaciones técnicas</label>
        <textarea name="observaciones" value={form.observaciones} onChange={cambiar} />

        <div className="form-actions">
          <button className="btn" type="submit">Guardar</button>
          <Link className="btn secondary" to="/diagnosticos">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}

export default DiagnosticoFormulario;