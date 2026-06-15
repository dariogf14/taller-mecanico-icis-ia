import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Reparaciones() {
  const [reparaciones, setReparaciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [mecanico, setMecanico] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarReparaciones();
  }, []);

  const cargarReparaciones = async () => {
    try {
      const res = await api.get("/reparaciones");
      setReparaciones(res.data);
    } catch (err) {
      setError("Error al cargar reparaciones.");
    }
  };

  const borrarReparacion = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres borrar esta reparación?");
    if (!confirmar) return;

    try {
      await api.delete(`/reparaciones/${id}`);
      cargarReparaciones();
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al borrar reparación.");
    }
  };

  const filtradas = reparaciones.filter((r) => {
    const texto = `${r.titulo} ${r.descripcion} ${r.vehiculo?.matricula || ""} ${r.vehiculo?.cliente?.nombre || ""}`
      .toLowerCase();

    return (
      texto.includes(busqueda.toLowerCase()) &&
      (estado === "" || r.estado === estado) &&
      (prioridad === "" || r.prioridad === prioridad) &&
      (mecanico === "" || String(r.id_mecanico) === mecanico)
    );
  });

  const mecanicosUnicos = reparaciones
    .map((r) => r.mecanico)
    .filter(Boolean)
    .filter((m, index, arr) => arr.findIndex((x) => x.id === m.id) === index);

  return (
    <section>
      <div className="page-header">
        <h2>Reparaciones</h2>
        <Link className="btn" to="/reparaciones/nueva">Nueva reparación</Link>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="filters">
        <input
          className="input"
          placeholder="Buscar por título, descripción, matrícula o cliente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select className="input" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Finalizada">Finalizada</option>
          <option value="Cancelada">Cancelada</option>
        </select>

        <select className="input" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="">Todas las prioridades</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
          <option value="Urgente">Urgente</option>
        </select>

        <select className="input" value={mecanico} onChange={(e) => setMecanico(e.target.value)}>
          <option value="">Todos los mecánicos</option>
          {mecanicosUnicos.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre} {m.apellidos}
            </option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Vehículo</th>
            <th>Mecánico</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Coste estimado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradas.map((r) => (
            <tr key={r.id}>
              <td>{r.titulo}</td>
              <td>{r.vehiculo ? `${r.vehiculo.marca} ${r.vehiculo.modelo}` : "-"}</td>
              <td>{r.mecanico ? `${r.mecanico.nombre} ${r.mecanico.apellidos}` : "-"}</td>
              <td>{r.estado}</td>
              <td>{r.prioridad}</td>
              <td>{r.coste_estimado} €</td>
              <td className="actions">
                <Link className="btn small" to={`/reparaciones/${r.id}`}>Ver</Link>
                <Link className="btn small secondary" to={`/reparaciones/editar/${r.id}`}>Editar</Link>
                <button className="btn small danger" onClick={() => borrarReparacion(r.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Reparaciones;