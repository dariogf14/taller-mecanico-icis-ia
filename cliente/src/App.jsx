import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import ClienteDetalle from "./pages/ClienteDetalle";
import Mecanicos from "./pages/Mecanicos";

import Vehiculos from "./pages/Vehiculos";
import VehiculoDetalle from "./pages/VehiculoDetalle";
import VehiculoFormulario from "./pages/VehiculoFormulario";

import Reparaciones from "./pages/Reparaciones";
import ReparacionDetalle from "./pages/ReparacionDetalle";
import ReparacionFormulario from "./pages/ReparacionFormulario";

import Diagnosticos from "./pages/Diagnosticos";
import DiagnosticoFormulario from "./pages/DiagnosticoFormulario";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/:id" element={<ClienteDetalle />} />

          <Route path="/mecanicos" element={<Mecanicos />} />

          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/vehiculos/nuevo" element={<VehiculoFormulario />} />
          <Route path="/vehiculos/:id" element={<VehiculoDetalle />} />
          <Route path="/vehiculos/editar/:id" element={<VehiculoFormulario />} />

          <Route path="/reparaciones" element={<Reparaciones />} />
          <Route path="/reparaciones/nueva" element={<ReparacionFormulario />} />
          <Route path="/reparaciones/:id" element={<ReparacionDetalle />} />
          <Route path="/reparaciones/editar/:id" element={<ReparacionFormulario />} />

          <Route path="/diagnosticos" element={<Diagnosticos />} />
          <Route path="/diagnosticos/nuevo" element={<DiagnosticoFormulario />} />
          <Route path="/diagnosticos/editar/:id" element={<DiagnosticoFormulario />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;