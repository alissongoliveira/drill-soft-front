import drillsoftLogo from "../assets/drillsoft-logo.png";

const ModalSobre = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-md w-full max-w-md font-['JetBrains_Mono'] shadow-lg">
        {/* Cabeçalho */}
        <div className="bg-gray-200 px-4 py-2 rounded-t-md flex justify-between items-center border-b">
          <h2 className="text-sm font-bold">Sobre o DrillSoft</h2>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-4 space-y-4">
          {/* Informações principais */}
          <div className="border p-3 text-sm leading-relaxed">
            <p>
              <strong>Desenvolvido por:</strong> ALISSON GABRIEL
            </p>
            <p>
              <strong>Versão:</strong> 1.0.0
            </p>
            <p>
              <strong>Contato:</strong> eng.alissongabriel@gmail.com
            </p>
          </div>

          {/* Direitos autorais */}
          <div>
            <h3 className="text-sm font-bold">Direitos autorais</h3>
            <div className="border p-3 text-sm leading-relaxed">
              <p>
                <strong>© 2025 Alisson Gabriel.</strong>
                <br />
                Todos os direitos reservados.
                <br />
                Este aplicativo e seu conteúdo são protegidos por leis de
                direitos autorais e propriedade intelectual.
                <br />A reprodução, distribuição ou modificação não autorizada é
                proibida.
              </p>
            </div>
          </div>

          {/* Logo DrillSoft */}
          <div className="flex justify-center pt-4">
            <div className="text-center">
              <img
                src={drillsoftLogo}
                alt="Logo DrillSoft"
                className="w-14 mx-auto mb-1"
              />
              <span className="text-sm font-bold">DrillSoft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSobre;
