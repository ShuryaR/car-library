import React, { useState, useRef, useEffect } from 'react';
import { SortOptions } from '../../types/car';
import { Caption } from './Typography';
import Button from './Button';

interface SortOption {
  label: string;
  value: SortOptions;
}

interface SortDropdownProps {
  onSort: (sortOptions: SortOptions) => void;
  className?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSort, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions: SortOption[] = [
    { label: 'Name (A-Z)', value: { sortBy: 'name', sortOrder: 'ASC' } },
    { label: 'Name (Z-A)', value: { sortBy: 'name', sortOrder: 'DESC' } },
    { label: 'Newest First', value: { sortBy: 'createdAt', sortOrder: 'DESC' } },
    { label: 'Oldest First', value: { sortBy: 'createdAt', sortOrder: 'ASC' } },
  ];
  
  const [selectedOption, setSelectedOption] = useState<SortOption>(sortOptions[0]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when ESC key is pressed
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen]);

  const handleSelect = (option: SortOption) => {
    setSelectedOption(option);
    onSort(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="sort"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="px-5 py-[10px]"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            {selectedOption.label}
          </div>
          
          <svg
            className={`h-4 w-4 ${isOpen ? 'rotate-180' : ''} transition-transform duration-200`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-[200px] mt-2 bg-white shadow-lg max-h-60 rounded-xl py-1 text-base ring-1 ring-gray-200 overflow-auto focus:outline-none sm:text-sm">
          {sortOptions.map((option, index) => (
            <div
              key={index}
              className={`${
                selectedOption.label === option.label
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-700'
              } cursor-pointer select-none relative py-2 px-4 hover:bg-gray-50 transition-colors duration-150`}
              onClick={() => handleSelect(option)}
            >
              <Caption as="span" className={selectedOption.label === option.label ? "font-medium" : "font-normal"}>
                {option.label}
              </Caption>
              
              {selectedOption.label === option.label && (
                <span className="absolute inset-y-0 right-2 flex items-center">
                  <svg className="h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
