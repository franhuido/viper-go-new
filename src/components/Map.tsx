// src/components/Map.tsx
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
  vehicles?: Array<{ id: string; name?: string; coordinates: [number, number] }>;
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

  // -------------------------
  // SVGs embebidos (tal como me los pasaste)
  // -------------------------
  const svgIcons: Record<string, string> = {
    bomberos: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23 45C35.1503 45 45 35.1503 45 23C45 10.8497 35.1503 1 23 1C10.8497 1 1 10.8497 1 23C1 35.1503 10.8497 45 23 45Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/> <path d="M23 40C32.3888 40 40 32.3888 40 23C40 13.6112 32.3888 6 23 6C13.6112 6 6 13.6112 6 23C6 32.3888 13.6112 40 23 40Z" fill="#F41D00"/> <path d="M23 26C24.6569 26 26 24.6569 26 23C26 21.3431 24.6569 20 23 20C21.3431 20 20 21.3431 20 23C20 24.6569 21.3431 26 23 26Z" fill="white"/> <path d="M20.5999 19C22.0599 17.96 23.9499 17.96 25.4099 19L27.7699 16.47C28.1499 16.06 28.0999 15.27 27.5699 15.11C23.9999 14 25.0199 13 22.9999 13C20.9799 13 21.9999 14 18.4299 15.11C17.9099 15.27 17.8499 16.07 18.2299 16.47L20.5899 19H20.5999Z" fill="white"/> <path d="M25.4001 27C23.9401 28.04 22.0501 28.04 20.5901 27L18.2301 29.53C17.8501 29.94 17.9001 30.73 18.4301 30.89C22.0001 32 20.9801 33 23.0001 33C25.0201 33 24.0001 32 27.5701 30.89C28.0901 30.73 28.1501 29.93 27.7701 29.53L25.4101 27H25.4001Z" fill="white"/> <path d="M30.8998 18.43C30.7398 17.91 29.9398 17.85 29.5398 18.23L27.0098 20.59C28.0498 22.05 28.0498 23.94 27.0098 25.4L29.5398 27.76C29.9498 28.14 30.7398 28.09 30.8998 27.56C32.0098 23.99 33.0098 25.01 33.0098 22.99C33.0098 20.97 32.0098 21.99 30.8998 18.42V18.43Z" fill="white"/> <path d="M19 20.59L16.47 18.23C16.06 17.85 15.27 17.9 15.11 18.43C14 22 13 20.98 13 23C13 25.02 14 24 15.11 27.57C15.27 28.09 16.07 28.15 16.47 27.77L19 25.41C17.96 23.96 17.96 22.06 19 20.6V20.59Z" fill="white"/> </svg>`,
    briefings: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23 45C35.1503 45 45 35.1503 45 23C45 10.8497 35.1503 1 23 1C10.8497 1 1 10.8497 1 23C1 35.1503 10.8497 45 23 45Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/> <path d="M23 40C32.3888 40 40 32.3888 40 23C40 13.6112 32.3888 6 23 6C13.6112 6 6 13.6112 6 23C6 32.3888 13.6112 40 23 40Z" fill="#00C17D"/> <path d="M19 28C19.3 28 19.5 28 19.7 27.7C19.9 27.4 20 27.3 20 27C20 26.7 20 26.5 19.7 26.3C19.4 26.1 19.3 26 19 26C18.7 26 18.5 26 18.3 26.3C18.1 26.6 18 26.7 18 27C18 27.3 18 27.5 18.3 27.7C18.6 27.9 18.7 28 19 28ZM19 24C19.3 24 19.5 24 19.7 23.7C19.9 23.4 20 23.3 20 23C20 22.7 20 22.5 19.7 22.3C19.5 22.1 19.3 22 19 22C18.7 22 18.5 22 18.3 22.3C18.1 22.5 18 22.7 18 23C18 23.3 18 23.5 18.3 23.7C18.6 23.9 18.7 24 19 24ZM19 20C19.3 20 19.5 20 19.7 19.7C19.9 19.4 20 19.3 20 19C20 18.7 20 18.5 19.7 18.3C19.4 18.1 19.3 18 19 18C18.7 18 18.5 18 18.3 18.3C18.1 18.6 18 18.7 18 19C18 19.3 18 19.5 18.3 19.7C18.6 19.9 18.7 20 19 20ZM22 28H28V26H22V28ZM22 24H28V22H22V24ZM22 20H28V18H22V20ZM16 32C15.4 32 15 31.8 14.6 31.4C14.2 31 14 30.5 14 30V16C14 15.4 14.2 15 14.6 14.6C15 14.2 15.5 14 16 14H30C30.6 14 31 14.2 31.4 14.6C31.8 15 32 15.5 32 16V30C32 30.6 31.8 31 31.4 31.4C31 31.8 30.5 32 30 32H16ZM16 30H30V16H16V30Z" fill="white"/> </svg>`,
    carabineros: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23 45C35.1503 45 45 35.1503 45 23C45 10.8497 35.1503 1 23 1C10.8497 1 1 10.8497 1 23C1 35.1503 10.8497 45 23 45Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/> <path d="M23 40C32.3888 40 40 32.3888 40 23C40 13.6112 32.3888 6 23 6C13.6112 6 6 13.6112 6 23C6 32.3888 13.6112 40 23 40Z" fill="#00C17D"/> <path d="M32.4688 26.5L30.4688 25.2C30.2687 25.1 30.0687 25 29.8687 25H28.7687C28.3687 25 28.0687 24.8 27.8687 24.5C28.0687 24 28.1688 23.5 28.1688 23C28.1688 22.2 27.9688 21.4 27.5688 20.8L31.2687 19V18L22.9688 21.3L14.6688 18.1V19.1L18.3688 20.9C17.9688 21.6 17.7688 22.3 17.7688 23.1C17.7688 23.9 17.8687 24.1 18.0687 24.6C17.8687 24.9 17.5687 25.1 17.1687 25.1H16.0687C15.8687 25.1 15.6688 25.1 15.4688 25.3L13.4687 26.6C12.9687 26.9 12.8688 27.5 13.1688 28L13.9688 29.2C14.3688 29.7 15.0687 29.8 15.5687 29.4L17.7688 27.3H18.7688V26.3C19.6688 27.5 21.1687 28.3 22.8687 28.3C24.5687 28.3 26.0688 27.5 26.9688 26.3V27.3H27.9688L30.1688 29.4C30.6688 29.8 31.3687 29.8 31.7687 29.2L32.5688 28C32.8688 27.5 32.7687 26.9 32.2687 26.6L32.4688 26.5ZM26.3687 21.5C26.5687 21.9 26.7688 22.4 26.7688 23L24.8687 22.3L26.3687 21.6V21.5ZM21.0688 22.2L19.1687 22.9C19.1687 22.4 19.3688 21.9 19.5688 21.4L21.0688 22.1V22.2ZM22.9688 26.7C21.7687 26.7 20.6687 26.1 19.9688 25.2L22.8687 23.1L25.7688 25.2C25.0688 26.1 23.9688 26.7 22.7688 26.7H22.9688Z" fill="white"/> </svg>`,
    emergency: `<svg width="46" height="52" viewBox="0 0 46 52" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 23C1 10.85 10.85 1 23 1C35.15 1 45 10.85 45 23C45 35.15 35.15 51 23 51C10.85 51 1 35.15 1 23Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/> <path d="M23 39C32.3888 39 40 31.3888 40 22C40 12.6112 32.3888 5 23 5C13.6112 5 6 12.6112 6 22C6 31.3888 13.6112 39 23 39Z" fill="#F41D00"/> <path d="M31.3 17.2C30.8 16.4 30.2 15.9 29.5 15.4L29.2 15.7C29.1 15.9 28.9 16 28.8 16.1C28.6 16.1 28.5 16.2 28.3 16.2C28 16.2 27.7 16.1 27.4 15.9C27.1 15.7 27 15.4 27 15V13L26.2 13.4C25.7 13.7 25.1 14.1 24.5 14.7C23.9 15.3 23.3 16 22.8 16.8C22.3 17.6 22 18.6 22 19.7C22 20.8 22.2 21.4 22.7 22.1C23.1 22.8 23.7 23.4 24.5 23.8C24.3 23.6 24.2 23.3 24.1 23C24.1 22.7 24 22.4 24 22.1C24 21.8 24 21.3 24.2 21C24.4 20.6 24.6 20.3 24.9 20L27.1 17.9L29.3 20C29.6 20.3 29.8 20.6 30 21C30.2 21.4 30.2 21.7 30.2 22.2C30.2 22.7 30.2 22.8 30.1 23.1C30.1 23.4 29.9 23.7 29.7 23.9C30.4 23.5 31 22.9 31.5 22.2C32 21.5 32.2 20.6 32.2 19.8C32.2 19 32 18.1 31.5 17.3L31.3 17.2Z" fill="white"/> <path d="M29 26C28.4 26 28 26.4 28 27V30H25V25H19V30H16V21L20.7 17C21.3 16.6 21.2 15.6 20.5 15.3C20.2 15.1 19.8 15.2 19.5 15.3L14.4 19.6C14.1 19.8 14 20.1 14 20.4V30.9C14 31.5 14.4 31.9 15 31.9H20C20.6 31.9 21 31.5 21 30.9V26.9H23V30.9C23 31.5 23.4 31.9 24 31.9H29C29.6 31.9 30 31.5 30 30.9V26.9C30 26.3 29.6 25.9 29 25.9V26Z" fill="white"/> <path d="M28.1 22.6C28.4 22.4 28.5 22.1 28.5 21.7C28.5 21.3 28.5 21.4 28.4 21.2C28.3 21 28.2 20.9 28.1 20.8L27 19.9L25.9 20.8C25.8 20.9 25.7 21.1 25.6 21.2C25.6 21.4 25.5 21.5 25.5 21.7C25.5 22 25.6 22.3 25.9 22.6C26.2 22.8 26.5 23 27 23C27.5 23 27.8 22.9 28.1 22.6Z" fill="white"/> </svg>`,
    hospital: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23 45C35.1503 45 45 35.1503 45 23C45 10.8497 35.1503 1 23 1C10.8497 1 1 10.8497 1 23C1 35.1503 10.8497 45 23 45Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/> <path d="M23 40C32.3888 40 40 32.3888 40 23C40 13.6112 32.3888 6 23 6C13.6112 6 6 13.6112 6 23C6 32.3888 13.6112 40 23 40Z" fill="#F41D00"/> <path d="M21.5 28H24.5V24.5H28V21.5H24.5V18H21.5V21.5H18V24.5H21.5V28ZM16 32C15.4 32 15 31.8 14.6 31.4C14.2 31 14 30.5 14 30V16C14 15.4 14.2 15 14.6 14.6C15 14.2 15.5 14 16 14H30C30.6 14 31 14.2 31.4 14.6C31.8 15 32 15.5 32 16V30C32 30.6 31.8 31 31.4 31.4C31 31.8 30.5 32 30 32H16ZM16 30H30V16H16V30Z" fill="white"/> </svg>`,
    hydrant: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23 45C35.1503 45 45 35.1503 45 23C45 10.8497 35.1503 1 23 1C10.8497 1 1 10.8497 1 23C1 35.1503 10.8497 45 23 45Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/> <path d="M23 40C32.3888 40 40 32.3888 40 23C40 13.6112 32.3888 6 23 6C13.6112 6 6 13.6112 6 23C6 32.3888 13.6112 40 23 40Z" fill="#00AFEC"/> <path d="M28.9 31.9L27.9 24.9H28.9V22.9H27.9V16.9H28.9V14.9C28.2 14.2 27.1 13.7 25.9 13.4V12.8C25.9 12.3 25.5 12 25.1 12H20.8C20.3 12 20 12.4 20 12.8V13.4C18.8 13.7 17.7 14.3 17 14.9V16.9H18V22.9H17V24.9H18L16.9 31.9H16V33.9H30V31.9H29H28.9ZM19.9 16.9H25.9V22.9H19.9V16.9ZM18.9 31.9L19.9 24.9H25.9L26.9 31.9H18.9Z" fill="white"/> <path d="M22.9004 21.9C24.005 21.9 24.9004 21.0046 24.9004 19.9C24.9004 18.7955 24.005 17.9 22.9004 17.9C21.7958 17.9 20.9004 18.7955 20.9004 19.9C20.9004 21.0046 21.7958 21.9 22.9004 21.9Z" fill="white"/> </svg>`,
    monumento: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23 45C35.1503 45 45 35.1503 45 23C45 10.8497 35.1503 1 23 1C10.8497 1 1 10.8497 1 23C1 35.1503 10.8497 45 23 45Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/> <path d="M23 40C32.3888 40 40 32.3888 40 23C40 13.6112 32.3888 6 23 6C13.6112 6 6 13.6112 6 23C6 32.3888 13.6112 40 23 40Z" fill="#F17431"/> <path d="M31.3 24.9H14.7C14.3 24.9 14 25.2 14 25.6V30.2C14 30.6 14.3 30.9 14.7 30.9H17V27.9C17 27.3 17.4 26.9 18 26.9C18.6 26.9 19 27.3 19 27.9V30.9H22V27.9C22 27.3 22.4 26.9 23 26.9C23.6 26.9 24 27.3 24 27.9V30.9H27V27.9C27 27.3 27.4 26.9 28 26.9C28.6 26.9 29 27.3 29 27.9V30.9H31.3C31.7 30.9 32 30.6 32 30.2V25.6C32 25.2 31.7 24.9 31.3 24.9Z" fill="white"/> <path d="M31.3 17.9H14.7C14.3 17.9 14 18.2 14 18.6V23.2C14 23.6 14.3 23.9 14.7 23.9H17V20.9C17 20.3 17.4 19.9 18 19.9C18.6 19.9 19 20.3 19 20.9V23.9H22V20.9C22 20.3 22.4 19.9 23 19.9C23.6 19.9 24 20.3 24 20.9V23.9H27V20.9C27 20.3 27.4 19.9 28 19.9C28.6 19.9 29 20.3 29 20.9V23.9H31.3C31.7 23.9 32 23.6 32 23.2V18.6C32 18.2 31.7 17.9 31.3 17.9Z" fill="white"/> <path d="M31.2 14L14 15.9V16.9H31.3C31.7 16.9 32 16.6 32 16.2V14.7C32 14.3 31.6 14 31.2 14Z" fill="white"/> </svg>`,
    sic: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M23 45C35.1503 45 45 35.1503 45 23C45 10.8497 35.1503 1 23 1C10.8497 1 1 10.8497 1 23C1 35.1503 10.8497 45 23 45Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/> <path d="M23 40C32.3888 40 40 32.3888 40 23C40 13.6112 32.3888 6 23 6C13.6112 6 6 13.6112 6 23C6 32.3888 13.6112 40 23 40Z" fill="#00AFEC"/> <path d="M22.9 29C23.3 29 23.5 28.9 23.8 28.6C24 28.4 24.2 28.1 24.2 27.7C24.2 27.3 24.1 27.1 23.8 26.8C23.6 26.6 23.3 26.4 22.9 26.4C22.5 26.4 22.3 26.5 22 26.8C21.7 27.1 21.6 27.3 21.6 27.7C21.6 28.1 21.7 28.3 22 28.6C22.2 28.8 22.5 29 22.9 29ZM23 33C21.6 33 20.3 32.7 19.1 32.2C17.9 31.7 16.8 31 15.9 30.1C15 29.2 14.3 28.1 13.8 26.9C13.3 25.7 13 24.4 13 23C13 21.6 13.3 20.3 13.8 19.1C14.3 17.9 15 16.8 15.9 15.9C16.8 15 17.9 14.3 19.1 13.8C20.3 13.3 21.6 13 23 13C24.4 13 25.7 13.3 26.9 13.8C28.1 14.3 29.2 15 30.1 15.9C31 16.8 31.7 17.9 32.2 19.1C32.7 20.3 33 21.6 33 23C33 24.4 32.7 25.7 32.2 26.9C31.7 28.1 31 29.2 30.1 30.1C29.2 31 28.1 31.7 26.9 32.2C25.7 32.7 24.4 33 23 33ZM23 31C25.2 31 27.1 30.2 28.7 28.7C30.3 27.2 31 25.3 31 23C31 20.7 30.2 18.9 28.7 17.3C27.2 15.7 25.3 15 23 15C20.7 15 18.9 15.8 17.3 17.3C15.7 18.8 15 20.7 15 23C15 25.3 15.8 27.1 17.3 28.7C18.8 30.3 20.7 31 23 31ZM23.1 18.7C23.5 18.7 23.9 18.8 24.2 19.1C24.5 19.4 24.7 19.7 24.7 20.1C24.7 20.5 24.6 20.8 24.4 21.1C24.2 21.4 23.9 21.7 23.6 21.9C23.2 22.2 22.9 22.6 22.6 23C22.3 23.4 22.2 23.9 22.2 24.4C22.2 24.9 22.2 24.8 22.5 25C22.8 25.2 22.9 25.2 23.1 25.2C23.3 25.2 23.6 25.2 23.7 24.9C23.8 24.6 24 24.5 24 24.3C24 23.9 24.2 23.6 24.5 23.4C24.8 23.2 25 22.9 25.3 22.6C25.7 22.2 26 21.8 26.3 21.4C26.6 21 26.7 20.5 26.7 19.9C26.7 19 26.4 18.4 25.7 17.8C25 17.2 24.2 17 23.3 17C22.4 17 22.1 17.1 21.5 17.4C20.9 17.7 20.5 18.1 20.2 18.6C20.1 18.8 20 19 20.1 19.2C20.2 19.4 20.3 19.6 20.4 19.7C20.6 19.8 20.9 19.9 21.1 19.8C21.3 19.7 21.6 19.6 21.7 19.4C21.9 19.1 22.1 19 22.4 18.8C22.7 18.6 23 18.6 23.3 18.6L23.1 18.7Z" fill="white"/> </svg>`,
    // SVG de vehiculo que me pasaste
    vehiculo: `<svg width="46" height="52" viewBox="0 0 46 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 23C1 10.85 10.85 1 23 1C35.15 1 45 10.85 45 23C45 35.15 35.15 51 23 51C10.85 51 1 35.15 1 23Z" fill="white" stroke="#D9D9D9" stroke-width="2" stroke-miterlimit="10"/>
<path d="M23 39C32.3888 39 40 31.3888 40 22C40 12.6112 32.3888 5 23 5C13.6112 5 6 12.6112 6 22C6 31.3888 13.6112 39 23 39Z" fill="#F17431"/>
<mask id="mask0_396_2638" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="11" y="10" width="24" height="24">
<rect x="11" y="10" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_396_2638)">
<path d="M18 31C17.1667 31 16.4583 30.7083 15.875 30.125C15.2917 29.5417 15 28.8333 15 28H14C13.45 28 12.9792 27.8042 12.5875 27.4125C12.1958 27.0208 12 26.55 12 26V23C12 22.45 12.1958 21.9792 12.5875 21.5875C12.9792 21.1958 13.45 21 14 21H23V17C23 16.45 23.1958 15.9792 23.5875 15.5875C23.9792 15.1958 24.45 15 25 15H27V14C27 13.7167 27.0958 13.4792 27.2875 13.2875C27.4792 13.0958 27.7167 13 28 13H29C29.2833 13 29.5208 13.0958 29.7125 13.2875C29.9042 13.4792 30 13.7167 30 14V15H30.55C30.9833 15 31.375 15.125 31.725 15.375C32.075 15.625 32.3167 15.9583 32.45 16.375L33.9 20.675C33.9333 20.775 33.9583 20.8792 33.975 20.9875C33.9917 21.0958 34 21.2083 34 21.325V26C34 26.55 33.8042 27.0208 33.4125 27.4125C33.0208 27.8042 32.55 28 32 28H31C31 28.8333 30.7083 29.5417 30.125 30.125C29.5417 30.7083 28.8333 31 28 31C27.1667 31 26.4583 30.7083 25.875 30.125C25.2917 29.5417 25 28.8333 25 28H21C21 28.8333 20.7083 29.5417 20.125 30.125C19.5417 30.7083 18.8333 31 18 31ZM18 29C18.2833 29 18.5208 28.9042 18.7125 28.7125C18.9042 28.5208 19 28.2833 19 28C19 27.7167 18.9042 27.4792 18.7125 27.2875C18.5208 27.0958 18.2833 27 18 27C17.7167 27 17.4792 27.0958 17.2875 27.2875C17.0958 27.4792 17 27.7167 17 28C17 28.2833 17.0958 28.5208 17.2875 28.7125C17.4792 28.9042 17.7167 29 18 29ZM28 29C28.2833 29 28.5208 28.9042 28.7125 28.7125C28.9042 28.5208 29 28.2833 29 28C29 27.7167 28.9042 27.4792 28.7125 27.2875C28.5208 27.0958 28.2833 27 28 27C27.7167 27 27.4792 27.0958 27.2875 27.2875C27.0958 27.4792 27 27.7167 27 28C27 28.2833 27.0958 28.5208 27.2875 28.7125C27.4792 28.9042 27.7167 29 28 29ZM14 23V26H15.775C16.0583 25.6833 16.3917 25.4375 16.775 25.2625C17.1583 25.0875 17.5667 25 18 25C18.4333 25 18.8417 25.0875 19.225 25.2625C19.6083 25.4375 19.9417 25.6833 20.225 26H23V23H14ZM25 26H25.775C26.0583 25.6833 26.3917 25.4375 26.775 25.2625C27.1583 25.0875 27.5667 25 28 25C28.4333 25 28.8417 25.0875 29.225 25.2625C29.6083 25.4375 29.9417 25.6833 30.225 26H32V23H25V26ZM25 21H31.9L30.55 17H25V21ZM13 18.5V16.5H12.75C12.5333 16.5 12.3542 16.4292 12.2125 16.2875C12.0708 16.1458 12 15.9667 12 15.75C12 15.5333 12.0708 15.3542 12.2125 15.2125C12.3542 15.0708 12.5333 15 12.75 15H21.25C21.4667 15 21.6458 15.0708 21.7875 15.2125C21.9292 15.3542 22 15.5333 22 15.75C22 15.9667 21.9292 16.1458 21.7875 16.2875C21.6458 16.4292 21.4667 16.5 21.25 16.5H21V18.5H21.25C21.4667 18.5 21.6458 18.5708 21.7875 18.7125C21.9292 18.8542 22 19.0333 22 19.25C22 19.4667 21.9292 19.6458 21.7875 19.7875C21.6458 19.9292 21.4667 20 21.25 20H12.75C12.5333 20 12.3542 19.9292 12.2125 19.7875C12.0708 19.6458 12 19.4667 12 19.25C12 19.0333 12.0708 18.8542 12.2125 18.7125C12.3542 18.5708 12.5333 18.5 12.75 18.5H13ZM14.5 18.5H16.25V16.5H14.5V18.5ZM17.75 18.5H19.5V16.5H17.75V18.5Z" fill="white"/>
</g>
</svg>
`
  };

  // -------------------------
  // Helper: crea el elemento marker (devuelve un HTMLElement)
  // Retornamos el contenedor <div> que envuelve el SVG (garantiza HTMLElement)
  // -------------------------
  function createSvgMarker(type: string) {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    wrapper.style.lineHeight = '0';
    wrapper.style.width = '46px';
    wrapper.style.height = '52px';
    // Sombra similar a la que usabas antes
    wrapper.style.filter = 'drop-shadow(0 4px 4px rgba(0,0,0,0.25))';
    wrapper.innerHTML = svgIcons[type] ?? svgIcons['bomberos'];
    return wrapper;
  }

  // Centro por defecto (Santiago)
  const defaultCenter: [number, number] = [-70.6506, -33.4372];

  // Inicialización del mapa
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Token de ejemplo (reemplazar por tu VITE_MAPBOX_TOKEN o setear mapboxgl.accessToken aquí)
    mapboxgl.accessToken = (import.meta && (import.meta as any).env && (import.meta as any).env.VITE_MAPBOX_TOKEN) || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle === 'satellite' ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/streets-v12',
      center: defaultCenter,
      zoom: 12,
      pitch: 0,
      bearing: 0
    });

    // Controles de navegación (zoom)
    const nav = new mapboxgl.NavigationControl({
      showCompass: false,
      showZoom: true,
      visualizePitch: false
    });
    map.current.addControl(nav, 'top-left');

    // Detectar rotación para mostrar botón de reset
    map.current.on('rotate', () => {
      const bearing = map.current?.getBearing() || 0;
      setIsMapRotated(Math.abs(bearing) > 1);
    });

    // Inicializar marcadores
    updateMarkers();

    // Notificar que el mapa está listo
    if (onMapReady) {
      onMapReady(map.current);
    }

    return () => {
      map.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // actualizar estilo cuando cambia prop mapStyle
  useEffect(() => {
    if (map.current) {
      const style = mapStyle === 'satellite' ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/streets-v12';
      map.current.setStyle(style);
    }
  }, [mapStyle]);

  // Trafico (simplificado, como en tu versión)
  useEffect(() => {
    if (map.current) {
      if (showTraffic) {
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
        if (map.current.getLayer && map.current.getLayer('traffic')) {
          try {
            map.current.removeLayer('traffic');
            map.current.removeSource('traffic');
          } catch (e) {
            // ignore
          }
        }
      }
    }
  }, [showTraffic]);

  const resetNorth = () => {
    if (map.current) {
      map.current.easeTo({ bearing: 0, duration: 500 });
    }
  };

  const centerOnEmergency = () => {
    if (map.current && emergencyLocation) {
      map.current.flyTo({ center: emergencyLocation, zoom: 16, duration: 1000 });
    }
  };

  const centerOnUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        map.current?.flyTo({ center: [longitude, latitude], zoom: 16, duration: 1000 });
      });
    }
  };

  // Exponer los métodos en la instancia (igual que tenías)
  useEffect(() => {
    if (map.current) {
      (map.current as any).centerOnEmergency = centerOnEmergency;
      (map.current as any).centerOnUserLocation = centerOnUserLocation;
    }
  }, [emergencyLocation]);

  // === actualización de marcadores ===
  const updateMarkers = () => {
    if (!map.current) return;

    // limpiar marcadores previos
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // datos de ejemplo (tus coordenadas reales vendrán de props o API)
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

    // Hidrantes
    if (showHydrants) {
      markerData.hydrants.forEach(coords => {
        const el = createSvgMarker('hydrant');
        const marker = new mapboxgl.Marker({ element: el as any })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Hospitales
    if (showHospitals) {
      markerData.hospitals.forEach(coords => {
        const el = createSvgMarker('hospital');
        const marker = new mapboxgl.Marker({ element: el as any })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Carabineros / police
    if (showPolice) {
      markerData.police.forEach(coords => {
        const el = createSvgMarker('carabineros');
        const marker = new mapboxgl.Marker({ element: el as any })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Fire stations
    if (showFireStations) {
      markerData.fireStations.forEach(coords => {
        const el = createSvgMarker('bomberos');
        const marker = new mapboxgl.Marker({ element: el as any })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // SIC
    if (showSIC) {
      markerData.sic.forEach(coords => {
        const el = createSvgMarker('sic');
        const marker = new mapboxgl.Marker({ element: el as any })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Monumentos
    if (showMonuments) {
      markerData.monuments.forEach(coords => {
        const el = createSvgMarker('monumento');
        const marker = new mapboxgl.Marker({ element: el as any })
          .setLngLat(coords as [number, number])
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Emergencia (si aplica)
    if (emergencyLocation) {
      const el = createSvgMarker('emergency');
      const emergencyMarker = new mapboxgl.Marker({ element: el as any })
        .setLngLat(emergencyLocation)
        .addTo(map.current);
      markersRef.current.push(emergencyMarker);
    }

    // Vehículos (ahora usan tu SVG 'vehiculo')
    vehicles.forEach((vehicle) => {
      const el = createSvgMarker('vehiculo');
      const vehicleMarker = new mapboxgl.Marker({ element: el as any })
        .setLngLat(vehicle.coordinates)
        .addTo(map.current!);
      markersRef.current.push(vehicleMarker);
    });
  };

  // re-ejecutar cuando cambian filtros/vehículos/ubicación emergencia
  useEffect(() => {
    updateMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHydrants, showHospitals, showPolice, showFireStations, showSIC, showMonuments, vehicles, emergencyLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      {isMapRotated && (
        <button
          onClick={resetNorth}
          className="absolute left-4 top-[120px] z-10 transition-transform hover:scale-105"
          aria-label="Reset map orientation to north"
        >
          {/* Puedes reemplazar por tu SVG de brújula si quieres */}
          <div style={{ width: 44, height: 44 }} dangerouslySetInnerHTML={{ __html:
            `<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d)">
                <circle cx="29" cy="25" r="23.2941" fill="white" stroke="#D9D9D9" stroke-width="2.58824"/>
                <path d="M41.6697 11.7766L33.1534 29.0668L24.9735 21.4056L41.6697 11.7766Z" fill="#F41D00"/>
                <path d="M16.8994 38.2233L32.9321 29.3028L24.7522 21.6415L16.8994 38.2233Z" fill="#404040"/>
              </g>
              <defs><filter id="filter0_d" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs>
            </svg>` }} />
        </button>
      )}
    </div>
  );
};

export default Map;
