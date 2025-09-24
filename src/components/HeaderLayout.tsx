import React from 'react';
import FilterBar from './FilterBar';

interface HeaderLayoutProps {
  children: React.ReactNode; // Este será el contenido del header
  onFilterChange: (filterId: string, active: boolean) => void;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children, onFilterChange }) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center w-full px-4 py-3">
        <div className="flex-shrink-0">
          {children}
        </div>
        <div className="flex-grow ml-4">
          <FilterBar onFilterChange={onFilterChange} />
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
