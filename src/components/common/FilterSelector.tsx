import React, { useState, useEffect } from 'react';
import Button from './Button';
import { FilterIcon } from '../icons/Icons';
import FilterDialog from '../filters/FilterDialog';

interface FilterSelectorProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
  className?: string;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({
  title,
  options,
  selectedOptions,
  onChange,
  multiSelect = false,
  className = '',
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Create section ID from title (e.g., "Car Type" -> "carType")
  const sectionId = title.toLowerCase().replace(/\s+/g, '');
  
  // Convert flat selectedOptions array to Record format for FilterDialog
  const selectedFiltersRecord: Record<string, string[]> = {
    [sectionId]: selectedOptions
  };
  
  const handleFilterClick = () => {
    setIsDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  
  const handleApplyFilters = (filters: Record<string, string[]>) => {
    // Extract selected options from the filters object
    const selected = filters[sectionId] || [];
    
    // Pass the selected options back to the parent via onChange
    onChange(selected);
    
    setIsDialogOpen(false);
  };
  
  // Define filter sections based on props
  const filterSections = [
    {
      id: sectionId,
      title: title.toUpperCase(),
      options: options.map(option => ({
        id: option,
        label: option,
        value: option
      }))
    }
  ];
  
  return (
    <>
      <Button
        variant="filter"
        className={`px-4 py-2 flex items-center gap-2 ${className}`}
        onClick={handleFilterClick}
        startIcon={<FilterIcon size={16} />}
      >
        {title}
        {selectedOptions.length > 0 && (
          <span className="ml-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {selectedOptions.length}
          </span>
        )}
      </Button>
      
      <FilterDialog 
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onApply={handleApplyFilters}
        initialFilters={selectedFiltersRecord}
        filterSections={filterSections}
        multiSelect={multiSelect}
      />
    </>
  );
};

export default FilterSelector;
