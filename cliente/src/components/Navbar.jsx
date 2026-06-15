import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">TallerPro</Link>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/vehiculos">Vehículos</Link>
        <Link to="/mecanicos">Mecánicos</Link>
        <Link to="/reparaciones">Reparaciones</Link>
        <Link to="/diagnosticos">Diagnósticos</Link>
      </div>
    </nav>
  );
}

export default Navbar;