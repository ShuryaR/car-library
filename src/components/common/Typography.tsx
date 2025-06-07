import React, { ReactNode } from 'react';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

// Heading component - used for main page and section headings (Nunito Bold 27px)
export const Heading: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h2' 
}) => {
  return (
    <Component className={`text-[27px] font-bold text-black font-nunito leading-tight ${className}`}>
      {children}
    </Component>
  );
};

// SubHeading component - used for section sub-headers
export const SubHeading: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h3' 
}) => {
  return (
    <Component className={`text-xl font-semibold text-black leading-tight ${className}`}>
      {children}
    </Component>
  );
};

// Title component - used for card titles, modal titles
export const Title: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'h4' 
}) => {
  return (
    <Component className={`text-base font-bold text-black leading-normal ${className}`}>
      {children}
    </Component>
  );
};

// NavItem component - used for navigation items (Nunito Medium 16px)
export const NavItem: React.FC<TypographyProps & { active?: boolean }> = ({ 
  children, 
  className = '', 
  active = false,
  as: Component = 'span' 
}) => {
  return (
    <Component className={`text-[16px] font-medium font-nunito ${active ? 'text-[#9370DB]' : 'text-black hover:text-[#9370DB]'} transition-colors ${className}`}>
      {children}
    </Component>
  );
};

// BodyText component - used for normal content
export const BodyText: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'p' 
}) => {
  return (
    <Component className={`text-sm text-gray-800 font-normal leading-normal ${className}`}>
      {children}
    </Component>
  );
};

// Caption component - used for smaller text, labels
export const Caption: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span' 
}) => {
  return (
    <Component className={`text-xs text-gray-600 font-normal ${className}`}>
      {children}
    </Component>
  );
};

// Button text component - used for button labels
export const ButtonText: React.FC<TypographyProps> = ({ 
  children, 
  className = '', 
  as: Component = 'span' 
}) => {
  return (
    <Component className={`text-sm font-medium ${className}`}>
      {children}
    </Component>
  );
};
