import { useState } from "react";
import { toast } from "react-toastify";

const ModalEditarUsuario = ({ usuario, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nome: usuario.nome,
    nome_usuario: usuario.nome_usuario,
    cpf: usuario.cpf,
    categoria: usuario.categoria,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/usuarios/${usuario.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao editar usuário");
      }

      toast.success("Usuário editado com sucesso!");
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Erro ao editar:", error);
      toast.error("Erro ao editar usuário.");
    }
  };

  const handleRedefinirSenha = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/usuarios/${usuario.id}/redefinir-senha`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao redefinir senha");
      }

      toast.success("Senha redefinida com sucesso!");
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      toast.error("Erro ao redefinir senha.");
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
          <button
            type="button"
            onClick={handleRedefinirSenha}
            className="border px-2 py-1 shadow"
          >
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

export default ModalEditarUsuario;
