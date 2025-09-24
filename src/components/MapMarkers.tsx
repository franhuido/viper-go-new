import React from 'react';

interface MarkerPosition {
  id: string;
  type: 'vehicle' | 'hydrant' | 'emergency';
  left: number;
  top: number;
  label?: string;
}

// Map each type to its SVG file in /public/markers
const svgByType: Record<MarkerPosition['type'], { src: string; w: number; h: number }> = {
  vehicle:   { src: '/markers/bombero.svg',   w: 44, h: 50 },
  hydrant:   { src: '/markers/hydrant.svg',   w: 44, h: 44 },
  emergency: { src: '/markers/emergency.svg', w: 44, h: 50 },
};

const MapMarkers: React.FC = () => {
  const markers: MarkerPosition[] = [
    // Vehicle markers
    { id: 'v1', type: 'vehicle', left: 302, top: 332, label: 'Vehicle 1' },
    { id: 'v2', type: 'vehicle', left: 413, top: 280, label: 'Vehicle 2' },
    { id: 'v3', type: 'vehicle', left: 391, top: 497, label: 'Vehicle 3' },

    // Hydrant markers
    { id: 'h1', type: 'hydrant', left: 525, top: 382, label: 'Hydrant 1' },
    { id: 'h2', type: 'hydrant', left: 618, top: 399, label: 'Hydrant 2' },
    { id: 'h3', type: 'hydrant', left: 631, top: 306, label: 'Hydrant 3' },
    { id: 'h4', type: 'hydrant', left: 648, top: 281, label: 'Hydrant 4' },
    { id: 'h5', type: 'hydrant', left: 518, top: 269, label: 'Hydrant 5' },
    { id: 'h6', type: 'hydrant', left: 528, top: 197, label: 'Hydrant 6' },
    { id: 'h7', type: 'hydrant', left: 538, top: 220, label: 'Hydrant 7' },
    { id: 'h8', type: 'hydrant', left: 647, top: 198, label: 'Hydrant 8' },
    { id: 'h9', type: 'hydrant', left: 569, top: 278, label: 'Hydrant 9' },

    // Emergency marker
    { id: 'e1', type: 'emergency', left: 574, top: 242, label: 'Emergency Location' },
  ];

  const handleMarkerClick = (marker: MarkerPosition) => {
    console.log(`Clicked ${marker.type} marker:`, marker.label);
    // Marker-specific functionality goes here
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {markers.map((marker) => {
        const meta = svgByType[marker.type];
        if (!meta) return null;

        return (
          <button
            key={marker.id}
            type="button"
            onClick={() => handleMarkerClick(marker)}
            className="absolute pointer-events-auto transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-full"
            style={{ left: `${marker.left}px`, top: `${marker.top}px` }}
            aria-label={marker.label}
          >
            <img
              src={meta.src}
              width={meta.w}
              height={meta.h}
              alt=""
              draggable={false}
              loading="lazy"
              decoding="async"
              style={{ display: 'block' }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default MapMarkers;
