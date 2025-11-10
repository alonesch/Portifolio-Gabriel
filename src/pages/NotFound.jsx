import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="login-container">
      <h1>404 - Página não encontrada</h1>
      <p>O endereço digitado não existe.</p>

      <Link to="/" className="voltar-site">
        ← Voltar ao site
      </Link>
    </div>
  );
}

export default NotFound;
