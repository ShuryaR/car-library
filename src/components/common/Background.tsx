import React, { ReactNode } from 'react';

interface BackgroundProps {
  children: ReactNode;
  variant?: 'default' | 'white' | 'light' | 'dark';
  className?: string;
}

/**
 * Background component for consistent page and section backgrounds
 * Uses Tailwind CSS for styling with Figma design variables
 */
const Background: React.FC<BackgroundProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  // Define background variants based on Figma design system
  const variantStyles = {
    // Light gray background (#F8F8F8) - default app background from Figma
    default: 'bg-[#F8F8F8]',
    
    // White background for cards and elevated elements
    white: 'bg-white',
    
    // Light variant - subtle light gray for secondary elements
    light: 'bg-gray-50',
    
    // Dark variant - for footer or special sections
    dark: 'bg-gray-800 text-white',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Background;
