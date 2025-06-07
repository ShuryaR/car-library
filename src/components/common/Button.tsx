import React, { ButtonHTMLAttributes } from 'react';
import { FilterIcon, PlusIcon, SortIcon } from '../icons/Icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'action' | 'filter' | 'filter-selected' | 'sort' | 'sort-selected' | 'text' | 'danger';
  children: React.ReactNode;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  startIcon,
  endIcon,
  ...props
}) => {
  const baseStyles = 'font-medium transition-colors focus:outline-none flex items-center justify-center gap-2';
  
  const variantStyles = {
    // Purple filled button (Apply button)
    primary: 'bg-[#9370DB] text-white hover:bg-[#8A5FDB] rounded-full py-3 px-6',
    
    // Outlined button with black border (Secondary Apply)
    secondary: 'bg-transparent text-black border border-black rounded-full py-3 px-6',
    
    // Text button with no background or border
    text: 'bg-transparent hover:bg-gray-100 rounded-md',
    
    // Add Car/New Exercise button with + icon and white border
    action: 'bg-[#9370DB] text-white hover:bg-[#8A5FDB] rounded-full py-2 px-4 border-2 border-white',
    
    // White filter button
    filter: 'bg-white text-black border border-gray-200 rounded-full py-2 px-4 shadow-sm hover:bg-gray-50',
    
    // Selected filter button with purple border
    'filter-selected': 'bg-white text-[#9370DB] border border-[#9370DB] rounded-full py-2 px-4 shadow-sm',
    
    // White sort button
    sort: 'bg-white text-black border border-gray-200 rounded-full py-2 px-4 shadow-sm hover:bg-gray-50',
    
    // Selected sort button with purple border
    'sort-selected': 'bg-white text-[#9370DB] border border-[#9370DB] rounded-full py-2 px-4 shadow-sm',
    
    // Red danger button for destructive actions like delete
    danger: 'bg-red-600 text-white hover:bg-red-700 rounded-full py-3 px-6',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

// Icons are now imported from ../icons/Icons.tsx

export default Button;
