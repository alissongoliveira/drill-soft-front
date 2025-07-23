import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import io from "socket.io-client";
import ModalSolicitacaoComplemento from "../components/ModalSolicitacaoComplemento";

const socket = io("http://localhost:3000"); // IP

const Balanca = () => {
  const [balancas, setBalancas] = useState([
    { id: 1, nome: "BALANÇA 01", status: true, peso: 0 },
    { id: 2, nome: "BALANÇA 02", status: true, peso: 0 },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [balancaSelecionada, setBalancaSelecionada] = useState(null);

  useEffect(() => {
    socket.on("peso-balanca-1", (peso) => {
      setBalancas((prev) =>
        prev.map((b) => (b.id === 1 && b.status ? { ...b, peso } : b))
      );
    });

    socket.on("peso-balanca-2", (peso) => {
      setBalancas((prev) =>
        prev.map((b) => (b.id === 2 && b.status ? { ...b, peso } : b))
      );
    });

    return () => {
      socket.off("peso-balanca-1");
      socket.off("peso-balanca-2");
    };
  }, []);

  const alternarStatus = (id) => {
    setBalancas((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: !b.status } : b))
    );
  };

  const abrirModal = (balanca) => {
    setBalancaSelecionada(balanca);
    setMostrarModal(true);
  };

  return (
    <div className="p-6 font-['JetBrains_Mono']">
      <h1 className="text-xl font-bold">Balança</h1>
      <p className="text-sm text-gray-600 mb-6">
        Monitore os pesos em tempo real e envie solicitações de complementos aos
        operadores.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {balancas.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-md shadow-md p-4 relative"
          >
            {/* Status */}
            <button
              onClick={() => alternarStatus(b.id)}
              className="absolute top-4 left-4 flex items-center gap-1 border px-2 py-0.5 rounded shadow text-sm"
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  b.status ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              {b.status ? "Online" : "Offline"}
            </button>

            {/* Ícone de config */}
            <div className="absolute top-4 right-4">
              <FiSettings size={18} />
            </div>

            {/* Nome */}
            <h2 className="text-center font-bold mb-4 mt-2">{b.nome}</h2>

            {/* Peso */}
            <div className="text-6xl font-bold text-center tracking-widest select-none">
              {b.peso}
            </div>

            {/* Botão */}
            <div className="mt-6 flex justify-center">
              <button
                className="bg-white border px-4 py-2 shadow text-sm"
                onClick={() => abrirModal(b)}
              >
                Solicitar Complemento
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Solicitação */}
      {mostrarModal && balancaSelecionada && (
        <ModalSolicitacaoComplemento
          balanca={balancaSelecionada.id}
          onClose={() => {
            setMostrarModal(false);
            setBalancaSelecionada(null);
          }}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
};

export default Balanca;
