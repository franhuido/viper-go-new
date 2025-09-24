import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './MapStyles.css';

interface MapProps {
  onMapReady?: (map: mapboxgl.Map) => void;
  showTraffic?: boolean;
  mapStyle?: 'normal' | 'satellite';
  showHydrants?: boolean;
  showHospitals?: boolean;
  showPolice?: boolean;
  showFireStations?: boolean;
  showSIC?: boolean;
  showMonuments?: boolean;
  centerOnEmergency?: () => void;
  centerOnUser?: () => void;
  vehicles?: Array<{ id: string; name: string; coordinates: [number, number] }>;
  emergencyLocation?: [number, number];
}

const Map: React.FC<MapProps> = ({
  onMapReady,
  showTraffic = false,
  mapStyle = 'normal',
  showHydrants = false,
  showHospitals = false,
  showPolice = false,
  showFireStations = false,
  showSIC = false,
  showMonuments = false,
  vehicles = [],
  emergencyLocation
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapRotated, setIsMapRotated] = useState(false);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // === Icon config for custom markers ===
  const iconByType: Record<'vehicle' | 'hydrant' | 'emergency', { src: string; w: number; h: number }> = {
    vehicle:   { src: '/markers/bombero.svg',   w: 44, h: 50 },
    hydrant:   { src: '/markers/hydrant.svg',   w: 44, h: 44 },
    emergency: { src: '/markers/emergency.svg', w: 44, h: 50 },
  };

  const makeImgEl = (src: string, w: number, h: number, alt = ''): HTMLImageElement => {
    const el = document.createElement('img');
    el.src = src;
    el.width = w;
    el.height = h;
    el.alt = alt;
    el.draggable = false;
    el.loading = 'lazy';
    (el as any).decoding = 'async';
    el.style.display = 'block';
    // Optional CSS shadow instead of SVG filters for perf
    el.style.filter = 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))';
    return el;
  };


  // Santiago, Chile coordinates
  const defaultCenter: [number, number] = [-70.6506, -33.4372];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // For demo purposes, we'll use a placeholder token
    // In production, you would need a real Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle === 'satellite' ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/streets-v12',
      center: defaultCenter,
      zoom: 12,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls (zoom buttons)
    const nav = new mapboxgl.NavigationControl({
      showCompass: false, // We'll handle compass separately
      showZoom: true,
      visualizePitch: false
    });
    map.current.addControl(nav, 'top-left');

    // Listen for rotation changes
    map.current.on('rotate', () => {
      const bearing = map.current?.getBearing() || 0;
      setIsMapRotated(Math.abs(bearing) > 1);
    });

    // Initialize markers via unified updater
    updateMarkers();

    if (onMapReady) {
      onMapReady(map.current);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update map style
  useEffect(() => {
    if (map.current) {
      const style = mapStyle === 'satellite' ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/streets-v12';
      map.current.setStyle(style);
    }
  }, [mapStyle]);

  // Toggle traffic layer
  useEffect(() => {
    if (map.current) {
      if (showTraffic) {
        // Add traffic layer (simplified for demo)
        map.current.on('style.load', () => {
          if (map.current?.getSource('traffic')) return;
          
          map.current?.addSource('traffic', {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-traffic-v1'
          });

          map.current?.addLayer({
            id: 'traffic',
            type: 'line',
            source: 'traffic',
            'source-layer': 'traffic',
            paint: {
              'line-width': 2,
              'line-color': '#ff0000'
            }
          });
        });
      } else {
        if (map.current.getLayer('traffic')) {
          map.current.removeLayer('traffic');
          map.current.removeSource('traffic');
        }
      }
    }
  }, [showTraffic]);

  const resetNorth = () => {
    if (map.current) {
      map.current.easeTo({
        bearing: 0,
        duration: 500
      });
    }
  };

  const centerOnEmergency = () => {
    if (map.current && emergencyLocation) {
      map.current.flyTo({
        center: emergencyLocation,
        zoom: 16,
        duration: 1000
      });
    }
  };

  const centerOnUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        map.current?.flyTo({
          center: [longitude, latitude],
          zoom: 16,
          duration: 1000
        });
      });
    }
  };

  // Expose methods to parent
  useEffect(() => {
    if (map.current) {
      (map.current as any).centerOnEmergency = centerOnEmergency;
      (map.current as any).centerOnUserLocation = centerOnUserLocation;
    }
  }, [emergencyLocation]);

  // Update markers based on filter states
  const updateMarkers = () => {
    if (!map.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Sample marker data for Santiago
    const markerData = {
      hydrants: [
        [-70.6490, -33.4360],
        [-70.6520, -33.4380],
        [-70.6480, -33.4390],
        [-70.6510, -33.4350],
      ],
      hospitals: [
        [-70.6450, -33.4320],
        [-70.6550, -33.4420],
      ],
      police: [
        [-70.6470, -33.4340],
        [-70.6530, -33.4400],
      ],
      fireStations: [
        [-70.6500, -33.4370],
      ],
      sic: [
        [-70.6460, -33.4330],
      ],
      monuments: [
        [-70.6440, -33.4310],
        [-70.6560, -33.4430],
      ]
    };

    // Add hydrant markers
    if (showHydrants) {
      markerData.hydrants.forEach(coords => {
        const marker = new mapboxgl.Marker({ color: '#00AFEC' })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add hospital markers
    if (showHospitals) {
      markerData.hospitals.forEach(coords => {
        const marker = new mapboxgl.Marker({ color: '#FF4444' })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add police markers
    if (showPolice) {
      markerData.police.forEach(coords => {
        const marker = new mapboxgl.Marker({ color: '#4CAF50' })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add fire station markers
    if (showFireStations) {
      markerData.fireStations.forEach(coords => {
        const marker = new mapboxgl.Marker({ color: '#F17431' })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add SIC markers
    if (showSIC) {
      markerData.sic.forEach(coords => {
        const marker = new mapboxgl.Marker({ color: '#9C27B0' })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add monument markers
    if (showMonuments) {
      markerData.monuments.forEach(coords => {
        const marker = new mapboxgl.Marker({ color: '#795548' })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Always add emergency marker if provided
    if (emergencyLocation) {
      const emergencyMarker = new mapboxgl.Marker({ color: '#F41D00' })
        .setLngLat(emergencyLocation)
        .addTo(map.current);
      markersRef.current.push(emergencyMarker);
    }

    // Always add vehicle markers (image-based)
    vehicles.forEach((vehicle) => {
      const icon = iconByType.vehicle;
      const el = makeImgEl(icon.src, icon.w, icon.h, vehicle.name || 'Vehicle');
      const vehicleMarker = new mapboxgl.Marker({ element: el as any })
        .setLngLat(vehicle.coordinates)
        .addTo(map.current!);
      markersRef.current.push(vehicleMarker);
    });
  };

  // Update markers when filter states change
  useEffect(() => {
    updateMarkers();
  }, [showHydrants, showHospitals, showPolice, showFireStations, showSIC, showMonuments, vehicles, emergencyLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Compass button - only show when map is rotated */}
      {isMapRotated && (
        <button
          onClick={resetNorth}
          className="absolute left-4 top-[120px] z-10 transition-transform hover:scale-105"
          aria-label="Reset map orientation to north"
        >
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"58\" height=\"58\" viewBox=\"0 0 58 58\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"compass-button\" style=\"width: 44px; height: 44px\"> <g filter=\"url(#filter0_d_262_3529)\"> <circle cx=\"29\" cy=\"25\" r=\"23.2941\" fill=\"white\" stroke=\"#D9D9D9\" stroke-width=\"2.58824\"></circle> <path d=\"M41.6697 11.7766L33.1534 29.0668L24.9735 21.4056L41.6697 11.7766Z\" fill=\"#F41D00\"></path> <path d=\"M16.8994 38.2233L32.9321 29.3028L24.7522 21.6415L16.8994 38.2233Z\" fill=\"#404040\"></path> <circle cx=\"2.58824\" cy=\"2.58824\" r=\"2.58824\" transform=\"matrix(-0.729864 -0.683592 -0.683592 0.729864 32.9434 24.8802)\" fill=\"white\"></circle> </g> <defs> <filter id=\"filter0_d_262_3529\" x=\"0.411865\" y=\"0.411766\" width=\"57.1763\" height=\"57.1765\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"> <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood> <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix> <feOffset dy=\"4\"></feOffset> <feGaussianBlur stdDeviation=\"2\"></feGaussianBlur> <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite> <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix> <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_262_3529\"></feBlend> <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_262_3529\" result=\"shape\"></feBlend> </filter> </defs> </svg>",
            }}
          />
        </button>
      )}
    </div>
  );
};

export default Map;