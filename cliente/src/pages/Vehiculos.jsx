import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Vehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("");
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    try {
      const res = await api.get("/vehiculos");
      setVehiculos(res.data);
    } catch (err) {
      setError("Error al cargar vehículos.");
    }
  };

  const borrarVehiculo = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres borrar este vehículo?");
    if (!confirmar) return;

    try {
      await api.delete(`/vehiculos/${id}`);
      cargarVehiculos();
    } catch (err) {
      alert(err.response?.data?.mensaje || "Error al borrar vehículo.");
    }
  };

  const filtrados = vehiculos.filter((v) => {
    const texto = `${v.marca} ${v.modelo} ${v.matricula} ${v.cliente?.nombre || ""}`
      .toLowerCase();

    return (
      texto.includes(busqueda.toLowerCase()) &&
      (estado === "" || v.estado === estado) &&
      (tipo === "" || v.tipo === tipo)
    );
  });

  return (
    <section>
      <div className="page-header">
        <h2>Vehículos</h2>
        <Link className="btn" to="/vehiculos/nuevo">Nuevo vehículo</Link>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="filters">
        <input
          className="input"
          type="text"
          placeholder="Buscar por marca, modelo, matrícula o cliente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select className="input" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="Activo">Activo</option>
          <option value="En reparación">En reparación</option>
          <option value="Entregado">Entregado</option>
          <option value="Baja">Baja</option>
        </select>

        <select className="input" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="Coche">Coche</option>
          <option value="Moto">Moto</option>
          <option value="Furgoneta">Furgoneta</option>
          <option value="Camión">Camión</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Vehículo</th>
            <th>Matrícula</th>
            <th>Cliente</th>
            <th>Tipo</th>
            <th>Km</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((v) => (
            <tr key={v.id}>
              <td>{v.marca} {v.modelo}</td>
              <td>{v.matricula}</td>
              <td>{v.cliente ? `${v.cliente.nombre} ${v.cliente.apellidos}` : "-"}</td>
              <td>{v.tipo}</td>
              <td>{v.kilometraje}</td>
              <td>{v.estado}</td>
              <td className="actions">
                <Link className="btn small" to={`/vehiculos/${v.id}`}>Ver</Link>
                <Link className="btn small secondary" to={`/vehiculos/editar/${v.id}`}>Editar</Link>
                <button className="btn small danger" onClick={() => borrarVehiculo(v.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Vehiculos;