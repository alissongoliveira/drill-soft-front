import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ModalEditarDadosBalanca = ({ idBalanca, onClose, onSuccess }) => {
  const [nome, setNome] = useState("");
  const [ip, setIp] = useState("");
  const [porta, setPorta] = useState("");

  useEffect(() => {
    const fetchBalanca = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/api/balancas/${idBalanca}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Erro ao carregar dados da balança");

        const data = await response.json();
        setNome(data.nome);
        setIp(data.ip);
        setPorta(data.porta);
      } catch (error) {
        console.error("Erro ao buscar balança:", error);
        toast.error("Erro ao carregar dados da balança.");
        onClose();
      }
    };

    fetchBalanca();
  }, [idBalanca, onClose]);

  const handleGravar = async () => {
    if (!String(nome).trim() || !String(ip).trim() || !String(porta).trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const token = localStorage.getItem("token");

    const body = {
      nome,
      ip,
      porta,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/balancas/${idBalanca}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao atualizar dados");
      }

      toast.success("Dados da balança atualizados com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      toast.error("Erro ao atualizar dados da balança.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md font-['JetBrains_Mono'] shadow-lg">
        {/* Cabeçalho */}
        <div className="bg-gray-300 px-4 py-2 rounded-t-md flex justify-between items-center border-b">
          <h2 className="text-sm font-bold">Editar Dados</h2>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-4 space-y-3">
          <h3 className="text-center font-bold">{`BALANÇA ${idBalanca}`}</h3>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nome"
              className="border px-2 py-1"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <input
              type="text"
              placeholder="IP"
              className="border px-2 py-1"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
            <input
              type="text"
              placeholder="Porta"
              className="border px-2 py-1"
              value={porta}
              onChange={(e) => setPorta(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-white border px-4 py-2 shadow text-sm mt-2"
              onClick={handleGravar}
            >
              Gravar Dados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditarDadosBalanca;
