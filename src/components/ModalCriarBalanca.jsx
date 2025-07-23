import { useState } from "react";
import { toast } from "react-toastify";

const ModalCriarBalanca = ({ onClose, onSuccess }) => {
  const [nome, setNome] = useState("");
  const [ip, setIp] = useState("");
  const [porta, setPorta] = useState("");

  const handleCadastrar = async () => {
    if (!nome.trim() || !ip.trim() || !porta.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/balancas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, ip, porta }),
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao cadastrar balança");
      }

      toast.success("Balança cadastrada com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao cadastrar balança:", error);
      toast.error("Erro ao cadastrar balança.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md font-['JetBrains_Mono'] shadow-lg">
        <div className="bg-gray-300 px-4 py-2 rounded-t-md flex justify-between items-center border-b">
          <h2 className="text-sm font-bold">Nova Balança</h2>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>

        <div className="p-4 space-y-3">
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
              onClick={handleCadastrar}
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCriarBalanca;
