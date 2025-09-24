import React from 'react';
import { ExternalLink } from 'lucide-react';

interface NavigationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  emergencyAddress: string;
}

const NavigationSheet: React.FC<NavigationSheetProps> = ({
  isOpen,
  onClose,
  emergencyAddress
}) => {
  const handleGoogleMapsNavigation = () => {
    const encodedAddress = encodeURIComponent(emergencyAddress);
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Navigation Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Navegar a la emergencia
          </h3>
          
          <p className="text-gray-600 mb-6 text-sm">
            Dirección: {emergencyAddress}
          </p>
          
          {/* Google Maps Option */}
          <button
            onClick={handleGoogleMapsNavigation}
            className="flex items-center justify-between w-full p-4 bg-white border-2 border-gray-200 rounded-[15px] hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Google Maps</p>
                <p className="text-sm text-gray-600">Navegación paso a paso</p>
              </div>
            </div>
            <ExternalLink size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationSheet;