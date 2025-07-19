import { useState } from "react";
import { useNavigate } from "react-router-dom";
import drillsoftLogo from "../assets/drillsoft-logo.png";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const handleEntrar = async () => {
    setErro(null);

    if (!usuario || !senha) {
      toast.error("Preencha usuário e senha.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_usuario: usuario,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.status === "senha_nao_definida") {
          setMostrarModal(true);
        } else {
          toast.error(data.mensagem || "Erro ao fazer login.");
        }
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      toast.success("Login realizado com sucesso!");
      navigate("/home");
    } catch (err) {
      toast.error("Erro inesperado ao fazer login.");
    }
  };

  const handleLimpar = () => {
    setUsuario("");
    setSenha("");
    setErro(null);
  };

  const handleDefinirSenha = async () => {
    if (!novaSenha || novaSenha.length < 6) {
      toast.error("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/definir-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_usuario: usuario,
          senha: novaSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao definir senha");
      }

      setMostrarModal(false);
      setNovaSenha("");
      setSenha("");
      toast.success("Senha definida com sucesso. Agora você pode fazer login.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-mono relative px-4">
      <div className="flex flex-col items-center space-y-1">
        <img
          src={drillsoftLogo}
          alt="Logo DrillSoft"
          className="w-[191px] h-[191px] object-contain"
        />

        {/* Card de login */}
        <div className="bg-gray-200 p-6 rounded-md shadow-md w-full max-w-sm space-y-4">
          {/* Linha: Usuário */}
          <div className="grid grid-cols-[80px_1fr_90px] items-center gap-2">
            <label className="text-sm text-right">Usuário:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="border px-2 h-9 text-sm w-full"
            />
            <button
              onClick={handleEntrar}
              className="h-9 bg-white px-4 text-sm shadow w-full"
            >
              Entrar
            </button>
          </div>

          {/* Linha: Senha */}
          <div className="grid grid-cols-[80px_1fr_90px] items-center gap-2">
            <label className="text-sm text-right">Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="border px-2 h-9 text-sm w-full"
            />
            <button
              onClick={handleLimpar}
              className="h-9 bg-white px-4 text-sm shadow w-full"
            >
              Limpar
            </button>
          </div>

          {erro && <p className="text-red-600 text-sm text-center">{erro}</p>}
        </div>
      </div>

      {/* Frase institucional */}
      <div className="absolute bottom-10 left-10 text-gray-900">
        <h2 className="text-2xl font-bold">DrillSoft,</h2>
        <p className="text-2xl pl-[2px]">
          Onde a Mineração Encontra a Tecnologia.
        </p>
      </div>

      {/* Modal padrão - Definir nova senha */}
      {mostrarModal && (
        <Modal
          title="Definir nova Senha"
          onClose={() => setMostrarModal(false)}
        >
          <p className="text-sm text-gray-700 mb-2">
            Este usuário ainda não definiu uma senha. Digite abaixo uma nova
            senha para continuar:
          </p>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="w-full border px-3 py-2 text-sm mb-4"
            placeholder="Nova senha"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setMostrarModal(false)}
              className="px-4 py-1 text-sm bg-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleDefinirSenha}
              className="px-4 py-1 text-sm bg-gray-800 text-white hover:bg-gray-700"
            >
              Definir Senha
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
