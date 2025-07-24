import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import GerenciarUsuarios from "./pages/GerenciarUsuarios";
import PrivateRoute from "./components/PrivateRoute";
import Balanca from "./pages/Balanca";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const expiraEm = localStorage.getItem("expira_em");

      if (expiraEm && new Date() > new Date(expiraEm)) {
        localStorage.clear();
        toast.error("Sessão expirada. Faça login novamente.");
        navigate("/");
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute
              categoriasPermitidas={["administrador", "supervisor"]}
            >
              <GerenciarUsuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/balanca"
          element={
            <PrivateRoute
              categoriasPermitidas={["administrador", "supervisor", "basico"]}
            >
              <Balanca />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
