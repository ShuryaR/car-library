import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Tag from '../common/Tag';
import { Heading } from '../common/Typography';
import { ChevronDownIcon, ChevronUpIcon, XIcon } from '../icons/Icons';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
}

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (selectedFilters: Record<string, string[]>) => void;
  initialFilters?: Record<string, string[]>;
  filterSections?: FilterSection[];
  multiSelect?: boolean;
}

const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
  onApply,
  initialFilters = {},
  filterSections: providedSections = [],
  multiSelect = true
}) => {
  // Define default filter sections if none are provided
  const defaultFilterSections: FilterSection[] = [
    {
      id: 'carType',
      title: 'CAR TYPE',
      options: [
        { id: 'manual', label: 'Manual', value: 'manual' },
        { id: 'automatic', label: 'Automatic', value: 'automatic' }
      ]
    },
    {
      id: 'specifications',
      title: 'SPECIFICATIONS',
      options: [
        { id: 'engine', label: 'Engine: 5.0L Ti-VCT V8', value: 'Engine: 5.0L Ti-VCT V8' },
        { id: 'displacement', label: 'Displacement: 4951 cc', value: 'Displacement: 4951 cc' },
        { id: 'fuelType', label: 'Fuel Type: Petrol', value: 'Fuel Type: Petrol' },
        { id: 'mileage', label: 'Mileage (ARAI): 7.9 km/l', value: 'Mileage (ARAI): 7.9 km/l' },
        { id: 'topSpeed', label: 'Top Speed: 250 km/h', value: 'Top Speed: 250 km/h' },
        { id: 'maxPower', label: 'Max Power: 401 PS @ 6500 rpm', value: 'Max Power: 401 PS @ 6500 rpm' },
        { id: 'emissionStandard', label: 'Emission Standard: BS4', value: 'Emission Standard: BS4' }
      ]
    }
  ];
  
  // Use provided sections if available, otherwise use default sections
  const activeSections = providedSections.length > 0 ? providedSections : defaultFilterSections;

  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    carType: true,
    specifications: true
  });

  // Track selected filters
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>(initialFilters);

  // Toggle section expand/collapse
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Toggle filter selection
  const toggleFilter = (sectionId: string, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[sectionId] || [];
      const exists = currentValues.includes(value);
      
      if (exists) {
        // Remove the item if it's already selected
        return {
          ...prev,
          [sectionId]: currentValues.filter(item => item !== value)
        };
      } else {
        // If multiSelect is false, replace the entire array with just this value
        // Otherwise add this value to the existing array
        return {
          ...prev,
          [sectionId]: multiSelect ? [...currentValues, value] : [value]
        };
      }
    });
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedFilters({});
  };

  // Handle apply button click
  const handleApply = () => {
    onApply(selectedFilters);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 max-w-lg w-full bg-white rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 3V8H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 16V21H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3L12 7L8 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 21L12 17L16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 11C3 7.229 6.134 4.222 10 4.222C13.866 4.222 17 7.229 17 11C17 14.771 13.866 17.778 10 17.778C6.134 17.778 3 14.771 3 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg font-semibold">Reset</span>
            </button>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={24} />
          </button>
        </div>

        <Heading className="text-3xl font-bold mb-8">Filter By</Heading>

        {activeSections.map((section: FilterSection, index: number) => (
          <div key={section.id} className="mb-6">
            <div 
              className="flex justify-between items-center cursor-pointer mb-6"
              onClick={() => toggleSection(section.id)}
            >
              <h2 className="text-xl font-bold tracking-wide">{section.title}</h2>
              <button className="text-gray-500">
                {expandedSections[section.id] ? (
                  <ChevronUpIcon size={24} />
                ) : (
                  <ChevronDownIcon size={24} />
                )}
              </button>
            </div>

            {expandedSections[section.id] && (
              <div className="flex flex-wrap gap-3 mb-6">
                {section.options.map(option => {
                  const isSelected = selectedFilters[section.id]?.includes(option.value);
                  
                  return (
                    <button
                      key={option.id}
                      className="focus:outline-none"
                      onClick={() => toggleFilter(section.id, option.value)}
                    >
                      <Tag 
                        variant={isSelected ? "filter-selected" : "filter"}
                        className="px-4 py-2 rounded-full text-sm"
                      >
                        {option.label}
                      </Tag>
                    </button>
                  );
                })}
              </div>
            )}
            
            {index < activeSections.length - 1 && (
              <div className="border-b border-gray-200 my-6"></div>
            )}
          </div>
        ))}

        <div className="mt-12 flex justify-center">
          <Button
            variant="primary"
            className="px-16 py-4 text-lg rounded-full w-full max-w-sm"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterDialog;
