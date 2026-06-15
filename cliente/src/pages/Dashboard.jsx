import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [datos, setDatos] = useState({
    clientes: 0,
    vehiculos: 0,
    mecanicos: 0,
    reparaciones: 0,
    pendientes: 0,
    enProceso: 0,
    finalizadas: 0,
    diagnosticos: 0,
    criticos: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [clientesRes, vehiculosRes, mecanicosRes, reparacionesRes, diagnosticosRes] =
        await Promise.all([
          api.get("/clientes"),
          api.get("/vehiculos"),
          api.get("/mecanicos"),
          api.get("/reparaciones"),
          api.get("/diagnosticos"),
        ]);

      const reparaciones = reparacionesRes.data;
      const diagnosticos = diagnosticosRes.data;

      setDatos({
        clientes: clientesRes.data.length,
        vehiculos: vehiculosRes.data.length,
        mecanicos: mecanicosRes.data.length,
        reparaciones: reparaciones.length,
        pendientes: reparaciones.filter((r) => r.estado === "Pendiente").length,
        enProceso: reparaciones.filter((r) => r.estado === "En proceso").length,
        finalizadas: reparaciones.filter((r) => r.estado === "Finalizada").length,
        diagnosticos: diagnosticos.length,
        criticos: diagnosticos.filter((d) => d.prioridad === "Crítica").length,
      });
    } catch (err) {
      setError("No se pudieron cargar las estadísticas.");
    }
  };

  return (
    <section>
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}

      <div className="cards">
        <div className="card"><strong>{datos.clientes}</strong><span>Clientes</span></div>
        <div className="card"><strong>{datos.vehiculos}</strong><span>Vehículos</span></div>
        <div className="card"><strong>{datos.mecanicos}</strong><span>Mecánicos</span></div>
        <div className="card"><strong>{datos.reparaciones}</strong><span>Reparaciones</span></div>
        <div className="card warning"><strong>{datos.pendientes}</strong><span>Pendientes</span></div>
        <div className="card info"><strong>{datos.enProceso}</strong><span>En proceso</span></div>
        <div className="card success"><strong>{datos.finalizadas}</strong><span>Finalizadas</span></div>
        <div className="card danger"><strong>{datos.criticos}</strong><span>Diagnósticos críticos</span></div>
      </div>
    </section>
  );
}

export default Dashboard;