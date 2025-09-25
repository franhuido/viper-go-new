import React, { useRef, useState } from 'react';

interface Filter {
  id: string;
  name: string;
  active: boolean;
}

interface FilterBarProps {
  onFilterChange: (filterId: string, active: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filter[]>([
    { id: '1', name: 'Grifos', active: false },
    { id: '2', name: 'Monumentos', active: false },
    { id: '3', name: 'Hospitales', active: false },
    { id: '4', name: 'Carabineros', active: false },
    { id: '5', name: 'Bomberos', active: true },
    { id: '6', name: 'SIC', active: false },
    { id: '7', name: 'Briefings', active: false },
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const toggleFilter = (filterId: string) => {
    setFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? { ...filter, active: !filter.active }
          : filter
      )
    );
    
    const filter = filters.find(f => f.id === filterId);
    if (filter) {
      onFilterChange(filterId, !filter.active);
    }
  };

  return (
    // outer nav: overflow-visible to avoid clipping of shadows (we control visual fade inside)
    <nav
      className="fixed top-6 max-lg:top-5 right-4 w-auto max-w-[calc(100vw-320px)] lg:max-w-[calc(100vw-400px)] min-w-[280px] overflow-visible px-4 py-2 z-50"
      aria-label="Filtro de capas"
    >
      <div className="relative">
        {/* scrollArea: mantiene el scroll horizontal y aplica el mask (fade) solo aquí */}
        <div
          ref={scrollRef}
          className="scrollArea flex items-center gap-3 pr-16 overflow-x-auto overflow-y-visible scrollbar-hide pb-1"
          style={{
            maskImage: 'linear-gradient(to right, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 88%, transparent 100%)',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`flex h-10 max-lg:h-8 justify-center items-center gap-[8px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] px-4 max-lg:px-3 py-2 max-lg:py-1.5 rounded-[20px] border-2 border-solid transition-colors whitespace-nowrap select-none ${
                filter.active 
                  ? 'bg-[#F17431] border-[#F17431] text-white' 
                  : 'bg-white border-[#D9D9D9] text-neutral-700'
              }`}
              aria-label={`Toggle ${filter.name} filter`}
              aria-pressed={filter.active}
            >
              <span className="text-base max-lg:text-sm font-normal leading-6 max-lg:leading-5">
                {filter.name}
              </span>
            </button>
          ))}
        </div>

        {/* botón de avanzar (derecha) */}
        <button
          type="button"
          onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
          className="absolute -right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 justify-center items-center rounded-full bg-white border-2 border-[#D9D9D9] shadow-[0_4px_8px_0_rgba(0,0,0,0.25)] hover:border-[#F17431] hover:bg-orange-50 z-20"
          aria-label="Avanzar filtros"
        >
          <span
            dangerouslySetInnerHTML={{
              __html:
                "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 18l6-6-6-6\" stroke=\"#404040\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
            }}
          />
        </button>
      </div>
    </nav>
  );
};

export default FilterBar;
