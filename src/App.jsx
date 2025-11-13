import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import "./styles/styles.css";

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [credenciais, setCredenciais] = useState({ usuario: "", senha: "" });
  const [erro, setErro] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Verifica login salvo
  useEffect(() => {
    const token = localStorage.getItem("token");
    const barbeiroId = localStorage.getItem("barbeiroId");

    if (token && barbeiroId) {
      setAutenticado(true);
    }
  }, []);

  // 🔹 Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await axios.post(`${API_URL}/api/login`, credenciais);

      if (response.data.autenticado && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuarioId", response.data.usuario.id);
        localStorage.setItem("usuarioNome", response.data.usuario.nomeUsuario);
        localStorage.setItem("barbeiroId", response.data.usuario.barbeiroId);
        setAutenticado(true);
      } else {
        setErro("Usuário ou senha incorretos.");
      }
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err.message);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.clear();
    setAutenticado(false);
  };

  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            autenticado ? (
              <Navigate to="/admin" replace />
            ) : (
              <div className="login-container">
                <h1>💈 Login do Barbeiro</h1>
                <form onSubmit={handleLogin} className="login-form">
                  <input
                    type="text"
                    placeholder="Usuário"
                    value={credenciais.usuario}
                    onChange={(e) =>
                      setCredenciais({ ...credenciais, usuario: e.target.value })
                    }
                    required
                  />
                  <input
                    type="password"
                    placeholder="Senha"
                    value={credenciais.senha}
                    onChange={(e) =>
                      setCredenciais({ ...credenciais, senha: e.target.value })
                    }
                    required
                  />
                  <button type="submit">Entrar</button>
                  {erro && <p className="erro-login">{erro}</p>}
                </form>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="voltar-site"
                >
                  ← Voltar ao site
                </button>
              </div>
            )
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            autenticado ? (
              <AdminPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Histórico */}
        <Route
          path="/admin/historico"
          element={
            autenticado ? (
              <AdminPage tipo="historico" onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
