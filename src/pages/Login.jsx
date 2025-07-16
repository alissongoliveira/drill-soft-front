import { useState } from "react";
import { useNavigate } from "react-router-dom";
import drillsoftLogo from "../assets/drillsoft-logo.png";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleEntrar = async () => {
    setErro(null);

    try {
      // Envia o login
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_usuario: usuario,
          senha: senha,
        }),
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navigate("/dashboard");
    } catch (err) {
      setErro(err.message);
    }
  };

  const handleLimpar = () => {
    setUsuario("");
    setSenha("");
    setErro(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-mono relative px-4">
      <div className="flex flex-col items-center space-y-1">
        <img
          src={drillsoftLogo}
          alt="Logo DrillSoft"
          className="w-[191px] h-[191px] object-contain"
        />

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

          {/* Mensagem de erro */}
          {erro && <p className="text-red-600 text-sm text-center">{erro}</p>}
        </div>
      </div>

      <div className="absolute bottom-10 left-10 text-gray-900">
        <h2 className="text-2xl font-bold">DrillSoft,</h2>
        <p className="text-2xl pl-[2px]">
          Onde a Mineração Encontra a Tecnologia.
        </p>
      </div>
    </div>
  );
}
