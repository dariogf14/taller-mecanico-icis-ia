import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

function VehiculoFormulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editando = Boolean(id);

  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id_cliente: "",
    marca: "",
    modelo: "",
    matricula: "",
    anio: "",
    tipo: "Coche",
    kilometraje: "",
    estado: "Activo",
  });

  useEffect(() => {
    cargarClientes();
    if (editando) cargarVehiculo();
  }, [id]);

  const cargarClientes = async () => {
    const res = await api.get("/clientes");
    setClientes(res.data);
  };

  const cargarVehiculo = async () => {
    try {
      const res = await api.get(`/vehiculos/${id}`);
      setForm({
        id_cliente: res.data.id_cliente,
        marca: res.data.marca,
        modelo: res.data.modelo,
        matricula: res.data.matricula,
        anio: res.data.anio,
        tipo: res.data.tipo,
        kilometraje: res.data.kilometraje,
        estado: res.data.estado,
      });
    } catch (err) {
      setError("No se pudo cargar el vehículo.");
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
        await api.put(`/vehiculos/${id}`, form);
      } else {
        await api.post("/vehiculos", form);
      }

      navigate("/vehiculos");
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al guardar vehículo.");
    }
  };

  return (
    <section>
      <h2>{editando ? "Editar vehículo" : "Nuevo vehículo"}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={enviar} className="form">
        <label>Cliente</label>
        <select name="id_cliente" value={form.id_cliente} onChange={cambiar} required>
          <option value="">Selecciona cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre} {c.apellidos}
            </option>
          ))}
        </select>

        <label>Marca</label>
        <input name="marca" value={form.marca} onChange={cambiar} required maxLength="50" />

        <label>Modelo</label>
        <input name="modelo" value={form.modelo} onChange={cambiar} required maxLength="50" />

        <label>Matrícula</label>
        <input name="matricula" value={form.matricula} onChange={cambiar} required maxLength="15" />

        <label>Año</label>
        <input name="anio" type="number" value={form.anio} onChange={cambiar} required min="1980" max="2030" />

        <label>Tipo</label>
        <select name="tipo" value={form.tipo} onChange={cambiar} required>
          <option value="Coche">Coche</option>
          <option value="Moto">Moto</option>
          <option value="Furgoneta">Furgoneta</option>
          <option value="Camión">Camión</option>
        </select>

        <label>Kilometraje</label>
        <input name="kilometraje" type="number" value={form.kilometraje} onChange={cambiar} required min="0" />

        <label>Estado</label>
        <select name="estado" value={form.estado} onChange={cambiar} required>
          <option value="Activo">Activo</option>
          <option value="En reparación">En reparación</option>
          <option value="Entregado">Entregado</option>
          <option value="Baja">Baja</option>
        </select>

        <div className="form-actions">
          <button className="btn" type="submit">Guardar</button>
          <Link className="btn secondary" to="/vehiculos">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}

export default VehiculoFormulario;