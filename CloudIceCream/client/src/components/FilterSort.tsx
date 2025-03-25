import { useState } from "react";

interface FilterSortProps {
  onFilterChange?: (value: string | null) => void;
  onSortChange?: (value: string | null) => void;
}

export default function FilterSort({ onFilterChange, onSortChange }: FilterSortProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeSort, setActiveSort] = useState<string | null>(null);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
    setSortOpen(false);
  };

  const toggleSort = () => {
    setSortOpen(!sortOpen);
    setFilterOpen(false);
  };

  const handleFilterChange = (value: string) => {
    const newFilters = activeFilters.includes(value)
      ? activeFilters.filter((filter) => filter !== value)
      : [...activeFilters, value];
    
    setActiveFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters.length > 0 ? newFilters[0] : null);
    }
  };

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    setSortOpen(false);
    
    if (onSortChange) {
      onSortChange(value);
    }
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (!target.closest('#filterDropdown') && !target.closest('#filterButton')) {
      setFilterOpen(false);
    }
    
    if (!target.closest('#sortDropdown') && !target.closest('#sortButton')) {
      setSortOpen(false);
    }
  };

  // Add event listener for clicks outside the dropdowns
  useState(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="flex space-x-3">
      <div className="relative z-10">
        <button 
          id="filterButton" 
          className={`px-4 py-2 bg-white rounded-lg text-sm font-medium flex items-center space-x-2 border ${activeFilters.length > 0 ? 'border-[#E8D4C4]' : 'border-gray-200'} hover:border-[#E8D4C4] transition`}
          onClick={toggleFilter}
        >
          <span>Filter</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {filterOpen && (
          <div id="filterDropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4">
            <div className="space-y-3">
              <p className="font-medium text-sm text-gray-800">Dietary</p>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="rounded text-[#E8D4C4]"
                    checked={activeFilters.includes('dairy-free')}
                    onChange={() => handleFilterChange('dairy-free')}
                  />
                  <span>Dairy-Free</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="rounded text-[#E8D4C4]"
                    checked={activeFilters.includes('vegan')}
                    onChange={() => handleFilterChange('vegan')}
                  />
                  <span>Vegan</span>
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input 
                    type="checkbox" 
                    className="rounded text-[#E8D4C4]"
                    checked={activeFilters.includes('gluten-free')}
                    onChange={() => handleFilterChange('gluten-free')}
                  />
                  <span>Gluten-Free</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <button 
          id="sortButton" 
          className={`px-4 py-2 bg-white rounded-lg text-sm font-medium flex items-center space-x-2 border ${activeSort ? 'border-[#E8D4C4]' : 'border-gray-200'} hover:border-[#E8D4C4] transition`}
          onClick={toggleSort}
        >
          <span>Sort By</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {sortOpen && (
          <div id="sortDropdown" className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
            <button 
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#F9F5F2] ${activeSort === 'newest' ? 'text-[#E8D4C4]' : ''}`}
              onClick={() => handleSortChange('newest')}
            >
              Newest
            </button>
            <button 
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#F9F5F2] ${activeSort === 'popular' ? 'text-[#E8D4C4]' : ''}`}
              onClick={() => handleSortChange('popular')}
            >
              Popular
            </button>
            <button 
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#F9F5F2] ${activeSort === 'price-asc' ? 'text-[#E8D4C4]' : ''}`}
              onClick={() => handleSortChange('price-asc')}
            >
              Price: Low to High
            </button>
            <button 
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#F9F5F2] ${activeSort === 'price-desc' ? 'text-[#E8D4C4]' : ''}`}
              onClick={() => handleSortChange('price-desc')}
            >
              Price: High to Low
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
