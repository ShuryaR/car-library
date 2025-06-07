import React from 'react';
import Modal from '../common/Modal';
import { Heading, BodyText } from '../common/Typography';
import Button from '../common/Button';
import { DeleteIcon } from '../icons/Icons';

interface DeleteConfirmationProps {
  carName: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  carName,
  isOpen,
  onClose,
  onConfirm
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8 max-w-md mx-auto">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-red-50">
          <DeleteIcon size={24} className="text-red-600" />
        </div>
        
        <Heading className="text-center mb-2">Delete Car</Heading>
        
        <BodyText className="text-center mb-8 text-gray-600">
          Are you sure you want to delete "{carName}"? This action cannot be undone.
        </BodyText>
        
        <div className="flex flex-col space-y-3">
          <Button 
            variant="primary" 
            className="bg-red-600 hover:bg-red-700" 
            onClick={onConfirm}
          >
            Delete
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
