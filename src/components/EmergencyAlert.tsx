import React, { useState } from 'react';

interface EmergencyData {
  timestamp: string;
  title: string;
  location: string;
}

const EmergencyAlert: React.FC = () => {
  const [emergencyData] = useState<EmergencyData>({
    timestamp: '18-02-2025 ~ 21:27:54',
    title: 'TERCERA ALARMA DE INCENDIO',
    location: 'AVENIDA PUNTA ARENAS / AVENIDA TRINIDAD'
  });

  const handleCenterClick = () => {
    console.log('Centering map on emergency location');
    // Here you would implement map centering functionality
  };

  return (
    <article className="flex w-[529px] max-lg:w-[450px] max-md:w-[90vw] items-center gap-5 max-lg:gap-3 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] absolute h-[78px] max-lg:h-[66px] bg-white px-[25px] max-lg:px-4 py-2.5 max-lg:py-2 rounded-[10px] border-2 border-solid border-[#D9D9D9] bottom-4 max-lg:bottom-3 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex justify-center items-center gap-2.5 flex-[1_0_0]">
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"44\" height=\"44\" viewBox=\"0 0 44 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"emergency-logo\" style=\"width: 44px; height: 44px\"> <rect width=\"44\" height=\"44\" rx=\"22\" fill=\"#F41D00\"></rect> <path d=\"M30.3285 16.73C29.8682 15.97 29.268 15.38 28.5276 14.95L28.2475 15.29C28.1174 15.45 27.9673 15.57 27.8072 15.64C27.6472 15.71 27.4771 15.75 27.307 15.75C26.9868 15.75 26.6967 15.64 26.4366 15.42C26.1765 15.2 26.0464 14.9 26.0464 14.53V12.52L25.266 12.97C24.7458 13.27 24.1755 13.7 23.5552 14.27C22.9349 14.84 22.3646 15.54 21.8443 16.37C21.3241 17.2 21.064 18.15 21.064 19.22C21.064 20.11 21.2841 20.93 21.7343 21.67C22.1745 22.41 22.7648 22.99 23.4851 23.42C23.3051 23.18 23.175 22.91 23.0749 22.62C22.9749 22.33 22.9249 22.02 22.9249 21.7C22.9249 21.29 23.0049 20.91 23.155 20.56C23.3151 20.2 23.5352 19.88 23.8353 19.58L26.0264 17.46L28.2274 19.58C28.5176 19.86 28.7377 20.19 28.8978 20.55C29.0579 20.91 29.1279 21.29 29.1279 21.7C29.1279 22.03 29.0779 22.33 28.9778 22.62C28.8778 22.91 28.7377 23.18 28.5676 23.42C29.288 22.99 29.8783 22.41 30.3185 21.67C30.7587 20.93 30.9888 20.12 30.9888 19.22C30.9888 18.32 30.7587 17.49 30.3085 16.73H30.3285Z\" fill=\"white\"></path> <path d=\"M28.0073 25.49C27.457 25.49 27.0068 25.94 27.0068 26.49V29.49H24.0054V24.49H18.0024V29.49H15.001V20.49L19.7133 16.46C20.3036 16.01 20.2235 15.1 19.5632 14.77C19.223 14.6 18.8228 14.64 18.5127 14.86L13.4202 19.19C13.1601 19.38 13 19.68 13 20V30.48C13 31.03 13.4502 31.48 14.0005 31.48H19.0029C19.5532 31.48 20.0034 31.03 20.0034 30.48V26.48H22.0044V30.48C22.0044 31.03 22.4546 31.48 23.0049 31.48H28.0073C28.5576 31.48 29.0078 31.03 29.0078 30.48V26.48C29.0078 25.93 28.5576 25.48 28.0073 25.48V25.49Z\" fill=\"white\"></path> <path d=\"M27.0673 22.12C27.3575 21.88 27.5076 21.58 27.5076 21.24C27.5076 21.07 27.4675 20.91 27.3975 20.76C27.3275 20.61 27.2174 20.48 27.0673 20.36L26.0068 19.48L24.9463 20.36C24.8063 20.48 24.6962 20.62 24.6162 20.77C24.5361 20.92 24.5061 21.08 24.5061 21.24C24.5061 21.59 24.6562 21.88 24.9463 22.12C25.2365 22.36 25.5966 22.48 26.0068 22.48C26.417 22.48 26.7772 22.36 27.0673 22.12Z\" fill=\"white\"></path> </svg>",
            }}
          />
        </div>
        <div className="flex flex-col items-start flex-[1_0_0]">
          <time className="text-[#8C8C8C] text-sm max-lg:text-xs font-normal">
            {emergencyData.timestamp}
          </time>
          <h2 className="text-neutral-700 text-xl max-lg:text-lg font-normal">
            {emergencyData.title}
          </h2>
          <address className="text-[#8C8C8C] text-base max-lg:text-sm font-normal not-italic">
            {emergencyData.location}
          </address>
        </div>
      </div>
      <button
        onClick={handleCenterClick}
        className="flex flex-col justify-center items-center transition-colors hover:bg-gray-50 p-2 rounded"
        aria-label="Center map on emergency location"
      >
        <div className="w-6 h-6 relative">
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"15\" height=\"20\" viewBox=\"0 0 15 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"distance-icon\" style=\"width: 14px; height: 20px; position: absolute; left: 5px; top: 2px\"> <path d=\"M7.5 20C5.73333 20 4.29167 19.7208 3.175 19.1625C2.05833 18.6042 1.5 17.8833 1.5 17C1.5 16.6 1.62083 16.2292 1.8625 15.8875C2.10417 15.5458 2.44167 15.25 2.875 15L4.45 16.475C4.3 16.5417 4.1375 16.6167 3.9625 16.7C3.7875 16.7833 3.65 16.8833 3.55 17C3.76667 17.2667 4.26667 17.5 5.05 17.7C5.83333 17.9 6.65 18 7.5 18C8.35 18 9.17083 17.9 9.9625 17.7C10.7542 17.5 11.2583 17.2667 11.475 17C11.3583 16.8667 11.2083 16.7583 11.025 16.675C10.8417 16.5917 10.6667 16.5167 10.5 16.45L12.05 14.95C12.5167 15.2167 12.875 15.5208 13.125 15.8625C13.375 16.2042 13.5 16.5833 13.5 17C13.5 17.8833 12.9417 18.6042 11.825 19.1625C10.7083 19.7208 9.26667 20 7.5 20ZM7.525 14.5C9.175 13.2833 10.4167 12.0625 11.25 10.8375C12.0833 9.6125 12.5 8.38333 12.5 7.15C12.5 5.45 11.9583 4.16667 10.875 3.3C9.79167 2.43333 8.66667 2 7.5 2C6.33333 2 5.20833 2.43333 4.125 3.3C3.04167 4.16667 2.5 5.45 2.5 7.15C2.5 8.26667 2.90833 9.42917 3.725 10.6375C4.54167 11.8458 5.80833 13.1333 7.525 14.5ZM7.5 17C5.15 15.2667 3.39583 13.5833 2.2375 11.95C1.07917 10.3167 0.5 8.71667 0.5 7.15C0.5 5.96667 0.7125 4.92917 1.1375 4.0375C1.5625 3.14583 2.10833 2.4 2.775 1.8C3.44167 1.2 4.19167 0.75 5.025 0.45C5.85833 0.15 6.68333 0 7.5 0C8.31667 0 9.14167 0.15 9.975 0.45C10.8083 0.75 11.5583 1.2 12.225 1.8C12.8917 2.4 13.4375 3.14583 13.8625 4.0375C14.2875 4.92917 14.5 5.96667 14.5 7.15C14.5 8.71667 13.9208 10.3167 12.7625 11.95C11.6042 13.5833 9.85 15.2667 7.5 17ZM7.5 9C8.05 9 8.52083 8.80417 8.9125 8.4125C9.30417 8.02083 9.5 7.55 9.5 7C9.5 6.45 9.30417 5.97917 8.9125 5.5875C8.52083 5.19583 8.05 5 7.5 5C6.95 5 6.47917 5.19583 6.0875 5.5875C5.69583 5.97917 5.5 6.45 5.5 7C5.5 7.55 5.69583 8.02083 6.0875 8.4125C6.47917 8.80417 6.95 9 7.5 9Z\" fill=\"#404040\"></path> </svg>",
            }}
          />
        </div>
        <span className="text-neutral-700 text-sm max-lg:text-xs font-normal leading-6 max-lg:leading-5">
          Centrar
        </span>
      </button>
    </article>
  );
};

export default EmergencyAlert;
