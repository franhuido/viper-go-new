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
  const [recommendedKey] = useState<string>('6-9');
  
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  
  const [emergencyKeys] = useState<EmergencyKey[]>([
    { id: '1', code: 'En el Cuartel', description: 'En el Cuartel' },
    { id: '2', code: 'Salida Material Mayor', description: 'Salida Material Mayor' },
    { id: '3', code: '6-8', description: 'Emergency Code 6-8' },
    { id: '4', code: '6-10', description: 'Emergency Code 6-10' },
    { id: '5', code: '6-11', description: 'Emergency Code 6-11' },
    { id: '6', code: '6-12', description: 'Emergency Code 6-12' },
    { id: '7', code: '6-13', description: 'Emergency Code 6-13' },
    { id: '8', code: '6-14', description: 'Emergency Code 6-14' },
    { id: '9', code: '6-15', description: 'Emergency Code 6-15' },
  ]);

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
      setPendingKey(null);
    }
  };

  const handleCancelKey = () => {
    setPendingKey(null);
  };

  return (
    <section className="flex w-[276px] max-lg:w-[240px] flex-col items-start gap-2.5 h-[400px] max-lg:h-[350px] right-4 max-lg:right-3 max-lg:top-16 z-10">
      <div className="flex items-center gap-[13px] self-stretch">
        <div className="flex w-[130px] max-lg:w-[110px] h-9 max-lg:h-8 flex-col justify-center items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white px-9 max-lg:px-6 py-1.5 max-lg:py-1 rounded-[10px] border-2 border-solid border-[#D9D9D9]">
          <div className="flex justify-center items-center gap-2.5">
            <div className="w-6 h-6 relative">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<svg width=\"22\" height=\"20\" viewBox=\"0 0 22 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"siren-icon\" style=\"width: 21px; height: 20px; position: absolute; left: 2px; top: 3px\"> <path d=\"M6.5 10H8.5V7C8.5 6.45 8.69583 5.97917 9.0875 5.5875C9.47917 5.19583 9.95 5 10.5 5V3C9.4 3 8.45833 3.39167 7.675 4.175C6.89167 4.95833 6.5 5.9 6.5 7V10ZM2.5 18C1.95 18 1.47917 17.8042 1.0875 17.4125C0.695833 17.0208 0.5 16.55 0.5 16V14C0.5 13.45 0.695833 12.9792 1.0875 12.5875C1.47917 12.1958 1.95 12 2.5 12H3.5V7C3.5 5.05 4.17917 3.39583 5.5375 2.0375C6.89583 0.679167 8.55 0 10.5 0C12.45 0 14.1042 0.679167 15.4625 2.0375C16.8208 3.39583 17.5 5.05 17.5 7V8.075C17.3333 8.04167 17.1708 8.02083 17.0125 8.0125C16.8542 8.00417 16.6833 8 16.5 8C16.3167 8 16.1458 8.00417 15.9875 8.0125C15.8292 8.02083 15.6667 8.04167 15.5 8.075V7C15.5 5.61667 15.0125 4.4375 14.0375 3.4625C13.0625 2.4875 11.8833 2 10.5 2C9.11667 2 7.9375 2.4875 6.9625 3.4625C5.9875 4.4375 5.5 5.61667 5.5 7V12H10.175C10.025 12.3167 9.9 12.6417 9.8 12.975C9.7 13.3083 9.625 13.65 9.575 14H2.5V16H9.575C9.625 16.35 9.7 16.6917 9.8 17.025C9.9 17.3583 10.025 17.6833 10.175 18H2.5ZM16.5 20C15.1167 20 13.9375 19.5125 12.9625 18.5375C11.9875 17.5625 11.5 16.3833 11.5 15C11.5 13.6167 11.9875 12.4375 12.9625 11.4625C13.9375 10.4875 15.1167 10 16.5 10C17.8833 10 19.0625 10.4875 20.0375 11.4625C21.0125 12.4375 21.5 13.6167 21.5 15C21.5 16.3833 21.0125 17.5625 20.0375 18.5375C19.0625 19.5125 17.8833 20 16.5 20ZM14.7 17.5L17.5 14.7V17H18.5V13H14.5V14H16.8L14 16.8L14.7 17.5Z\" fill=\"#404040\"></path> </svg>",
                }}
              />
            </div>
            <span className="text-neutral-700 text-center text-xs font-normal leading-[14px]">
              Claves
            </span>
          </div>
        </div>
        <div className="flex w-[130px] max-lg:w-[110px] h-9 max-lg:h-8 justify-center items-center gap-2.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[#66BB6A] px-2 max-lg:px-1.5 py-2 max-lg:py-1.5 rounded-[10px] border-2 border-solid border-[#D9D9D9]">
          <div className="w-6 h-6 relative">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"keys-person-icon\" style=\"width: 16px; height: 16px; position: absolute; left: 4px; top: 4px\"> <path d=\"M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z\" fill=\"white\"></path> </svg>",
              }}
            />
          </div>
          <span className="text-white text-sm font-normal whitespace-nowrap">
            {selectedKey}
          </span>
        </div>
      </div>

      {/* Recommended Key */}
      <button
        onClick={handleRecommendedKeyClick}
        className={`flex h-[110px] max-lg:h-[90px] justify-center items-center gap-[9.967px] self-stretch shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white px-[60.798px] max-lg:px-8 py-[13.954px] max-lg:py-3 rounded-[20px] border-2 border-solid transition-colors ${
          selectedKey === recommendedKey 
            ? 'border-[#F17431] bg-orange-50' 
            : 'border-[#D9D9D9]'
        }`}
        aria-label={`Recommended emergency key: ${recommendedKey}`}
      >
        <div className="w-[68px] h-[68px] max-lg:w-[50px] max-lg:h-[50px] relative">
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"52\" height=\"52\" viewBox=\"0 0 52 52\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"logout-icon\" style=\"width: 51px; height: 51px; position: absolute; left: 9px; top: 9px\"> <path d=\"M6.18351 51.5C4.62518 51.5 3.29115 50.9451 2.18143 49.8354C1.07171 48.7257 0.516846 47.3917 0.516846 45.8333V6.16667C0.516846 4.60833 1.07171 3.27431 2.18143 2.16458C3.29115 1.05486 4.62518 0.5 6.18351 0.5H26.0168V6.16667H6.18351V45.8333H26.0168V51.5H6.18351ZM37.3502 40.1667L33.4543 36.0583L40.6793 28.8333H17.5168V23.1667H40.6793L33.4543 15.9417L37.3502 11.8333L51.5168 26L37.3502 40.1667Z\" fill=\"#F17431\"></path> </svg>",
            }}
          />
        </div>
        <span className="text-neutral-700 text-3xl max-lg:text-2xl font-bold whitespace-nowrap">
          {recommendedKey}
        </span>
      </button>

      {/* Keys Grid */}
      <div className="flex flex-col justify-center items-center gap-[5px] self-stretch shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white px-2.5 py-[9px] rounded-[10px] border-2 border-solid border-[#D9D9D9]">
        <div className="grid w-[254px] max-lg:w-[220px] h-[216px] max-lg:h-[180px] gap-y-3 max-lg:gap-y-2 gap-x-[7px] max-lg:gap-x-[5px] grid-rows-[repeat(3,1fr)] grid-cols-[repeat(3,1fr)]">
          {emergencyKeys.map((key) => (
            <button
              key={key.id}
              onClick={() => handleKeySelect(key.code)}
              className={`flex w-20 max-lg:w-16 h-16 max-lg:h-12 justify-center items-center gap-2.5 bg-white p-[13px] max-lg:p-2 rounded-[10px] border-2 border-solid transition-colors ${
                selectedKey === key.code 
                  ? 'border-[#F17431] bg-orange-50' 
                  : 'border-[#D9D9D9]'
              }`}
              aria-label={`Emergency key: ${key.code}`}
            >
              <span className={`text-center font-bold ${
                key.code.includes('-') 
                  ? 'text-lg max-lg:text-base' 
                  : 'text-xs max-lg:text-[10px]'
              } text-neutral-700 leading-tight`}>
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
