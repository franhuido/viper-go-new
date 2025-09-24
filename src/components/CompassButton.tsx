import React, { useState } from 'react';

const CompassButton: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  const handleCompassClick = () => {
    // Simulate compass rotation
    setRotation(prev => prev + 45);
    console.log('Compass clicked - rotating map');
  };

  return (
    <button
      onClick={handleCompassClick}
      className="absolute left-[69px] top-[128px] transition-transform hover:scale-105"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-label="Rotate compass and map orientation"
    >
      <div
        dangerouslySetInnerHTML={{
          __html:
            "<svg width=\"58\" height=\"58\" viewBox=\"0 0 58 58\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"compass-button\" style=\"width: 44px; height: 44px\"> <g filter=\"url(#filter0_d_262_3529)\"> <circle cx=\"29\" cy=\"25\" r=\"23.2941\" fill=\"white\" stroke=\"#D9D9D9\" stroke-width=\"2.58824\"></circle> <path d=\"M41.6697 11.7766L33.1534 29.0668L24.9735 21.4056L41.6697 11.7766Z\" fill=\"#F41D00\"></path> <path d=\"M16.8994 38.2233L32.9321 29.3028L24.7522 21.6415L16.8994 38.2233Z\" fill=\"#404040\"></path> <circle cx=\"2.58824\" cy=\"2.58824\" r=\"2.58824\" transform=\"matrix(-0.729864 -0.683592 -0.683592 0.729864 32.9434 24.8802)\" fill=\"white\"></circle> </g> <defs> <filter id=\"filter0_d_262_3529\" x=\"0.411865\" y=\"0.411766\" width=\"57.1763\" height=\"57.1765\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"> <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood> <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix> <feOffset dy=\"4\"></feOffset> <feGaussianBlur stdDeviation=\"2\"></feGaussianBlur> <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite> <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix> <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_262_3529\"></feBlend> <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_262_3529\" result=\"shape\"></feBlend> </filter> </defs> </svg>",
        }}
      />
    </button>
  );
};

export default CompassButton;
