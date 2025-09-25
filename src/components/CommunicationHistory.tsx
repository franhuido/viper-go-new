import React from "react";

interface Communication {
  id: string;
  message: string;
  timestamp: string;
}

const mockHistory: Communication[] = [
  { id: "1", message: "Clave 10 enviada", timestamp: "2025-09-22 14:32" },
  { id: "2", message: "Clave 7 recibida", timestamp: "2025-09-22 14:35" },
  { id: "3", message: "Clave 12 confirmada", timestamp: "2025-09-22 15:10" },
];

const CommunicationHistory: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      {mockHistory.map((entry) => (
        <div
          key={entry.id}
          className="p-3 rounded-lg border border-gray-200 bg-gray-50 shadow-sm"
        >
          <p className="text-sm text-gray-800">{entry.message}</p>
          <span className="text-xs text-gray-500">{entry.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default CommunicationHistory;
