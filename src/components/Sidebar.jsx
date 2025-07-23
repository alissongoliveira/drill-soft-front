import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaTruck,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ onClose, onLogout, onSobreClick }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-12 left-0 bg-white border shadow z-20 w-60">
      <ul className="divide-y text-sm font-['JetBrains_Mono']">
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onClose();
            navigate("/usuarios");
          }}
        >
          <FaUser /> Gerenciamento de Usuários
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={onClose}
        >
          <FaClipboardList /> Gerenciamento de Solicitações
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onClose();
            navigate("/balanca");
          }}
        >
          <FaTruck /> Balança
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            onClose();
            onSobreClick();
          }}
        >
          <FaInfoCircle /> Sobre
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
          onClick={onLogout}
        >
          <FaSignOutAlt /> Sair
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
