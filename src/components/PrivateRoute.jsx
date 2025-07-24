import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, categoriasPermitidas }) => {
  const [acessoNegado, setAcessoNegado] = useState(false);
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (
      token &&
      usuario &&
      categoriasPermitidas &&
      !categoriasPermitidas.includes(usuario.categoria)
    ) {
      toast.error("Acesso negado. Permissão insuficiente.");
      setAcessoNegado(true);
    }
  }, [token, usuario, categoriasPermitidas]);

  if (!token || !usuario) {
    return <Navigate to="/" replace />;
  }

  if (acessoNegado) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
