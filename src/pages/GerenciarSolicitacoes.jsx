import { useEffect, useState } from "react";
import { FiFilter, FiPrinter } from "react-icons/fi";
import { toast } from "react-toastify";

const statusColors = {
  ACEITO: "text-blue-600",
  REJEITADO: "text-red-500",
  PENDENTE: "text-yellow-500",
  FINALIZADO: "text-green-500",
};

const GerenciarSolicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [status, setStatus] = useState("");

  const fetchSolicitacoes = async () => {
    try {
      const token = localStorage.getItem("token");

      let url = "http://localhost:3000/api/solicitacoes/todas";

      const filtros = [];
      if (status) filtros.push(`status=${status}`);
      if (dataInicio) filtros.push(`data_inicio=${dataInicio}`);
      if (dataFim) filtros.push(`data_fim=${dataFim}`);

      if (filtros.length > 0) {
        url = `http://localhost:3000/api/relatorios/solicitacoes?${filtros.join(
          "&"
        )}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setSolicitacoes(data.solicitacoes || []);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
      toast.error("Erro ao buscar solicitações.");
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  return (
    <div className="p-6 font-['JetBrains_Mono']">
      {/* Cabeçalho */}
      <div className="mb-4">
        <h1 className="text-lg font-bold">Gerenciamento de Solicitações</h1>
        <p className="text-sm text-gray-600">
          Gerencie solicitações de complementos e emita relatórios
          personalizados.
        </p>
      </div>

      {/* Filtros e ações */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          className="border px-3 py-1 text-sm shadow"
        />
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="border px-3 py-1 text-sm shadow"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-1 text-sm shadow"
        >
          <option value="">Todos os Status</option>
          <option value="pendente">Pendente</option>
          <option value="aceito">Aceito</option>
          <option value="finalizado">Finalizado</option>
          <option value="recusado">Recusado</option>
        </select>

        <button
          onClick={fetchSolicitacoes}
          className="flex items-center gap-2 border px-3 py-1 shadow text-sm"
        >
          <FiFilter /> FILTRAR
        </button>
        <button className="flex items-center gap-2 border px-3 py-1 shadow text-sm">
          <FiPrinter /> IMPRIMIR
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white border rounded-md overflow-x-auto">
        <div className="grid grid-cols-9 text-xs font-bold border-b px-4 py-2">
          <div>BALANÇA</div>
          <div>D. SOLICITAÇÃO</div>
          <div>SOLICITANTE</div>
          <div>FINALIZADO POR</div>
          <div>D. FINALIZAÇÃO</div>
          <div>TEMP. MÉDIO</div>
          <div>PESO FINAL</div>
          <div>STATUS</div>
        </div>

        {solicitacoes.map((s) => (
          <div
            key={s.id}
            className="grid grid-cols-9 text-xs px-4 py-2 border-b items-center bg-white hover:bg-gray-50"
          >
            <div>{s.nome_balanca}</div>
            <div>
              {formatarDataHora(s.data_solicitacao, s.hora_solicitacao)}
            </div>
            <div>{s.nome_solicitante}</div>
            <div>{s.nome_finalizador || "-"}</div>
            <div>
              {formatarDataHora(s.data_finalizacao, s.hora_finalizacao)}
            </div>
            <div>{calcularTempoMedio(s)}</div>
            <div>{s.peso_finalizado || "-"}</div>
            <div
              className={`font-bold ${
                statusColors[s.status?.toUpperCase()] || ""
              }`}
            >
              {s.status?.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Função formatar data e hora
function formatarDataHora(data, hora) {
  if (!data || !hora) return "-";

  // Remove milissegundos, se existirem
  const horaFormatada = hora.split(".")[0];

  // Concatena data e hora manualmente
  const [ano, mes, dia] = data.split("T")[0].split("-");
  return `${dia}/${mes}/${ano}, ${horaFormatada}`;
}

// Função para calcular tempo médio
function calcularTempoMedio(solic) {
  if (!solic.hora_solicitacao || !solic.hora_finalizacao) return "00:00:00";

  const inicio = new Date(`1970-01-01T${solic.hora_solicitacao}`);
  const fim = new Date(`1970-01-01T${solic.hora_finalizacao}`);

  if (isNaN(inicio.getTime()) || isNaN(fim.getTime()) || fim < inicio)
    return "00:00:00";

  const diff = (fim - inicio) / 1000;

  const h = String(Math.floor(diff / 3600)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const s = String(Math.floor(diff % 60)).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

export default GerenciarSolicitacoes;
