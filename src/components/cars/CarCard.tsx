import React from 'react';
import { CarListItem } from '../../types/car';
import { DeleteIcon, EyeIcon } from '../icons/Icons';
import { Title, BodyText, Caption } from '../common/Typography';
import Tag from '../common/Tag';

interface CarCardProps {
  car: CarListItem;
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onClick, onDelete }) => {
  const truncateText = (text: string | undefined | null, maxLength: number): string => {
    if (!text) return '';
    const textStr = String(text);
    if (textStr.length <= maxLength) return textStr;
    return `${textStr.substring(0, maxLength)}...`;
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(car.id);
  };

  // Determine tag variant based on car type
  const tagVariant = car.carType?.toLowerCase() === 'manual' ? 'manual' : 'automatic';
  
  return (
    <div 
      className="bg-white relative rounded-[20px] shadow-[-6px_-2px_12px_0px_rgba(0,0,0,0.04),6px_12px_12px_0px_rgba(0,0,0,0.02)] cursor-pointer hover:translate-y-[-4px] transition-all duration-300" 
      onClick={() => onClick(car.id)}
    >
      <div className="flex flex-col w-full">
        {/* Image Section with Transmission Tag */}
        <div className="relative h-[180px] w-full overflow-hidden rounded-t-[20px]">
          {car.imageUrl ? (
            <img 
              src={car.imageUrl} 
              alt={car.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <span className="text-gray-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                No Image
              </span>
            </div>
          )}
          
          {/* View button with eye icon */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all">
            <EyeIcon size={20} className="text-gray-700" />
          </div>
          
          {/* Transmission Tag (Manual/Automatic) */}
          {car.carType && (
            <Tag 
              variant={tagVariant}
              className="absolute top-4 right-4"
            >
              {car.carType}
            </Tag>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 relative">
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="absolute top-5 right-5 text-red-500 hover:text-red-700 focus:outline-none p-2 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Delete car"
          >
            <DeleteIcon size={18} />
          </button>

          {/* Title and Description */}
          <Title className="mb-2 pr-8 line-clamp-1">{car.name}</Title>
          <BodyText className="text-gray-700 mb-3 line-clamp-2">
            {car.description ? truncateText(car.description, 85) : ''}
          </BodyText>
          
          {/* Added Date - now using optional createdAt from updated type */}
          {car.createdAt && (
            <Caption className="text-gray-500">
              Added: {new Date(car.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Caption>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
