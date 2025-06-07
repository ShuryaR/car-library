import React, { ReactNode } from 'react';
import { Caption } from './Typography';

export type TagVariant = 
  | 'specification'  // Detail/Specifications 
  | 'safety'         // Detail/Safety
  | 'filter'         // Filter tag base style
  | 'filter-selected' // Selected filter tag
  | 'manual'         // Manual transmission tag
  | 'automatic'      // Automatic transmission tag
  | 'outline';       // Outline style for specifications

interface TagProps {
  variant: TagVariant;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({
  variant,
  children,
  onClick,
  className = '',
}) => {
  const variantStyles = {
    // Specifications tag (light gray pill with dark text)
    'specification': 'bg-gray-100 text-gray-800',
    
    // Safety tag (light blue pill with blue text)
    'safety': 'bg-blue-50 text-blue-700',
    
    // Filter tag (light gray with border)
    'filter': 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300',
    
    // Selected filter tag (purple with white text)
    'filter-selected': 'bg-purple-600 text-white border border-purple-600',
    
    // Manual transmission tag (green with light green background)
    'manual': 'bg-green-50 text-green-700',
    
    // Automatic transmission tag (orange with light orange background)
    'automatic': 'bg-amber-50 text-amber-700',
    
    // Outline style for specifications (white with border)
    'outline': 'bg-white text-gray-800 border border-gray-200',
  };
  
  const isClickable = !!onClick;
  const clickableStyles = isClickable ? 'cursor-pointer hover:opacity-80' : '';
  const baseStyles = 'inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all';
  
  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${clickableStyles} ${className}`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <Caption as="span" className="font-medium">
        {children}
      </Caption>
    </div>
  );
};

export default Tag;
