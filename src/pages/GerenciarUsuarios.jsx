import { useState, useEffect } from "react";
import { FiPlus, FiFilter, FiPrinter, FiTrash2, FiEdit } from "react-icons/fi";

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/usuarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Dados recebidos da API:", data);

        setUsuarios(data.usuarios);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="p-6 font-['JetBrains_Mono']">
      <h1 className="text-xl font-bold">Gerenciamento de Usuários</h1>
      <p className="text-sm text-gray-600">
        Gerencie usuários cadastrados e emita relatórios personalizados.
      </p>

      {/* Botões */}
      <div className="flex gap-2 mt-4">
        <button className="bg-white border px-3 py-1 flex items-center gap-1 shadow">
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
                  <button>
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
    </div>
  );
};

export default GerenciarUsuarios;
