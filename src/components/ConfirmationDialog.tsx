import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedKey: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedKey
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        {/* Dialog */}
        <div className="bg-white rounded-[20px] p-8 w-[400px] max-w-[90vw] shadow-xl">
          {/* Question */}
          <h2 className="text-center text-gray-600 text-xl font-normal mb-8">
            ¿Es correcto?
          </h2>

          {/* Selected Key Display */}
          <div className="text-center mb-8">
            <span className="text-[#F17431] text-6xl font-normal">
              {selectedKey}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 h-12 bg-white border-2 border-gray-300 rounded-full text-gray-700 text-lg font-normal hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 h-12 bg-[#F17431] border-2 border-[#F17431] rounded-full text-white text-lg font-normal hover:bg-[#E6681F] transition-colors"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationDialog;