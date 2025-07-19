import { useEffect, useRef, useState } from "react";
import logo from "../assets/drillsoft-logo.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ModalSobre from "../components/ModalSobre";

const Home = () => {
  const [usuario, setUsuario] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarModalSobre, setMostrarModalSobre] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));
    const expiraEm = localStorage.getItem("expira_em");

    if (expiraEm && new Date() > new Date(expiraEm)) {
      localStorage.clear();
      navigate("/");
      return;
    }

    if (usuarioStorage) {
      setUsuario(usuarioStorage);
    } else {
      navigate("/"); // caso não tenha usuário logado
    }
  }, []);

  const primeiraLetra = usuario?.nome?.charAt(0).toUpperCase() || "U";

  const handleLogout = () => {
    localStorage.removeItem("usuario"); // remove o token salvo, se houver
    localStorage.removeItem("token");
    navigate("/"); // redireciona para login
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

      {/* Overlay escuro da sidebar */}
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-10"
          onClick={() => setMenuAberto(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-20 transform transition-transform duration-300 w-60 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          onClose={() => setMenuAberto(false)}
          onLogout={handleLogout}
          onSobreClick={() => setMostrarModalSobre(true)}
        />
      </div>

      {/* Área útil */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={logo}
          alt="Logo DrillSoft"
          className="w-[502px] h-[502px] object-contain"
        />
      </div>

      {/* Modal SOBRE – fora da área útil, z-50 */}
      {mostrarModalSobre && (
        <ModalSobre onClose={() => setMostrarModalSobre(false)} />
      )}
    </div>
  );
};

export default Home;
