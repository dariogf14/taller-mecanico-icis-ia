import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Diagnosticos() {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [estado, setEstado] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDiagnosticos();
  }, []);

  const cargarDiagnosticos = async () => {
    try {
      const res = await api.get("/diagnosticos");
      setDiagnosticos(res.data);
    } catch (err) {
      setError("Error al cargar diagnósticos.");
    }
  };

  const borrarDiagnostico = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres borrar este diagnóstico?");
    if (!confirmar) return;

    try {
      await api.delete(`/diagnosticos/${id}`);
      cargarDiagnosticos();
    } catch (err) {
      alert("Error al borrar diagnóstico.");
    }
  };

  const filtrados = diagnosticos.filter((d) => {
    const texto = `${d.titulo} ${d.descripcion}`.toLowerCase();

    return (
      texto.includes(busqueda.toLowerCase()) &&
      (estado === "" || d.estado === estado) &&
      (prioridad === "" || d.prioridad === prioridad)
    );
  });

  return (
    <section>
      <div className="page-header">
        <h2>Diagnósticos</h2>
        <Link className="btn" to="/diagnosticos/nuevo">Nuevo diagnóstico</Link>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="filters">
        <input
          className="input"
          placeholder="Buscar diagnóstico..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select className="input" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En revisión">En revisión</option>
          <option value="Resuelto">Resuelto</option>
          <option value="Descartado">Descartado</option>
        </select>

        <select className="input" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="">Todas las prioridades</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
          <option value="Crítica">Crítica</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Reparación MySQL</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Metadatos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((d) => (
            <tr key={d._id}>
              <td>{d.titulo}</td>
              <td>{d.id_reparacion_mysql}</td>
              <td>{d.estado}</td>
              <td>{d.prioridad}</td>
              <td>
                <pre>{JSON.stringify(d.metadatos_tecnicos, null, 2)}</pre>
              </td>
              <td className="actions">
                <Link className="btn small secondary" to={`/diagnosticos/editar/${d._id}`}>Editar</Link>
                <button className="btn small danger" onClick={() => borrarDiagnostico(d._id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Diagnosticos;