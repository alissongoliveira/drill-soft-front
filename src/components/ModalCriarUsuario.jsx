import { useState } from "react";

const ModalCriarUsuario = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nome: "",
    nome_usuario: "",
    cpf: "",
    categoria: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao criar usuário");
      }

      onSuccess(); // Atualiza lista no pai
      onClose(); // Fecha modal
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao criar usuário.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 font-['JetBrains_Mono']">
      <div className="bg-white rounded-md w-full max-w-2xl shadow-lg">
        {/* Cabeçalho */}
        <div className="bg-gray-300 px-4 py-2 rounded-t-md flex justify-between items-center border-b">
          <h2 className="text-md font-bold">Usuários</h2>
          <button onClick={onClose} className="text-xl font-bold">
            ×
          </button>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="p-6 grid grid-cols-2 gap-4 text-sm"
        >
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            className="border px-2 py-1"
            required
          />
          <button type="button" className="border px-2 py-1 shadow" disabled>
            Redefinir Senha
          </button>

          <input
            type="text"
            name="nome_usuario"
            placeholder="Usuário"
            value={form.nome_usuario}
            onChange={handleChange}
            className="border px-2 py-1"
            required
          />
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="border px-2 py-1"
            required
          >
            <option value="">Tipo de Usuário</option>
            <option value="administrador">Administrador</option>
            <option value="supervisor">Supervisor</option>
            <option value="basico">Básico</option>
            <option value="operador">Operador</option>
          </select>

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            className="border px-2 py-1"
            required
          />
          <button type="submit" className="border px-2 py-1 shadow">
            Gravar Dados
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCriarUsuario;
