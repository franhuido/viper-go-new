import React from 'react';

interface CommunicationRecord {
  id: string;
  code: string;
  timestamp: string;
}

interface CommunicationHistoryProps {
  isOpen?: boolean; // solo para modo overlay
  onClose?: () => void;
  embedded?: boolean; // si true, se renderiza embebido en el sidebar
  messages?: CommunicationRecord[];
}

const CommunicationHistory: React.FC<CommunicationHistoryProps> = ({
  isOpen = true,
  onClose,
  embedded = false,
  messages = [
    { id: '1', code: '6-14', timestamp: '21-08-2025 15:47' },
    { id: '2', code: '7-10', timestamp: '21-08-2025 16:03' },
    { id: '3', code: '5-20', timestamp: '21-08-2025 16:15' },
  ],
}) => {
  if (!embedded) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className="p-4 border-b flex items-center">
          <button onClick={onClose} className="mr-2">←</button>
          <h2 className="text-lg font-bold">Historial de comunicaciones</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((m) => (
            <div key={m.id} className="p-2 border-b">
              <div className="font-semibold">{m.code}</div>
              <div className="text-xs text-gray-500">{m.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Modo embebido en Sidebar ---
  return (
    <div className="flex flex-col h-full bg-white">
      <h2 className="text-lg font-bold mb-2">Historial de comunicaciones</h2>
      <div className="flex-1 overflow-y-auto">
        {messages.map((m) => (
          <div key={m.id} className="p-2 border-b">
            <div className="font-semibold">{m.code}</div>
            <div className="text-xs text-gray-500">{m.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationHistory;
