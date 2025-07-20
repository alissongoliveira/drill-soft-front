import { useState, useEffect } from "react";
import { FiPlus, FiFilter, FiPrinter, FiTrash2, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import ModalCriarUsuario from "../components/ModalCriarUsuario";
import ModalConfirmarExclusao from "../components/ModalConfirmarExclusao";

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleConfirmarExclusao = async () => {
    if (!usuarioParaExcluir) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/usuarios/${usuarioParaExcluir.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao excluir usuário");
      }

      toast.success("Usuário excluído com sucesso!");
      setUsuarioParaExcluir(null);
      fetchUsuarios();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir usuário.");
    }
  };

  return (
    <div className="p-6 font-['JetBrains_Mono']">
      <h1 className="text-xl font-bold">Gerenciamento de Usuários</h1>
      <p className="text-sm text-gray-600">
        Gerencie usuários cadastrados e emita relatórios personalizados.
      </p>

      {/* Botões */}
      <div className="flex gap-2 mt-4">
        <button
          className="bg-white border px-3 py-1 flex items-center gap-1 shadow"
          onClick={() => setMostrarModal(true)}
        >
          <FiPlus size={16} /> NOVO USUÁRIO
        </button>
        <button className="bg-white border px-3 py-1 flex items-center gap-1 shadow">
          <FiFilter size={16} /> FILTROS
        </button>
        <button className="bg-white border px-3 py-1 flex items-center gap-1 shadow">
          <FiPrinter size={16} /> IMPRIMIR
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-md shadow mt-6 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-200 font-bold">
            <tr>
              <th className="p-2">NOME</th>
              <th className="p-2">USUÁRIO</th>
              <th className="p-2">CPF</th>
              <th className="p-2">CATEGORIA</th>
              <th className="p-2">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.nome}</td>
                <td className="p-2">{u.nome_usuario}</td>
                <td className="p-2">{u.cpf}</td>
                <td className="p-2">{u.categoria}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => setUsuarioParaExcluir(u)}>
                    <FiTrash2 size={16} />
                  </button>
                  <button>
                    <FiEdit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de criação */}
      {mostrarModal && (
        <ModalCriarUsuario
          onClose={() => setMostrarModal(false)}
          onSuccess={fetchUsuarios}
        />
      )}

      {/* Modal de confirmação de exclusão */}
      {usuarioParaExcluir && (
        <ModalConfirmarExclusao
          nomeUsuario={usuarioParaExcluir.nome}
          onClose={() => setUsuarioParaExcluir(null)}
          onConfirm={handleConfirmarExclusao}
        />
      )}
    </div>
  );
};

export default GerenciarUsuarios;
