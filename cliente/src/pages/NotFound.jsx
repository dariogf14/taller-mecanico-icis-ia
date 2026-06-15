import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h2>Página no encontrada</h2>
      <p>La ruta solicitada no existe.</p>
      <Link className="btn" to="/">Volver al dashboard</Link>
    </section>
  );
}

export default NotFound;