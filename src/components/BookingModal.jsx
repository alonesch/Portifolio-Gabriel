
import React, { useState, useEffect } from "react";
import "../styles/BookingModal.css";

function BookingModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [barbeiros, setBarbeiros] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        telefone: "",
        barbeiroId: "",
        servicoId: "",
        dataHora: "",
        observacao: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [barbeirosRes, servicosRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/barbeiro`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/servico`),
                ]);

                const barbeirosData = await barbeirosRes.json();
                const servicosData = await servicosRes.json();

                setBarbeiros(barbeirosData.$values || barbeirosData);
                setServicos(servicosData.$values || servicosData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "observacaco" && value.length > 150) return;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/agendamento`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: formData.nome,
                    cpf: formData.cpf || null,
                    telefone: formData.telefone,
                    barbeiroId: parseInt(formData.barbeiroId),
                    dataHora: formData.dataHora,
                    agendamentoServicos: [
                        {
                            servicoId: parseInt(formData.servicoId),
                            observacao: formData.observacao || null,
                        },
                    ],
                }),
            });


            const result = await response.json();

            if (response.ok && result.sucesso) {
                alert("✅ " + result.mensagem);
                onClose();
            } else {
                alert("❌ " + (result.mensagem || "Erro ao criar agendamento."));
            }
        } catch (err) {
            console.error("Erro de conexão:", err);
            alert("❌ Falha ao conectar com o servidor.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <h3>Agendar horário</h3>

                <form className="booking-form" onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite seu nome completo"
                            required
                        />
                    </label>

                    <label>
                        CPF:
                        <input
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            placeholder="Somente números (opcional)"
                            maxLength={11}
                        />
                    </label>

                    <label>
                        Telefone:
                        <input
                            type="tel"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="Ex: 51981695117"
                            required
                        />
                    </label>

                    <label>
                        Barbeiro:
                        <select
                            name="barbeiroId"
                            value={formData.barbeiroId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione</option>
                            {barbeiros.map((b) => (
                                <option key={b.id || b.ID} value={b.id || b.ID}>
                                    {b.nome || b.Nome}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Serviço:
                        <select
                            name="servicoId"
                            value={formData.servicoId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione</option>
                            {servicos.map((s) => (
                                <option key={s.id || s.ID} value={s.id || s.ID}>
                                    {s.nomeServico || s.nome || s.Nome}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Data e Hora:
                        <input
                            type="datetime-local"
                            name="dataHora"
                            value={formData.dataHora}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Observações:
                        <textarea
                            name="observacao"
                            value={formData.observacao}
                            onChange={handleChange}
                            placeholder="Ex: Prefiro corte com máquina 2, ou outros detalhes..."
                            maxLength={150}
                        />
                        <small>{formData.observacao.length}/150</small>
                    </label>

                    <div className="form-buttons">
                        <button type="submit" className="confirm-btn">Confirmar</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookingModal;
