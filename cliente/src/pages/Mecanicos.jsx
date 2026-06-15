import { useEffect, useState } from "react";
import api from "../services/api";

function Mecanicos() {
  const [mecanicos, setMecanicos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarMecanicos();
  }, []);

  const cargarMecanicos = async () => {
    try {
      const res = await api.get("/mecanicos");
      setMecanicos(res.data);
    } catch (err) {
      setError("Error al cargar mecánicos.");
    }
  };

  return (
    <section>
      <h2>Mecánicos</h2>
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {mecanicos.map((mecanico) => (
            <tr key={mecanico.id}>
              <td>{mecanico.nombre} {mecanico.apellidos}</td>
              <td>{mecanico.especialidad}</td>
              <td>{mecanico.email}</td>
              <td>{mecanico.telefono}</td>
              <td>{mecanico.activo ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Mecanicos;