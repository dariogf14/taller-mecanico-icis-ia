import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const res = await api.get("/clientes");
      setClientes(res.data);
    } catch (err) {
      setError("Error al cargar clientes.");
    }
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    `${cliente.nombre} ${cliente.apellidos} ${cliente.email} ${cliente.dni}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <section>
      <h2>Clientes</h2>
      {error && <p className="error">{error}</p>}

      <input
        className="input"
        type="text"
        placeholder="Buscar cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nombre} {cliente.apellidos}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.dni}</td>
              <td>
                <Link className="btn" to={`/clientes/${cliente.id}`}>Ver ficha</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Clientes;