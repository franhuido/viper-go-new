import React from 'react';

interface Vehicle {
  id: string;
  name: string;
  status: 'active' | 'inactive';
}

interface VehiclePanelProps {
  vehicles: Vehicle[];
  currentVehicle: string;
  onVehicleSelect: (vehicleName: string) => void;
}

const VehiclePanel: React.FC<VehiclePanelProps> = ({
  vehicles,
  currentVehicle,
  onVehicleSelect
}) => {
  return (
    <section className="flex w-[276px] max-lg:w-[240px] flex-col items-start gap-2.5 h-[158px] max-lg:h-[140px] right-4 max-lg:right-3 max-lg:bottom-16 z-10">
      <div className="flex items-center gap-4 self-stretch">
        {/* Caja título "Vehículos" */}
        <div className="flex w-[130px] max-lg:w-[110px] h-9 max-lg:h-8 flex-col justify-center items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white px-9 max-lg:px-6 py-1.5 max-lg:py-1 rounded-[10px] border-2 border-solid border-[#D9D9D9]">
          <div className="flex justify-center items-center gap-2.5">
            <div className="w-6 h-6 relative">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<svg width=\"22\" height=\"18\" viewBox=\"0 0 22 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"fire-truck-icon\" style=\"width: 22px; height: 18px; position: absolute; left: 1px; top: 3px\"> <path d=\"M6 18C5.16667 18 4.45833 17.7083 3.875 17.125C3.29167 16.5417 3 15.8333 3 15H2C1.45 15 0.979167 14.8042 0.5875 14.4125C0.195833 14.0208 0 13.55 0 13V8H11V4C11 3.45 11.1958 2.97917 11.5875 2.5875C11.9792 2.19583 12.45 2 13 2H15V1C15 0.716667 15.0958 0.479167 15.2875 0.2875C15.4792 0.0958333 15.7167 0 16 0H17C17.2833 0 17.5208 0.0958333 17.7125 0.2875C17.9042 0.479167 18 0.716667 18 1V2H18.55C18.9833 2 19.375 2.125 19.725 2.375C20.075 2.625 20.3167 2.95833 20.45 3.375L21.9 7.675C21.9333 7.775 21.9583 7.87917 21.975 7.9875C21.9917 8.09583 22 8.20833 22 8.325V15H19C19 15.8333 18.7083 16.5417 18.125 17.125C17.5417 17.7083 16.8333 18 16 18C15.1667 18 14.4583 17.7083 13.875 17.125C13.2917 16.5417 13 15.8333 13 15H9C9 15.8333 8.70833 16.5417 8.125 17.125C7.54167 17.7083 6.83333 18 6 18ZM6 16C6.28333 16 6.52083 15.9042 6.7125 15.7125C6.90417 15.5208 7 15.2833 7 15C7 14.7167 6.90417 14.4792 6.7125 14.2875C6.52083 14.0958 6.28333 14 6 14C5.71667 14 5.47917 14.0958 5.2875 14.2875C5.09583 14.4792 5 14.7167 5 15C5 15.2833 5.09583 15.5208 5.2875 15.7125C5.47917 15.9042 5.71667 16 6 16ZM16 16C16.2833 16 16.5208 15.9042 16.7125 15.7125C16.9042 15.5208 17 15.2833 17 15C17 14.7167 16.9042 14.4792 16.7125 14.2875C16.5208 14.0958 16.2833 14 16 14C15.7167 14 15.4792 14.0958 15.2875 14.2875C15.0958 14.4792 15 14.7167 15 15C15 15.2833 15.0958 15.5208 15.2875 15.7125C15.4792 15.9042 15.7167 16 16 16ZM2 10V13H3.775C4.05833 12.6833 4.39167 12.4375 4.775 12.2625C5.15833 12.0875 5.56667 12 6 12C6.43333 12 6.84167 12.0875 7.225 12.2625C7.60833 12.4375 7.94167 12.6833 8.225 13H11V10H2ZM13 13H13.775C14.0583 12.6833 14.3917 12.4375 14.775 12.2625C15.1583 12.0875 15.5667 12 16 12C16.43333 12 16.84167 12.0875 17.225 12.2625C17.6083 12.4375 17.9417 12.6833 18.225 13H20V10H13V13ZM13 8H19.9L18.55 4H13V8ZM0 7V5.5H1V3.5H0V2H10V3.5H9V5.5H10V7H0ZM2.5 5.5H4.25V3.5H2.5V5.5ZM5.75 5.5H7.5V3.5H5.75V5.5Z\" fill=\"#404040\"></path> </svg>",
                }}
              />
            </div>
            <span className="text-neutral-700 text-center text-xs font-normal leading-[14px]">
              Vehiculos
            </span>
          </div>
        </div>
        {/* Vehículo actual */}
        <div className="flex w-[130px] max-lg:w-[110px] h-9 max-lg:h-8 justify-center items-center gap-2.5 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-[#66BB6A] px-2 max-lg:px-1.5 py-2 max-lg:py-1.5 rounded-[10px] border-2 border-solid border-[#D9D9D9]">
          <div className="w-6 h-6 relative">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"person-icon\" style=\"width: 16px; height: 16px; position: absolute; left: 4px; top: 4px\"> <path d=\"M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0ZM2 14H14V13.2C14 13.0167 13.9542 12.85 13.8625 12.7C13.7708 12.55 13.65 12.4333 13.5 12.35C12.6 11.9 11.6917 11.5625 10.775 11.3375C9.85833 11.1125 8.93333 11 8 11C7.06667 11 6.14167 11.1125 5.225 11.3375C4.30833 11.5625 3.4 11.9 2.5 12.35C2.35 12.4333 2.22917 12.55 2.1375 12.7C2.04583 12.85 2 13.0167 2 13.2V14ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6Z\" fill=\"white\"></path> </svg>",
                }}
              />
            </div>
          <span className="text-white text-sm font-normal whitespace-nowrap">
            {currentVehicle}
          </span>
        </div>
      </div>

      {/* Lista de vehículos */}
      <div className="flex h-28 flex-col items-center gap-2.5 self-stretch shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white px-2.5 py-2 rounded-[20px] border-2 border-solid border-[#D9D9D9] max-sm:h-20 max-sm:px-2 max-sm:py-2.5">
        <div className="flex items-center content-start gap-[5px] self-stretch flex-wrap px-[5px]">
          {vehicles
            .filter((vehicle) => vehicle.name !== currentVehicle) // 🚫 oculta vehículo actual
            .map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => onVehicleSelect(vehicle.name)}
                className="flex min-w-[50px] justify-center items-center px-[15px] py-2 rounded-[20px] border-2 border-solid border-[#D9D9D9] max-sm:min-w-10 max-sm:px-2.5 max-sm:py-1.5 transition-colors bg-black text-[#D9D9D9] hover:bg-[#F17431] hover:text-white"
              >
                <span className="text-center text-xl font-normal leading-6 max-sm:text-sm max-sm:leading-[18px]">
                  {vehicle.name}
                </span>
              </button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default VehiclePanel;
