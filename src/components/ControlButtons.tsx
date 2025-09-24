import React, { useState } from 'react';
interface ControlButtonsProps {
  onMenuToggle: () => void;
  onTrafficToggle: (show: boolean) => void;
  onLayersToggle: (style: 'normal' | 'satellite') => void;
  onLocationCenter: () => void;
  showTraffic: boolean;
  mapStyle: 'normal' | 'satellite';
}
const ControlButtons: React.FC<ControlButtonsProps> = ({
  onMenuToggle,
  onTrafficToggle,
  onLayersToggle,
  onLocationCenter,
  showTraffic,
  mapStyle
}) => {
  const handleTrafficToggle = () => {
    onTrafficToggle(!showTraffic);
  };
  const handleLayersToggle = () => {
    const newStyle = mapStyle === 'normal' ? 'satellite' : 'normal';
    onLayersToggle(newStyle);
  };
  return <>
      {/* Menu Button */}
      <button onClick={onMenuToggle} className="flex w-12 h-12 max-lg:w-10 max-lg:h-10 justify-center items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white rounded-full border-2 border-solid transition-colors border-[#D9D9D9] hover:border-[#F17431] hover:bg-orange-50 absolute left-4 max-lg:left-3 top-4 max-lg:top-3 z-10" aria-label="Toggle menu">
        <div className="flex items-center justify-center w-full h-full">
          <div dangerouslySetInnerHTML={{
          __html: "<svg width=\"18\" height=\"12\" viewBox=\"0 0 26 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M0.25 17.5V14.6667H25.75V17.5H0.25ZM0.25 10.4167V7.58333H25.75V10.4167H0.25ZM0.25 3.33333V0.5H25.75V3.33333H0.25Z\" fill=\"#404040\"></path> </svg>"
        }} />
        </div>
      </button>

      {/* Compass Button */}
      

      {/* Traffic Button */}
      <button onClick={handleTrafficToggle} className={`flex w-12 h-12 max-lg:w-10 max-lg:h-10 justify-center items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white rounded-lg border-2 border-solid transition-colors absolute left-4 max-lg:left-3 bottom-32 max-lg:bottom-28 z-10 ${showTraffic ? 'border-[#F17431] bg-orange-50' : 'border-[#D9D9D9]'}`} aria-label="Toggle traffic view">
        <div dangerouslySetInnerHTML={{
        __html: "<svg width=\"16\" height=\"18\" viewBox=\"0 0 16 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M8 15C8.43333 15 8.79167 14.8583 9.075 14.575C9.35833 14.2917 9.5 13.9333 9.5 13.5C9.5 13.0667 9.35833 12.7083 9.075 12.425C8.79167 12.1417 8.43333 12 8 12C7.56667 12 7.20833 12.1417 6.925 12.425C6.64167 12.7083 6.5 13.0667 6.5 13.5C6.5 13.9333 6.64167 14.2917 6.925 14.575C7.20833 14.8583 7.56667 15 8 15ZM8 10.5C8.43333 10.5 8.79167 10.3583 9.075 10.075C9.35833 9.79167 9.5 9.43333 9.5 9C9.5 8.56667 9.35833 8.20833 9.075 7.925C8.79167 7.64167 8.43333 7.5 8 7.5C7.56667 7.5 7.20833 7.64167 6.925 7.925C6.64167 8.20833 6.5 8.56667 6.5 9C6.5 9.43333 6.64167 9.79167 6.925 10.075C7.20833 10.3583 7.56667 10.5 8 10.5ZM8 6C8.43333 6 8.79167 5.85833 9.075 5.575C9.35833 5.29167 9.5 4.93333 9.5 4.5C9.5 4.06667 9.35833 3.70833 9.075 3.425C8.79167 3.14167 8.43333 3 8 3C7.56667 3 7.20833 3.14167 6.925 3.425C6.64167 3.70833 6.5 4.06667 6.5 4.5C6.5 4.93333 6.64167 5.29167 6.925 5.575C7.20833 5.85833 7.56667 6 8 6ZM3 12V10.85C2.15 10.6167 1.4375 10.15 0.8625 9.45C0.2875 8.75 0 7.93333 0 7H3V5.85C2.15 5.61667 1.4375 5.15 0.8625 4.45C0.2875 3.75 0 2.93333 0 2H3C3 1.45 3.19583 0.979167 3.5875 0.5875C3.97917 0.195833 4.45 0 5 0H11C11.55 0 12.0208 0.195833 12.4125 0.5875C12.8042 0.979167 13 1.45 13 2H16C16 2.93333 15.7125 3.75 15.1375 4.45C14.5625 5.15 13.85 5.61667 13 5.85V7H16C16 7.93333 15.7125 8.75 15.1375 9.45C14.5625 10.15 13.85 10.6167 13 10.85V12H16C16 12.9333 15.7125 13.75 15.1375 14.45C14.5625 15.15 13.85 15.6167 13 15.85V16C13 16.55 12.8042 17.0208 12.4125 17.4125C12.0208 17.8042 11.55 18 11 18H5C4.45 18 3.97917 17.8042 3.5875 17.4125C3.19583 17.0208 3 16.55 3 16V15.85C2.15 15.6167 1.4375 15.15 0.8625 14.45C0.2875 13.75 0 12.9333 0 12H3ZM5 16H11V2H5V16Z\" fill=\"#404040\"></path> </svg>"
      }} />
      </button>

      {/* Layers Button */}
      <button onClick={handleLayersToggle} className={`flex w-12 h-12 max-lg:w-10 max-lg:h-10 justify-center items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white rounded-lg border-2 border-solid transition-colors absolute left-4 max-lg:left-3 bottom-16 max-lg:bottom-14 z-10 ${mapStyle === 'satellite' ? 'border-[#F17431] bg-orange-50' : 'border-[#D9D9D9]'}`} aria-label="Toggle layers">
        <div dangerouslySetInnerHTML={{
        __html: "<svg width=\"18\" height=\"20\" viewBox=\"0 0 18 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M9 19.05L0 12.05L1.65 10.8L9 16.5L16.35 10.8L18 12.05L9 19.05ZM9 14L0 7L9 0L18 7L9 14ZM9 11.45L14.75 7L9 2.55L3.25 7L9 11.45Z\" fill=\"#404040\"></path> </svg>"
      }} />
      </button>

      {/* Location Button - positioned at bottom right */}
      <button onClick={onLocationCenter} className="flex w-12 h-12 max-lg:w-10 max-lg:h-10 justify-center items-center shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] bg-white rounded-full border-2 border-solid transition-colors border-[#D9D9D9] hover:border-[#F17431] hover:bg-orange-50 absolute right-4 max-lg:right-3 bottom-20 max-lg:bottom-16 z-10" aria-label="Center on my location">
        <div dangerouslySetInnerHTML={{
        __html: "<svg width=\"18\" height=\"18\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M10 21.95V19.95C7.91672 19.7167 6.12922 18.8542 4.63755 17.3625C3.14588 15.8708 2.28338 14.0833 2.05005 12H0.0500488V9.99999H2.05005C2.28338 7.91665 3.14588 6.12915 4.63755 4.63749C6.12922 3.14582 7.91672 2.28332 10 2.04999V0.0499878H12V2.04999C14.0834 2.28332 15.8709 3.14582 17.3625 4.63749C18.8542 6.12915 19.7167 7.91665 19.95 9.99999H21.95V12H19.95C19.7167 14.0833 18.8542 15.8708 17.3625 17.3625C15.8709 18.8542 14.0834 19.7167 12 19.95V21.95H10ZM11 18C12.9334 18 14.5834 17.3167 15.95 15.95C17.3167 14.5833 18 12.9333 18 11C18 9.06665 17.3167 7.41665 15.95 6.04999C14.5834 4.68332 12.9334 3.99999 11 3.99999C9.06672 3.99999 7.41672 4.68332 6.05005 6.04999C4.68338 7.41665 4.00005 9.06665 4.00005 11C4.00005 12.9333 4.68338 14.5833 6.05005 15.95C7.41672 17.3167 9.06672 18 11 18ZM11 15C9.90005 15 8.95838 14.6083 8.17505 13.825C7.39172 13.0417 7.00005 12.1 7.00005 11C7.00005 9.89999 7.39172 8.95832 8.17505 8.17499C8.95838 7.39165 9.90005 6.99999 11 6.99999C12.1 6.99999 13.0417 7.39165 13.825 8.17499C14.6084 8.95832 15 9.89999 15 11C15 12.1 14.6084 13.0417 13.825 13.825C13.0417 14.6083 12.1 15 11 15ZM11 13C11.55 13 12.0209 12.8042 12.4125 12.4125C12.8042 12.0208 13 11.55 13 11C13 10.45 12.8042 9.97915 12.4125 9.58749C12.0209 9.19582 11.55 8.99999 11 8.99999C10.45 8.99999 9.97922 9.19582 9.58755 9.58749C9.19588 9.97915 9.00005 10.45 9.00005 11C9.00005 11.55 9.19588 12.0208 9.58755 12.4125C9.97922 12.8042 10.45 13 11 13Z\" fill=\"#404040\"></path> </svg>"
      }} />
      </button>
    </>;
};
export default ControlButtons;