import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, categoriasPermitidas }) => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!token || !usuario) {
    return <Navigate to="/" replace />;
  }

  if (
    categoriasPermitidas &&
    !categoriasPermitidas.includes(usuario.categoria)
  ) {
    toast.error("Acesso negado. Permissão insuficiente.");
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PrivateRoute;
