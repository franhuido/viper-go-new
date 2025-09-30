// src/components/CustomPopup.tsx
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

type MainField = { label: string; value: string | number | undefined };
type MoreInfo = {
  empresa?: string;
  direccion?: string;
  comuna?: string;
  region?: string;
  año?: string | number;
  [k: string]: any;
};

interface CustomPopupProps {
  map: mapboxgl.Map | null;
  lngLat: [number, number];
  title?: string;
  subtitle?: string;
  mainFields?: MainField[];
  moreInfo?: MoreInfo;
  onClose?: () => void;
  // Optional: small width override
  width?: number;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
  map,
  lngLat,
  title,
  subtitle,
  mainFields = [],
  moreInfo,
  onClose,
  width = 320,
}) => {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (!map) return;
    const update = () => {
      try {
        const p = map.project(lngLat as any);
        setPos({ left: p.x, top: p.y });
      } catch (e) {
        // ignore if map not ready
      }
    };

    update();
    map.on('move', update);
    map.on('zoom', update);
    map.on('resize', update);

    return () => {
      map.off('move', update);
      map.off('zoom', update);
      map.off('resize', update);
    };
  }, [map, lngLat]);

  if (!pos) return null;

  // Positioning: translate(-50%, -100%) puts the popup centered horizontally and above the coordinate
  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    left: pos.left,
    top: pos.top,
    transform: `translate(-50%, calc(-100% - 12px))`,
    zIndex: 9999, // muy alto para sobreponer controles del mapa
    pointerEvents: 'auto',
    width: width,
  };

  const cardStyle: React.CSSProperties = {
    background: '#ffffff',
    borderRadius: 10,
    border: '2px solid #D9D9D9', // stroke 2px
    padding: '12px 14px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
    fontFamily: 'Inter, system-ui, -apple-system, "Helvetica Neue", Arial',
  };

  const titleStyle: React.CSSProperties = { fontWeight: 700, fontSize: 14, marginBottom: 6 };
  const subStyle: React.CSSProperties = { color: '#666', fontSize: 12, marginBottom: 8 };

  return (
    <div style={wrapperStyle} role="dialog" aria-modal="false">
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {title && <div style={titleStyle}>{title}</div>}
            {subtitle && <div style={subStyle}>{subtitle}</div>}
          </div>
          <button
            onClick={() => onClose && onClose()}
            aria-label="Cerrar popup"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginTop: 6 }}>
          {mainFields.map((f, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <div style={{ color: '#555', fontSize: 13 }}>{f.label}</div>
              <div style={{ color: '#222', fontWeight: 600 }}>{f.value ?? '-'}</div>
            </div>
          ))}
        </div>

        {moreInfo && (
          <div style={{ marginTop: 8 }}>
            <button
              onClick={() => setShowMore(s => !s)}
              style={{
                display: 'inline-block',
                padding: '6px 10px',
                borderRadius: 999,
                border: '1px solid #E5E7EB',
                background: '#fff',
                cursor: 'pointer',
                fontSize: 13
              }}
            >
              {showMore ? 'Ocultar información' : 'Más información'}
            </button>

            {showMore && (
              <div style={{ marginTop: 8, fontSize: 13, color: '#444' }}>
                {moreInfo.empresa && <div><strong>Empresa:</strong> {moreInfo.empresa}</div>}
                {moreInfo.direccion && <div><strong>Dirección:</strong> {moreInfo.direccion}</div>}
                {moreInfo.comuna && <div><strong>Comuna:</strong> {moreInfo.comuna}</div>}
                {moreInfo.region && <div><strong>Región:</strong> {moreInfo.region}</div>}
                {(moreInfo.año || moreInfo.year) && <div><strong>Año:</strong> {moreInfo.año ?? moreInfo.year}</div>}
              </div>
            )}
          </div>
        )}
      </div>
      {/* small pointer/triangle under the popup */}
      <div style={{ width: 0, height: 0, margin: '8px auto 0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '10px solid #fff', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' }} />
    </div>
  );
};

export default CustomPopup;
