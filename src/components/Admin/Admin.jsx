import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = ({ onVoltar, onLogout }) => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [toast, setToast] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [tipo, setTipo] = useState(() =>
    location.pathname.includes("historico") ? "historico" : "ativos"
  );

  useEffect(() => {
    setTipo(location.pathname.includes("historico") ? "historico" : "ativos");
  }, [location.pathname]);

  const [paginaAtivos, setPaginaAtivos] = useState(1);
  const [paginaHistorico, setPaginaHistorico] = useState(1);
  const itensPorPagina = 5;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) return;

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/agendamento/barbeiro/${usuarioId}`
        );

        const data = response.data?.$values || response.data;
        const parsed = data.map((a) => ({
          id: a.id,
          cliente: a.cliente,
          barbeiro: a.barbeiro,
          dataHora: a.dataHora,
          status: a.status,
          observacao: a.observacao,
          servicos: a.servicos?.$values || a.servicos || [],
        }));

        setAgendamentos(parsed);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  const showToast = (mensagem, tipo = "info") => {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 3000);
  };

  const atualizarStatus = async (id, novoStatus) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/agendamento/${id}/status`,
        { status: novoStatus }
      );
      setAgendamentos((prev) =>
        prev.map((a) =>
          a.id === id
            ? {
                ...a,
                status:
                  novoStatus === 2
                    ? "Confirmado"
                    : novoStatus === 6
                    ? "Cancelado pelo Barbeiro"
                    : novoStatus === 7
                    ? "Finalizado"
                    : a.status,
              }
            : a
        )
      );
      showToast("Status atualizado com sucesso ✅", "sucesso");
    } catch (err) {
      console.error("Erro ao atualizar status:", err.message);
      showToast("Erro ao atualizar o status ❌", "erro");
    }
  };

  const ativos = agendamentos.filter((a) =>
    ["Pendente", "Confirmado"].includes(a.status)
  );
  const historico = agendamentos.filter((a) =>
    ["Finalizado", "Cancelado pelo Barbeiro", "Cancelado pelo Cliente"].includes(
      a.status
    )
  );
  const lista = tipo === "historico" ? historico : ativos;

  const paginaAtual = tipo === "historico" ? paginaHistorico : paginaAtivos;
  const setPaginaAtual =
    tipo === "historico" ? setPaginaHistorico : setPaginaAtivos;

  const totalPaginas = Math.ceil(lista.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const paginaItens = lista.slice(indiceInicial, indiceInicial + itensPorPagina);

  const mudarPagina = (novaPagina) => {
    if (novaPagina >= 1 && novaPagina <= totalPaginas) setPaginaAtual(novaPagina);
  };

  const getBotoes = (a) => {
    const botoes = [];
    if (a.status === "Pendente") {
      botoes.push(
        <button key="confirmar" onClick={() => atualizarStatus(a.id, 2)}>
          ✅ Confirmar
        </button>
      );
      botoes.push(
        <button key="cancelar" onClick={() => atualizarStatus(a.id, 6)}>
          ❌ Cancelar
        </button>
      );
    } else if (a.status === "Confirmado") {
      botoes.push(
        <button key="finalizar" onClick={() => atualizarStatus(a.id, 7)}>
          🏁 Finalizar
        </button>
      );
      botoes.push(
        <button key="cancelar" onClick={() => atualizarStatus(a.id, 6)}>
          ❌ Cancelar
        </button>
      );
    }
    return botoes;
  };

  const handleVoltar = () => {
    navigate("/");
    if (onVoltar) onVoltar();
  };

  // 🔹 Logoff unificado com o App.jsx
  const handleLogoff = () => {
    if (onLogout) onLogout();
    showToast("Sessão encerrada com sucesso 👋", "sucesso");
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <div className="admin-page">
      <div className="top-buttons">
        <button className="voltar-site" onClick={handleVoltar}>
          ← Voltar ao site
        </button>
        <button className="logoff-btn" onClick={handleLogoff}>
          ⎋ Sair do painel
        </button>
      </div>

      <div className="admin-container">
        <h1>💈 Painel do Barbeiro</h1>
        <p>
          {tipo === "historico"
            ? "Agendamentos Finalizados e Cancelados"
            : "Agendamentos Ativos"}
        </p>

        <div className="abas-container">
          <Link to="/admin" className={`aba ${tipo === "ativos" ? "ativa" : ""}`}>
            Ativos
          </Link>
          <Link
            to="/admin/historico"
            className={`aba ${tipo === "historico" ? "ativa" : ""}`}
          >
            Histórico
          </Link>
        </div>

        {/* Tabelas */}
        <div className="admin-table">
          {loading ? (
            <p className="texto-centro">Carregando...</p>
          ) : lista.length ? (
            !isMobile ? (
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Serviços</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Observação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {paginaItens.map((a) => (
                    <tr key={a.id}>
                      <td>{a.cliente}</td>
                      <td>
                        {(a.servicos || []).map((s) => s.nomeServico).join(", ")}
                      </td>
                      <td>{new Date(a.dataHora).toLocaleString("pt-BR")}</td>
                      <td
                        className={`status ${a.status
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        {a.status}
                      </td>
                      <td>{a.observacao || "-"}</td>
                      <td>
                        <div className="acoes-admin">{getBotoes(a)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              paginaItens.map((a) => (
                <div className="admin-card" key={a.id}>
                  <p><strong>Cliente:</strong> {a.cliente}</p>
                  <p><strong>Serviços:</strong> {(a.servicos || []).map((s) => s.nomeServico).join(", ")}</p>
                  <p><strong>Data:</strong> {new Date(a.dataHora).toLocaleString("pt-BR")}</p>
                  <p><strong>Status:</strong> <span className={`status ${a.status.toLowerCase().replace(/\s/g, "-")}`}>{a.status}</span></p>
                  <p><strong>Obs:</strong> {a.observacao || "-"}</p>
                  <div className="acoes-admin">{getBotoes(a)}</div>
                </div>
              ))
            )
          ) : (
            <div className="admin-empty">
              <p>Nenhum agendamento encontrado.</p>
            </div>
          )}
        </div>

        {lista.length > itensPorPagina && (
          <div className="paginacao">
            <button
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
            >
              ← Anterior
            </button>
            <span>
              Página {paginaAtual} de {totalPaginas}
            </span>
            <button
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
            >
              Próxima →
            </button>
          </div>
        )}
      </div>

      {toast && <div className={`toast ${toast.tipo}`}>{toast.mensagem}</div>}
    </div>
  );
};

export default Admin;
