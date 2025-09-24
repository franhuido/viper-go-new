import React from 'react';

interface NavigationButtonProps {
  onNavigationToggle: () => void;
  isNavigating: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onNavigationToggle,
  isNavigating
}) => {

  return (
    <button
      onClick={onNavigationToggle}
      className={`inline-flex h-[50px] max-lg:h-[40px] justify-center items-center gap-2.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] absolute w-[149px] max-lg:w-[120px] px-[15px] max-lg:px-3 py-[13px] max-lg:py-2.5 rounded-[10px] border-2 border-solid z-10 transition-colors ${
        isNavigating 
          ? 'bg-[#F17431] border-[#F17431]' 
          : 'bg-black border-[#8C8C8C]'
      }`}
      style={{ left: 'calc(50vw - 274.5px - 149px - 10px)', bottom: '16px' }}
      aria-label="Toggle navigation"
    >
      <span className="text-white text-sm max-lg:text-xs font-normal leading-6 max-lg:leading-5">
        Navegar con
      </span>
      <div className="w-6 h-6 relative">
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"map-icon\" style=\"width: 18px; height: 18px; position: absolute; left: 3px; top: 3px\"> <path d=\"M12 18L6 15.9L1.35 17.7C1.01667 17.8333 0.708333 17.7958 0.425 17.5875C0.141667 17.3792 0 17.1 0 16.75V2.75C0 2.53333 0.0625 2.34167 0.1875 2.175C0.3125 2.00833 0.483333 1.88333 0.7 1.8L6 0L12 2.1L16.65 0.3C16.9833 0.166667 17.2917 0.204167 17.575 0.4125C17.8583 0.620833 18 0.9 18 1.25V15.25C18 15.4667 17.9375 15.6583 17.8125 15.825C17.6875 15.9917 17.5167 16.1167 17.3 16.2L12 18ZM11 15.55V3.85L7 2.45V14.15L11 15.55ZM13 15.55L16 14.55V2.7L13 3.85V15.55ZM2 15.3L5 14.15V2.45L2 3.45V15.3Z\" fill=\"#8C8C8C\"></path> </svg>",
          }}
        />
      </div>
    </button>
  );
};

export default NavigationButton;
