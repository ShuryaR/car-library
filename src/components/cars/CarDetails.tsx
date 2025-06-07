import React, { useState } from 'react';
import { Car } from '../../types/car';
import Modal from '../common/Modal';
import { Heading, BodyText, Caption, Title } from '../common/Typography';
import { CrossIcon, DeleteIcon } from '../icons/Icons';
import Button from '../common/Button';
import Tag from '../common/Tag';
import TagGroup from '../common/TagGroup';
import DeleteConfirmation from './DeleteConfirmation';

interface CarDetailsProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car, isOpen, onClose, onDelete }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  if (!car) return null;
  
  // Format the date to match the Figma design
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    return date.toLocaleDateString('en-US', options).replace(',', ' |');
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };
  
  const handleDeleteConfirm = () => {
    onDelete(car.id);
    setShowDeleteConfirmation(false);
    onClose();
  };
  
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="relative px-8 py-6 max-w-4xl w-full">
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <CrossIcon size={20} />
          </button>
          
          {/* Car Title */}
          <Heading className="mb-6 text-2xl font-bold text-gray-900">{car.name}</Heading>
          
          {/* Car Image */}
          <div className="w-full h-[320px] mb-6 rounded-xl overflow-hidden bg-gray-100">
            {car.imageUrl ? (
              <img 
                src={car.imageUrl} 
                alt={car.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>
          
          {/* Transmission Badge */}
          <div className="mb-6">
            <Tag 
              variant={car.carType?.toLowerCase() === 'manual' ? 'manual' : 'automatic'}
              className="px-4 py-1.5 text-sm font-medium uppercase tracking-wide"
            >
              {car.carType || 'Unknown'}
            </Tag>
          </div>
          
          {/* Description Section */}
          <div className="mb-8">
            <Title className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Description</Title>
            <BodyText className="text-gray-700 text-base leading-6">{car.description}</BodyText>
          </div>
          
          {/* Specifications Section */}
          <div className="mb-8">
            <Title className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Specifications</Title>
            <div className="flex flex-wrap gap-2">
              {car.tags && car.tags.length > 0 ? (
                car.tags.map((tag, index) => (
                  <Tag key={index} variant="outline" className="px-3 py-1.5 text-sm">
                    {tag}
                  </Tag>
                ))
              ) : (
                <Tag variant="outline" className="px-3 py-1.5 text-sm text-gray-500">
                  No specifications available
                </Tag>
              )}
            </div>
          </div>
          
          {/* Last Updated and Delete Button */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <Button 
              variant="text" 
              className="text-red-600 hover:bg-red-50 px-3 py-2 -ml-3"
              onClick={handleDeleteClick}
              startIcon={<DeleteIcon size={16} className="text-red-600" />}
            >
              Delete Car
            </Button>
            
            <Caption className="text-xs text-gray-400">
              Last updated: {car.createdAt ? formatDate(car.createdAt) : 'Unknown'}
            </Caption>
          </div>
        </div>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmation 
        isOpen={showDeleteConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleDeleteConfirm}
        carName={car.name}
      />
    </>
  );
};

export default CarDetails;
