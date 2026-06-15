import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function VehiculoDetalle() {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarVehiculo();
  }, [id]);

  const cargarVehiculo = async () => {
    try {
      const res = await api.get(`/vehiculos/${id}`);
      setVehiculo(res.data);
    } catch (err) {
      setError("Vehículo no encontrado.");
    }
  };

  if (error) return <section><p className="error">{error}</p></section>;
  if (!vehiculo) return <section><p>Cargando...</p></section>;

  return (
    <section>
      <h2>{vehiculo.marca} {vehiculo.modelo}</h2>

      <p><strong>Matrícula:</strong> {vehiculo.matricula}</p>
      <p><strong>Año:</strong> {vehiculo.anio}</p>
      <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
      <p><strong>Kilometraje:</strong> {vehiculo.kilometraje}</p>
      <p><strong>Estado:</strong> {vehiculo.estado}</p>

      {vehiculo.cliente && (
        <p>
          <strong>Cliente:</strong>{" "}
          <Link to={`/clientes/${vehiculo.cliente.id}`}>
            {vehiculo.cliente.nombre} {vehiculo.cliente.apellidos}
          </Link>
        </p>
      )}

      <h3>Reparaciones asociadas</h3>

      {vehiculo.reparaciones?.length === 0 ? (
        <p>No tiene reparaciones asociadas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Fecha entrada</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {vehiculo.reparaciones.map((r) => (
              <tr key={r.id}>
                <td>{r.titulo}</td>
                <td>{r.estado}</td>
                <td>{r.prioridad}</td>
                <td>{r.fecha_entrada}</td>
                <td>
                  <Link className="btn small" to={`/reparaciones/${r.id}`}>Ver reparación</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link className="btn secondary" to="/vehiculos">Volver</Link>
    </section>
  );
}

export default VehiculoDetalle;