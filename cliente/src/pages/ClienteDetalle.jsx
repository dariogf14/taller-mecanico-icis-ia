import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function ClienteDetalle() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarCliente();
  }, [id]);

  const cargarCliente = async () => {
    try {
      const res = await api.get(`/clientes/${id}`);
      setCliente(res.data);
    } catch (err) {
      setError("Cliente no encontrado.");
    }
  };

  if (error) return <section><p className="error">{error}</p></section>;
  if (!cliente) return <section><p>Cargando...</p></section>;

  return (
    <section>
      <h2>{cliente.nombre} {cliente.apellidos}</h2>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Teléfono:</strong> {cliente.telefono}</p>
      <p><strong>DNI:</strong> {cliente.dni}</p>
      <p><strong>Fecha alta:</strong> {cliente.fecha_alta}</p>

      <h3>Vehículos del cliente</h3>

      {cliente.vehiculos?.length === 0 ? (
        <p>Este cliente no tiene vehículos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Matrícula</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cliente.vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.matricula}</td>
                <td>{vehiculo.estado}</td>
                <td>
                  <Link className="btn" to={`/vehiculos/${vehiculo.id}`}>Ver vehículo</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link className="btn secondary" to="/clientes">Volver</Link>
    </section>
  );
}

export default ClienteDetalle;