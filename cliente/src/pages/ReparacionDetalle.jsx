import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ReparacionDetalle() {
  const { id } = useParams();
  const [reparacion, setReparacion] = useState(null);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const cargarDatos = async () => {
    try {
      const repRes = await api.get(`/reparaciones/${id}`);
      const diagRes = await api.get(`/diagnosticos?id_reparacion_mysql=${id}`);

      setReparacion(repRes.data);
      setDiagnosticos(diagRes.data);
    } catch (err) {
      setError("Reparación no encontrada.");
    }
  };

  if (error) return <section><p className="error">{error}</p></section>;
  if (!reparacion) return <section><p>Cargando...</p></section>;

  return (
    <section>
      <h2>{reparacion.titulo}</h2>

      <p><strong>Descripción:</strong> {reparacion.descripcion}</p>
      <p><strong>Estado:</strong> {reparacion.estado}</p>
      <p><strong>Prioridad:</strong> {reparacion.prioridad}</p>
      <p><strong>Fecha entrada:</strong> {reparacion.fecha_entrada}</p>
      <p><strong>Fecha salida:</strong> {reparacion.fecha_salida || "Pendiente"}</p>
      <p><strong>Coste estimado:</strong> {reparacion.coste_estimado} €</p>
      <p><strong>Coste final:</strong> {reparacion.coste_final || "-"} €</p>

      {reparacion.vehiculo && (
        <p>
          <strong>Vehículo:</strong>{" "}
          <Link to={`/vehiculos/${reparacion.vehiculo.id}`}>
            {reparacion.vehiculo.marca} {reparacion.vehiculo.modelo} - {reparacion.vehiculo.matricula}
          </Link>
        </p>
      )}

      {reparacion.mecanico && (
        <p>
          <strong>Mecánico:</strong> {reparacion.mecanico.nombre} {reparacion.mecanico.apellidos}
        </p>
      )}

      <h3>Diagnósticos asociados</h3>

      <Link className="btn" to="/diagnosticos/nuevo">Nuevo diagnóstico</Link>

      {diagnosticos.length === 0 ? (
        <p>No hay diagnósticos para esta reparación.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticos.map((d) => (
              <tr key={d._id}>
                <td>{d.titulo}</td>
                <td>{d.estado}</td>
                <td>{d.prioridad}</td>
                <td>
                  <Link className="btn small secondary" to={`/diagnosticos/editar/${d._id}`}>
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link className="btn secondary" to="/reparaciones">Volver</Link>
    </section>
  );
}

export default ReparacionDetalle;