import { useEffect, useState } from "react";
import logo from "../assets/drillsoft-logo.png";

const Home = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioStorage);
  }, []);

  const primeiraLetra = usuario?.nome?.charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-white font-['JetBrains_Mono']">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-300 shadow">
        <div className="flex items-center gap-4">
          <button className="text-xl font-bold">☰</button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-black">
            {primeiraLetra}
          </div>
        </div>
      </div>

      {/* Logo Central */}
      <div className="flex items-center justify-center h-[calc(100vh-48px)]">
        <img
          src={logo}
          alt="Logo DrillSoft"
          className="w-[502px] h-[502px] object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
