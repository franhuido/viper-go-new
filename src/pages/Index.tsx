import React, { useMemo, useState } from 'react';
import Map from '@/components/Map';
import SidebarMenu from '@/components/SidebarMenu';
import CommunicationHistory from '@/components/CommunicationHistory';
import NavigationSheet from '@/components/NavigationSheet';
import Header from '@/components/Header';
import ControlButtons from '@/components/ControlButtons';
import NavigationButton from '@/components/NavigationButton';
import VehiclePanel from '@/components/VehiclePanel';
import KeysPanel from '@/components/KeysPanel';
import FilterBar from '@/components/FilterBar';
import EmergencyAlert from '@/components/EmergencyAlert';

const Index: React.FC = () => {
  // State management
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCommunicationHistory, setShowCommunicationHistory] = useState(false);
  const [showNavigationSheet, setShowNavigationSheet] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [mapStyle, setMapStyle] = useState<'normal' | 'satellite'>('normal');
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Filter states
  const [showHydrants, setShowHydrants] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);
  const [showPolice, setShowPolice] = useState(false);
  const [showFireStations, setShowFireStations] = useState(true);
  const [showSIC, setShowSIC] = useState(false);
  const [showMonuments, setShowMonuments] = useState(false);

  // Emergency and vehicle data
  const emergencyLocation: [number, number] = [-70.6506, -33.4372]; // Santiago coordinates
  const emergencyAddress = 'AVENIDA PUNTA ARENAS / AVENIDA TRINIDAD';
  const currentVehicle = 'RB 6';
  
  const vehicles = [
    { id: '1', name: 'Super Tango 2', status: 'inactive' as const },
    { id: '2', name: 'BX19', status: 'inactive' as const },
    { id: '3', name: 'RB 6', status: 'active' as const },
    { id: '4', name: 'BZ12', status: 'inactive' as const },
   ];

  const vehiclesWithCoords = useMemo(() => {
    const base: [number, number] = [-70.6506, -33.4372];
    const offsets: Array<[number, number]> = [
      [0.002, 0.002],
      [0.004, -0.001],
      [-0.003, 0.003],
      [-0.0015, -0.0025],
    ];
    return vehicles.map((v, i) => ({
      ...v,
      coordinates: [
        base[0] + (offsets[i]?.[0] ?? 0.001 * (i + 1)),
        base[1] + (offsets[i]?.[1] ?? 0.001 * (i + 1)),
      ] as [number, number],
    }));
  }, []);

  // Event handlers
  const handleMenuToggle = () => setShowSidebar(!showSidebar);
  
  const handleTrafficToggle = (show: boolean) => setShowTraffic(show);
  
  const handleLayersToggle = (style: 'normal' | 'satellite') => setMapStyle(style);
  
  const handleLocationCenter = () => {
    // This will be called by the map component
    console.log('Center on user location');
  };
  
  const handleNavigationToggle = () => {
    setShowNavigationSheet(!showNavigationSheet);
    setIsNavigating(!isNavigating);
  };
  
  const handleVehicleSelect = (vehicleName: string) => {
    if (vehicleName !== currentVehicle) {
      console.log('Center map on vehicle:', vehicleName);
      // Here you would center the map on the selected vehicle
    }
  };
  
  const handleKeyConfirm = (key: string) => {
    console.log('Emergency key confirmed:', key);
    // Here you would send the key to the communication system
  };
  
  const handleFilterChange = (filterId: string, active: boolean) => {
    switch (filterId) {
      case '1': // Grifos
        setShowHydrants(active);
        break;
      case '2': // Monumentos
        setShowMonuments(active);
        break;
      case '3': // Hospitales
        setShowHospitals(active);
        break;
      case '4': // Carabineros
        setShowPolice(active);
        break;
      case '5': // Bomberos
        setShowFireStations(active);
        break;
      case '6': // SIC
        setShowSIC(active);
        break;
      default:
        break;
    }
  };
  
  const handleSidebarAction = (action: string) => {
    switch (action) {
      case 'diagnostic':
        console.log('Open diagnostic');
        setShowSidebar(false);
        break;
      case 'history':
        setShowCommunicationHistory(true);
        setShowSidebar(false);
        break;
      case 'vertical':
        console.log('Force vertical view');
        setShowSidebar(false);
        break;
      case 'logout':
        console.log('Logout');
        setShowSidebar(false);
        break;
    }
  };
  return (
    <main className="w-screen h-screen relative overflow-hidden bg-gray-100">
      {/* Functional Map */}
      <Map
        showTraffic={showTraffic}
        mapStyle={mapStyle}
        showHydrants={showHydrants}
        showHospitals={showHospitals}
        showPolice={showPolice}
        showFireStations={showFireStations}
        showSIC={showSIC}
        showMonuments={showMonuments}
        vehicles={vehiclesWithCoords}
        emergencyLocation={emergencyLocation}
      />

      {/* Header with Logo */}
      <Header />

      {/* Control Buttons */}
      <ControlButtons
        onMenuToggle={handleMenuToggle}
        onTrafficToggle={handleTrafficToggle}
        onLayersToggle={handleLayersToggle}
        onLocationCenter={handleLocationCenter}
        showTraffic={showTraffic}
        mapStyle={mapStyle}
      />

      {/* Navigation Button */}
      <NavigationButton
        onNavigationToggle={handleNavigationToggle}
        isNavigating={isNavigating}
      />

      <div className="absolute right-4 max-lg:right-3 top-20 flex flex-col items-end gap-[20px] z-10">
       {/* Emergency Keys Panel */}
      <KeysPanel onKeyConfirm={handleKeyConfirm} />

        {/* Vehicle Management Panel */}
      <VehiclePanel
        vehicles={vehicles}
        currentVehicle={currentVehicle}
        onVehicleSelect={handleVehicleSelect}
      />
      </div>

      

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Emergency Alert */}
      <EmergencyAlert />

      {/* Sidebar Menu */}
      <SidebarMenu
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onDiagnostic={() => handleSidebarAction('diagnostic')}
        onCommunicationHistory={() => handleSidebarAction('history')}
        onForceVertical={() => handleSidebarAction('vertical')}
        onLogout={() => handleSidebarAction('logout')}
      />

      {/* Communication History */}
      <CommunicationHistory
        isOpen={showCommunicationHistory}
        onClose={() => setShowCommunicationHistory(false)}
      />

      {/* Navigation Sheet */}
      <NavigationSheet
        isOpen={showNavigationSheet}
        onClose={() => setShowNavigationSheet(false)}
        emergencyAddress={emergencyAddress}
      />
    </main>
  );
};

export default Index;
