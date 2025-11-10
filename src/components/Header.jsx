import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <nav className="site-header_Menu">
        <a className="site-header_Menu_link" href="#inicio">Home</a>
        <a className="site-header_Menu_link" href="#galeria">Galeria</a>
        <a className="site-header_Menu_link" href="#agendamento">Agendamento</a>

        
        <button
          onClick={() => navigate("/login")}
          className="site-header_Menu_link admin-btn"
        >
          Área do Barbeiro
        </button>
      </nav>
    </header>
  );
}

export default Header;
