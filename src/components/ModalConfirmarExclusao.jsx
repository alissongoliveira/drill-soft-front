const ModalConfirmarExclusao = ({ onClose, onConfirm, nomeUsuario }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-lg w-full max-w-md p-6 font-['JetBrains_Mono']">
        {/* Título */}
        <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>

        {/* Conteúdo */}
        <p className="text-sm text-gray-700 mb-6">
          Tem certeza que deseja excluir o usuário{" "}
          <strong>{nomeUsuario}</strong>? Esta ação não poderá ser desfeita.
        </p>

        {/* Ações */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarExclusao;
