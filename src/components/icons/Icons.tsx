import React from 'react';

// Interface for all icon components
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

// Create a HOC function to wrap imported SVGs
const createIconComponent = (importFunc: () => Promise<any>, defaultColor: string = 'currentColor') => {
  const IconComponent: React.FC<IconProps> = ({ 
    size = 24, 
    color = defaultColor, 
    className = '', 
    onClick 
  }) => {
    const [IconSvg, setIconSvg] = React.useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);
    
    React.useEffect(() => {
      importFunc().then((module) => {
        setIconSvg(() => module.ReactComponent);
      });
    }, []);
    
    if (!IconSvg) {
      return <span className="icon-loading" style={{ width: size, height: size }} />;
    }
    
    return (
      <IconSvg 
        width={size} 
        height={size} 
        className={className} 
        onClick={onClick}
        style={{ color }}
      />
    );
  };
  
  return IconComponent;
};

// Export all icons using the factory function
export const NotificationIcon = createIconComponent(() => import('../../assets/icons/Notification.svg'));
export const SearchIcon = createIconComponent(() => import('../../assets/icons/Search.svg'));
export const FilterIcon = createIconComponent(() => import('../../assets/icons/Filter.svg'));
export const SortIcon = createIconComponent(() => import('../../assets/icons/Sort.svg'));
export const CrossIcon = createIconComponent(() => import('../../assets/icons/Cross.svg'));
export const BackArrowIcon = createIconComponent(() => import('../../assets/icons/BackArrow.svg'));
export const ArrowRightIcon = createIconComponent(() => import('../../assets/icons/Arrow_Right.svg'));
export const ArrowLeftIcon = createIconComponent(() => import('../../assets/icons/Arrow_Left.svg'));
export const ArrowDownIcon = createIconComponent(() => import('../../assets/icons/Arrow_Down.svg'));
export const ArrowUpIcon = createIconComponent(() => import('../../assets/icons/Arrow_Up.svg'));
export const DeleteIcon = createIconComponent(() => import('../../assets/icons/Delete.svg'), '#FF0000');
export const TickIcon = createIconComponent(() => import('../../assets/icons/Tick.svg'));
export const AutomaticIcon = createIconComponent(() => import('../../assets/icons/Automatic.svg'));
export const ManualIcon = createIconComponent(() => import('../../assets/icons/Manual.svg'));
export const UploadIcon = createIconComponent(() => import('../../assets/icons/Upload.svg'));
export const SortingUpIcon = createIconComponent(() => import('../../assets/icons/Sorting_Up.svg'));
export const SortingDownIcon = createIconComponent(() => import('../../assets/icons/Sorting_Down.svg'));

// Play icons (in subdirectory)
export const PlaySelectedIcon = createIconComponent(() => import('../../assets/icons/Play/Selected.svg'));
export const PlayDeselectedIcon = createIconComponent(() => import('../../assets/icons/Play/Deselected.svg'));

// Add inline SVG icons that are not in assets but needed for our UI
export const PlusIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', onClick }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
    <path d="M12 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Eye icon for password toggle
export const EyeIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', onClick }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
    <path d="M12 5C7.45455 5 3.57273 7.90909 2 12C3.57273 16.0909 7.45455 19 12 19C16.5455 19 20.4273 16.0909 22 12C20.4273 7.90909 16.5455 5 12 5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Eye slash icon for password toggle
export const EyeSlashIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', onClick }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
    <path d="M9.9 4.24C10.5883 4.0789 11.2931 3.99836 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1L23 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1L23 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 12C1 12 5 4 12 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 20C9.14418 20 6.75778 18.8558 5 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Inline Search icon for navbar search - matches Figma design
export const SearchInlineIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '', onClick }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
      <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// Define XIcon as an alias for CrossIcon for backward compatibility
export const XIcon = CrossIcon;

// ChevronDown icon for dropdowns and accordions
export const ChevronDownIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '', 
  onClick 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ChevronUp icon for dropdowns and accordions
export const ChevronUpIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = 'currentColor', 
  className = '', 
  onClick 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color}
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 15L12 9L6 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
