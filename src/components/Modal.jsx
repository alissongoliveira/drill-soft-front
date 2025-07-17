export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-gray-300 px-4 py-2 flex items-center justify-between">
          <h2 className="text-sm font-mono text-center w-full -ml-5">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-black font-bold text-lg"
          >
            ×
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
