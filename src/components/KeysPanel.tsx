import React, { useState } from 'react';

interface EmergencyKey {
  id: string;
  code: string;
  description: string;
}

interface KeysPanelProps {
  onKeyConfirm: (key: string) => void;
}

const KeysPanel: React.FC<KeysPanelProps> = ({ onKeyConfirm }) => {
  const [selectedKey, setSelectedKey] = useState<string>('6-3');
  const [recommendedKey, setRecommendedKey] = useState<string>('6-9');
  const [pendingKey, setPendingKey] = useState<string | null>(null);

  const emergencyKeys: EmergencyKey[] = [
    { id: '1', code: 'En el Cuartel', description: 'En el Cuartel' },
    { id: '2', code: 'Salida Material Mayor', description: 'Salida Material Mayor' },
    { id: '3', code: '6-8', description: 'Emergency Code 6-8' },
    { id: '4', code: '6-10', description: 'Emergency Code 6-10' },
    { id: '5', code: '6-11', description: 'Emergency Code 6-11' },
    { id: '6', code: '6-12', description: 'Emergency Code 6-12' },
    { id: '7', code: '6-13', description: 'Emergency Code 6-13' },
    { id: '8', code: '6-14', description: 'Emergency Code 6-14' },
    { id: '9', code: '6-15', description: 'Emergency Code 6-15' },
  ];

  const handleKeySelect = (code: string) => {
    setPendingKey(code);
  };

  const handleRecommendedKeyClick = () => {
    setPendingKey(recommendedKey);
  };

  const handleConfirmKey = () => {
    if (pendingKey) {
      setSelectedKey(pendingKey);
      onKeyConfirm(pendingKey);

      // lógica para rotar la recomendación (ejemplo: siguiente clave en la lista)
      const currentIndex = emergencyKeys.findIndex(k => k.code === pendingKey);
      const nextIndex = (currentIndex + 1) % emergencyKeys.length;
      setRecommendedKey(emergencyKeys[nextIndex].code);

      setPendingKey(null);
    }
  };

  const handleCancelKey = () => {
    setPendingKey(null);
  };

  return (
    <section className="flex w-[276px] max-lg:w-[240px] flex-col items-start gap-2.5 h-[400px] max-lg:h-[350px] right-4 max-lg:right-3 max-lg:top-16 z-10">
      {/* Header con título Claves */}
      <div className="flex items-center gap-[13px] self-stretch">
        <div className="flex w-[130px] max-lg:w-[110px] h-9 max-lg:h-8 flex-col justify-center items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white px-4 py-1.5 rounded-[10px] border-2 border-solid border-[#D9D9D9]">
          <div className="flex justify-center items-center gap-2.5">
            <div className="w-5 h-5 relative">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<svg width=\"20\" height=\"20\" viewBox=\"0 0 22 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M6.5 10H8.5V7C8.5 6.45 8.69583 5.97917 9.0875 5.5875C9.47917 5.19583 9.95 5 10.5 5V3C9.4 3 8.45833 3.39167 7.675 4.175C6.89167 4.95833 6.5 5.9 6.5 7V10ZM2.5 18C1.95 18 1.47917 17.8042 1.0875 17.4125C0.695833 17.0208 0.5 16.55 0.5 16V14C0.5 13.45 0.695833 12.9792 1.0875 12.5875C1.47917 12.1958 1.95 12 2.5 12H3.5V7C3.5 5.05 4.17917 3.39583 5.5375 2.0375C6.89583 0.679167 8.55 0 10.5 0C12.45 0 14.1042 0.679167 15.4625 2.0375C16.8208 3.39583 17.5 5.05 17.5 7V8.075C17.3333 8.04167 17.1708 8.02083 17.0125 8.0125C16.8542 8.00417 16.6833 8 16.5 8C16.3167 8 16.1458 8.00417 15.9875 8.0125C15.8292 8.02083 15.6667 8.04167 15.5 8.075V7C15.5 5.61667 15.0125 4.4375 14.0375 3.4625C13.0625 2.4875 11.8833 2 10.5 2C9.11667 2 7.9375 2.4875 6.9625 3.4625C5.9875 4.4375 5.5 5.61667 5.5 7V12H10.175C10.025 12.3167 9.9 12.6417 9.8 12.975C9.7 13.3083 9.625 13.65 9.575 14H2.5V16H9.575C9.625 16.35 9.7 16.6917 9.8 17.025C9.9 17.3583 10.025 17.6833 10.175 18H2.5ZM16.5 20C15.1167 20 13.9375 19.5125 12.9625 18.5375C11.9875 17.5625 11.5 16.3833 11.5 15C11.5 13.6167 11.9875 12.4375 12.9625 11.4625C13.9375 10.4875 15.1167 10 16.5 10C17.8833 10 19.0625 10.4875 20.0375 11.4625C21.0125 12.4375 21.5 13.6167 21.5 15C21.5 16.3833 21.0125 17.5625 20.0375 18.5375C19.0625 19.5125 17.8833 20 16.5 20ZM14.7 17.5L17.5 14.7V17H18.5V13H14.5V14H16.8L14 16.8L14.7 17.5Z\" fill=\"#404040\"></path> </svg>",
                }}
              />
            </div>
            <span className="text-neutral-700 text-center text-xs font-normal leading-[14px]">
              Claves
            </span>
          </div>
        </div>

        {/* Clave actual */}
        <div className="flex w-[130px] max-lg:w-[110px] h-9 max-lg:h-auto justify-center items-center gap-2.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[#66BB6A] px-2 max-lg:px-1.5 py-2 max-lg:py-1.5 rounded-[10px] border-2 border-solid border-[#D9D9D9]">
          <span className="text-white text-xs text-center font-normal break-words leading-tight">
            {selectedKey}
          </span>
        </div>
      </div>

      {/* Recommended Key */}
      <button
        onClick={handleRecommendedKeyClick}
        className={`flex h-[110px] max-lg:h-[90px] justify-center items-center gap-[9.967px] self-stretch shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white px-[20px] py-[13.954px] max-lg:py-3 rounded-[20px] border-2 border-solid transition-colors ${
          selectedKey === recommendedKey
            ? 'border-[#F17431] bg-orange-50'
            : 'border-[#D9D9D9]'
        }`}
        aria-label={`Recommended emergency key: ${recommendedKey}`}
      >
        <span className="text-neutral-700 text-2xl max-lg:text-xl font-bold text-center break-words leading-tight">
          {recommendedKey}
        </span>
      </button>

      {/* Keys Grid */}
      <div className="flex flex-col justify-center items-center gap-[5px] self-stretch shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white px-2.5 py-[9px] rounded-[10px] border-2 border-solid border-[#D9D9D9]">
        <div className="grid w-[254px] max-lg:w-[220px] h-[216px] max-lg:h-[180px] gap-y-3 max-lg:gap-y-2 gap-x-[7px] max-lg:gap-x-[5px] grid-rows-[repeat(3,1fr)] grid-cols-[repeat(3,1fr)]">
          {emergencyKeys
            .filter((key) => key.code !== selectedKey) // ocultar la clave actual
            .map((key) => (
              <button
                key={key.id}
                onClick={() => handleKeySelect(key.code)}
                className={`flex w-20 max-lg:w-16 h-16 max-lg:h-12 justify-center items-center bg-white p-[6px] rounded-[10px] border-2 border-solid transition-colors ${
                  selectedKey === key.code
                    ? 'border-[#F17431] bg-orange-50'
                    : 'border-[#D9D9D9]'
                }`}
                aria-label={`Emergency key: ${key.code}`}
              >
                <span
                  className={`text-center font-bold text-neutral-700 leading-tight break-words ${
                    key.code.length > 8
                      ? 'text-[10px] max-lg:text-[8px]'
                      : key.code.includes('-')
                      ? 'text-lg max-lg:text-base'
                      : 'text-xs max-lg:text-[10px]'
                  }`}
                >
                  {key.code}
                </span>
              </button>
            ))}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {pendingKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-[20px] p-8 w-[400px] max-w-[90vw] shadow-xl">
            <h2 className="text-center text-gray-600 text-xl font-normal mb-8">
              ¿Es correcto?
            </h2>
            <div className="text-center mb-8">
              <span className="text-[#F17431] text-6xl font-normal">
                {pendingKey}
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCancelKey}
                className="flex-1 h-12 bg-white border-2 border-gray-300 rounded-full text-gray-700 text-lg font-normal hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmKey}
                className="flex-1 h-12 bg-[#F17431] border-2 border-[#F17431] rounded-full text-white text-lg font-normal hover:bg-[#E6681F] transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default KeysPanel;
