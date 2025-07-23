import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import io from "socket.io-client";
import ModalSolicitacaoComplemento from "../components/ModalSolicitacaoComplemento";
import ModalEditarDadosBalanca from "../components/ModalEditarDadosBalanca";
import ModalCriarBalanca from "../components/ModalCriarBalanca";
import { toast } from "react-toastify";

const socket = io("http://localhost:3000");

const Balanca = () => {
  const [balancas, setBalancas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [balancaSelecionada, setBalancaSelecionada] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dadosUsuario = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(dadosUsuario);
  }, []);

  const fetchBalancas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/balancas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.balancas.length === 0) {
        setMostrarModalCriar(true);
      }

      const lista = data.balancas.map((b) => ({
        ...b,
        status: true,
        peso: 0,
      }));

      setBalancas(lista);
    } catch (error) {
      console.error("Erro ao carregar balanças:", error);
      toast.error("Erro ao buscar balanças.");
    }
  };

  useEffect(() => {
    fetchBalancas();
  }, []);

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

  const abrirModalSolicitacao = (balanca) => {
    setBalancaSelecionada(balanca);
    setMostrarModal(true);
  };

  const abrirModalEditar = (balanca) => {
    setBalancaSelecionada(balanca);
    setMostrarModalEditar(true);
  };

  const podeEditar =
    usuario?.categoria === "administrador" ||
    usuario?.categoria === "supervisor";

  return (
    <div className="p-6 font-['JetBrains_Mono']">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Balança</h1>
          <p className="text-sm text-gray-600">
            Monitore os pesos em tempo real e envie solicitações de complementos
            aos operadores.
          </p>
        </div>
        {podeEditar && (
          <button
            className="bg-white border px-4 py-1 shadow text-sm h-fit"
            onClick={() => setMostrarModalCriar(true)}
          >
            + Nova Balança
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {balancas.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-md shadow-md p-4 relative"
          >
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

            {podeEditar && (
              <div className="absolute top-4 right-4">
                <button onClick={() => abrirModalEditar(b)}>
                  <FiSettings size={18} />
                </button>
              </div>
            )}

            <h2 className="text-center font-bold mb-4 mt-2">{b.nome}</h2>

            <div className="text-6xl font-bold text-center tracking-widest select-none">
              {b.peso}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                className="bg-white border px-4 py-2 shadow text-sm"
                onClick={() => abrirModalSolicitacao(b)}
              >
                Solicitar Complemento
              </button>
            </div>
          </div>
        ))}
      </div>

      {mostrarModalCriar && (
        <ModalCriarBalanca
          onClose={() => setMostrarModalCriar(false)}
          onSuccess={fetchBalancas}
        />
      )}

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

      {mostrarModalEditar && balancaSelecionada && (
        <ModalEditarDadosBalanca
          idBalanca={balancaSelecionada.id}
          onClose={() => {
            setMostrarModalEditar(false);
            setBalancaSelecionada(null);
          }}
          onSuccess={fetchBalancas}
        />
      )}
    </div>
  );
};

export default Balanca;
