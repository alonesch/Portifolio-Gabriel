import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [credenciais, setCredenciais] = useState({ usuario: "", senha: "" });
  const [erro, setErro] = useState("");
  const [autenticando, setAutenticando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setAutenticando(true);

    try {
      const response = await axios.post("http://localhost:5186/api/login", credenciais);

      if (response.data.autenticado) {
        localStorage.setItem("usuarioId", response.data.usuario.id);
        localStorage.setItem("usuarioNome", response.data.usuario.nome);
        window.location.href = "/admin"; // ✅ redireciona pro painel
      } else {
        setErro("Usuário ou senha incorretos.");
      }
    } catch {
      setErro("Erro ao conectar ao servidor.");
    } finally {
      setAutenticando(false);
    }
  };

  return (
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
        <button type="submit" disabled={autenticando}>
          {autenticando ? "Entrando..." : "Entrar"}
        </button>
        {erro && <p className="erro-login">{erro}</p>}
      </form>

      <button
        onClick={() => (window.location.href = "/")}
        className="voltar-site"
      >
        ← Voltar ao site
      </button>
    </div>
  );
};

export default AdminLogin;
