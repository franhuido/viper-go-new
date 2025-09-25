import React, { useState } from "react";
import {
  History,
  Activity,
  LayoutPanelTop,
  LogOut,
  ArrowLeft,
  Menu,
} from "lucide-react";
import CommunicationHistory from "./CommunicationHistory";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuView, setMenuView] = useState<"main" | "history">("main");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setMenuView("main"); // volver siempre al menú principal al abrir
  };

  return (
    <div>
      {/* Botón para abrir el menú (mismo estilo que ControlButtons) */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="flex w-12 h-12 max-lg:w-10 max-lg:h-10 justify-center items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white rounded-full border-2 border-solid transition-colors border-[#D9D9D9] hover:border-[#F17431] hover:bg-orange-50 absolute left-4 max-lg:left-3 top-4 max-lg:top-3 z-50"
      >
        <div className="flex items-center justify-center w-full h-full">
          <Menu className="w-6 h-6 text-[#404040]" />
        </div>
      </button>

      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header del menú */}
        <div className="flex items-center justify-between p-4 border-b">
          <svg id="294:2790" width="50%" height="500%" viewBox="0 0 256 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><g clip-path="url(#clip0_294_2790)"> <path d="M52.1673 0.590221H43.8945V38.4321H52.1673V0.590221Z" fill="#010101"></path> <path d="M76.1346 27.0779H69.8482V38.4321H61.5754V0.590221H76.9428C85.9234 0.590221 91.3382 5.94304 91.3382 13.6719V13.7783C91.3382 22.5384 84.5711 27.0673 76.1346 27.0673M82.9598 13.8314C82.9598 10.1105 80.3819 8.10119 76.2402 8.10119H69.8482V19.6733H76.404C80.5404 19.6733 82.9598 17.1856 82.9598 13.943V13.8314Z" fill="#010101"></path> <path d="M97.4661 38.4321V0.590221H125.834V7.99487H105.686V15.6759H123.415V23.0806H105.686V31.0274H126.104V38.4321H97.4661Z" fill="#010101"></path> <path d="M156.299 38.4321L148.238 26.3231H141.74V38.4321H133.468V0.590221H150.657C159.522 0.590221 164.842 5.29454 164.842 13.0766V13.1829C164.842 19.2959 161.566 23.1337 156.78 24.9145L165.967 38.4321H156.299ZM156.458 13.5072C156.458 9.94039 153.986 8.10119 149.96 8.10119H141.74V18.9716H150.119C154.149 18.9716 156.458 16.8082 156.458 13.6188V13.5072Z" fill="#010101"></path> <path d="M15.3302 39.0591L-0.000244141 0.632496H9.29204L24.6172 39.0591H15.3302Z" fill="#010101"></path> <path d="M39.9373 0.632496H30.6714L35.3043 12.2471L39.9373 0.632496Z" fill="#E92530"></path> <path d="M30.6715 0.632496H30.6504H21.3845L26.0175 12.2471L30.661 23.8936L35.3045 12.2471L30.6715 0.632496Z" fill="#F17431"></path> <path d="M172.834 20.1092V19.9975C172.834 8.78689 181.572 0.000179291 193.437 0.000179291C200.151 0.000179291 204.906 2.0839 208.942 5.60284L202.703 13.1298C199.972 10.8228 197.246 9.5045 193.474 9.5045C187.954 9.5045 183.727 14.1503 183.727 20.056V20.1623C183.727 26.3709 188.043 30.7935 194.103 30.7935C196.67 30.7935 198.635 30.262 200.215 29.1989V24.5264H192.655V16.755H210.241V34.0626C205.566 37.9328 199.691 40.0319 193.638 39.9949C181.736 39.9949 172.834 31.7557 172.834 20.1092Z" fill="#F17431"></path> <path d="M214.827 20.1091V19.9975C214.827 8.95167 223.675 0.000179291 235.472 0.000179291C247.268 0.000179291 256 8.83473 256 19.8859V19.9975C256 31.0434 247.152 39.9949 235.361 39.9949C223.57 39.9949 214.827 31.1603 214.827 20.1091ZM245.187 20.1091V19.9975C245.187 14.448 241.203 9.61613 235.361 9.61613C229.518 9.61613 225.693 14.3364 225.693 19.8859V19.9975C225.693 25.547 229.682 30.3789 235.472 30.3789C241.262 30.3789 245.187 25.6586 245.187 20.1091Z" fill="#F17431"></path> </g> <defs> <clipPath id="clip0_294_2790"> <rect width="256" height="40" fill="white"></rect> </clipPath> </defs> </svg>
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Contenido del sidebar */}
        {menuView === "main" && (
          <ul className="p-4 space-y-4">
            <li
              className="flex items-center gap-3 cursor-pointer hover:text-orange-600"
              onClick={() => setMenuView("history")}
            >
              <History className="w-5 h-5" />
              <span>Historial de comunicaciones</span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-orange-600">
              <Activity className="w-5 h-5" />
              <span>Diagnóstico</span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-orange-600">
              <LayoutPanelTop className="w-5 h-5" />
              <span>Forzar vista horizontal</span>
            </li>
          </ul>
        )}

        {menuView === "history" && (
          <div className="flex flex-col h-full">
            {/* Botón volver */}
            <div
              className="flex items-center gap-2 p-4 border-b cursor-pointer hover:text-orange-600"
              onClick={() => setMenuView("main")}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver</span>
            </div>
            {/* Historial dentro del sidebar */}
            <div className="flex-1 overflow-y-auto p-4">
              <CommunicationHistory />
            </div>
          </div>
        )}

        {/* Logout abajo */}
        <div className="absolute bottom-6 left-0 w-full px-4">
          <button className="flex items-center gap-2 text-red-600 hover:text-red-800">
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
