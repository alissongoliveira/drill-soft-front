import { useState } from "react";
import { toast } from "react-toastify";

const ModalSolicitacaoComplemento = ({ balanca, onClose, onSuccess }) => {
  const [placa, setPlaca] = useState("");
  const [tara, setTara] = useState("");
  const [liquido, setLiquido] = useState("");

  const bruto = Number(tara) + Number(liquido);

  const handleSubmit = async () => {
    if (!placa.trim()) {
      toast.error("Informe a placa do caminhão.");
      return;
    }

    if (!tara || isNaN(tara) || Number(tara) <= 0) {
      toast.error("Informe uma tara válida.");
      return;
    }

    if (!liquido || isNaN(liquido) || Number(liquido) <= 0) {
      toast.error("Informe um peso líquido válido.");
      return;
    }

    const token = localStorage.getItem("token");

    const body = {
      placa,
      balanca,
      tara: Number(tara),
      liquido: Number(liquido),
      peso_desejado: bruto,
    };

    try {
      const response = await fetch("http://localhost:3000/api/solicitacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao enviar solicitação");
      }

      toast.success("Solicitação enviada com sucesso!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      toast.error("Erro ao enviar solicitação.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md font-['JetBrains_Mono'] shadow-lg">
        <div className="bg-gray-300 px-4 py-2 rounded-t-md flex justify-between items-center border-b">
          <h2 className="text-sm font-bold">Solicitação de Complemento</h2>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="text-center font-bold">{`BALANÇA ${balanca}`}</h3>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Placa"
              className="border px-2 py-1"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
            <input
              type="number"
              placeholder="Tara"
              className="border px-2 py-1"
              value={tara}
              onChange={(e) => setTara(e.target.value)}
            />
            <input
              type="number"
              placeholder="Liquido"
              className="border px-2 py-1"
              value={liquido}
              onChange={(e) => setLiquido(e.target.value)}
            />
            <input
              type="number"
              placeholder="Bruto"
              className="border px-2 py-1 bg-gray-200"
              value={bruto}
              readOnly
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-white border px-4 py-2 shadow text-sm mt-2"
              onClick={handleSubmit}
            >
              Enviar Solicitação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSolicitacaoComplemento;
