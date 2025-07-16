import { useState } from "react";
import drillsoftLogo from "../assets/drillsoft-logo.png";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleEntrar = () => {
    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
    // Conectar com a API
  };

  const handleLimpar = () => {
    setUsuario("");
    setSenha("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-mono relative px-4">
      {/* Container agrupado da logo + card */}
      <div className="flex flex-col items-center space-y-1">
        {/* Logo */}
        <img
          src={drillsoftLogo}
          alt="Logo DrillSoft"
          className="w-[191px] h-[191px] object-contain"
        />

        {/* Card de login */}
        <div className="bg-gray-200 p-6 rounded-md shadow-md w-full max-w-sm">
          {/* Input Usuário + Botão Entrar */}
          <div className="mb-4 flex items-center justify-between">
            <label className="w-20 text-sm">Usuário:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="flex-1 border px-2 py-1 text-sm"
            />
            <button
              onClick={handleEntrar}
              className="ml-2 bg-white px-4 py-1 text-sm shadow"
            >
              Entrar
            </button>
          </div>

          {/* Input Senha + Botão Limpar */}
          <div className="flex items-center justify-between">
            <label className="w-20 text-sm">Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="flex-1 border px-2 py-1 text-sm"
            />
            <button
              onClick={handleLimpar}
              className="ml-2 bg-white px-4 py-1 text-sm shadow"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Frase institucional no canto inferior esquerdo */}
      <div className="absolute bottom-10 left-10 text-gray-900">
        <h2 className="text-2xl font-bold">DrillSoft,</h2>
        <p className="text-2xl pl-[2px]">
          Onde a Mineração Encontra a Tecnologia.
        </p>
      </div>
    </div>
  );
}
