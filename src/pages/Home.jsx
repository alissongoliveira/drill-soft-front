import { useEffect, useRef, useState } from "react";
import logo from "../assets/drillsoft-logo.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioStorage);
  }, []);

  const primeiraLetra = usuario?.nome?.charAt(0).toUpperCase() || "U";

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    if (menuAberto) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto]);

  return (
    <div className="min-h-screen bg-white font-['JetBrains_Mono'] flex flex-col relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-300 shadow relative z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="text-xl font-bold"
          >
            ☰
          </button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-black">
            {primeiraLetra}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-10"
          onClick={() => setMenuAberto(false)}
        ></div>
      )}

      {/* Sidebar com animação */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-20 transform transition-transform duration-300 w-60 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setMenuAberto(false)} onLogout={handleLogout} />
      </div>

      {/* Logo Central */}
      <div className="flex items-center justify-center flex-1">
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
