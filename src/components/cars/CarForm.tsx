import React, { useState, useEffect } from 'react';
import { Car } from '../../types/car';
import Button from '../common/Button';
import Input from '../common/Input';
import Modal from '../common/Modal';

interface CarFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (car: Omit<Car, 'id' | 'createdAt'>) => void;
  carTypes: string[];
  availableTags: string[];
}

const CarForm: React.FC<CarFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  carTypes,
  availableTags,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    carType: '',
    tags: [] as string[],
    specifications: [] as string[],
  });
  
  const [isSpecsDropdownOpen, setIsSpecsDropdownOpen] = useState(false);
  const [isCarTypeDropdownOpen, setIsCarTypeDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    imageUrl: '',
    carType: '',
  });

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        description: '',
        imageUrl: '',
        carType: carTypes.length > 0 ? carTypes[0] : '',
        tags: [],
        specifications: [],
      });
      setErrors({
        name: '',
        description: '',
        imageUrl: '',
        carType: '',
      });
    }
  }, [isOpen, carTypes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => {
      const currentTags = [...prev.tags];
      const tagIndex = currentTags.indexOf(tag);
      
      if (tagIndex >= 0) {
        currentTags.splice(tagIndex, 1);
      } else {
        currentTags.push(tag);
      }
      
      return { ...prev, tags: currentTags };
    });
  };
  
  const toggleSpecification = (spec: string) => {
    setFormData(prev => {
      const currentSpecs = [...prev.specifications];
      const specIndex = currentSpecs.indexOf(spec);
      
      if (specIndex >= 0) {
        currentSpecs.splice(specIndex, 1);
      } else {
        currentSpecs.push(spec);
      }
      
      return { ...prev, specifications: currentSpecs };
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      description: '',
      imageUrl: '',
      carType: '',
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
      isValid = false;
    } else if (!/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
      isValid = false;
    }

    if (!formData.carType) {
      newErrors.carType = 'Car type is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Car">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Car Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            fullWidth
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 w-full ${
              errors.description ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
            }`}
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        <div>
          <Input
            label="Image URL"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            error={errors.imageUrl}
            fullWidth
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Car Type
          </label>
          <div 
            onClick={() => setIsCarTypeDropdownOpen(!isCarTypeDropdownOpen)}
            className={`px-4 py-2 border rounded-lg cursor-pointer flex justify-between items-center bg-white ${errors.carType ? 'border-red-500' : 'border-gray-300'}`}
          >
            <span className="text-gray-700">
              {formData.carType || 'Select'}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isCarTypeDropdownOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isCarTypeDropdownOpen && (
            <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div className="p-2">
                {carTypes.map((type, index) => (
                  <div key={index} className="flex items-center p-2">
                    <input
                      type="radio"
                      id={`car-type-${index}`}
                      name="carType"
                      className="mr-2"
                      checked={formData.carType === type}
                      onChange={() => setFormData(prev => ({ ...prev, carType: type }))}
                    />
                    <label htmlFor={`car-type-${index}`} className="text-sm">{type}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {errors.carType && (
            <p className="mt-1 text-sm text-red-600">{errors.carType}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specifications
          </label>
          <div className="relative">
            <div 
              onClick={() => setIsSpecsDropdownOpen(!isSpecsDropdownOpen)}
              className="px-4 py-2 border rounded-lg cursor-pointer flex justify-between items-center bg-white border-gray-300 focus:ring-blue-300"
            >
              <span className="text-gray-700">
                {formData.specifications.length > 0 ? `${formData.specifications.length} selected` : 'Select'}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${isSpecsDropdownOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Display selected specifications as tags */}
            {formData.specifications.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
                    <span>{spec}</span>
                    <button 
                      type="button" 
                      className="ml-1 focus:outline-none" 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSpecification(spec);
                      }}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {isSpecsDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <div className="p-2 max-h-60 overflow-y-auto">
                <div className="flex items-center p-2">
                  <input
                    type="checkbox"
                    id="spec-engine"
                    className="mr-2"
                    checked={formData.specifications.includes('Engine: 5.0L Ti-VCT V8')}
                    onChange={() => toggleSpecification('Engine: 5.0L Ti-VCT V8')}
                  />
                  <label htmlFor="spec-engine" className="text-sm">Engine: 5.0L Ti-VCT V8</label>
                </div>
                <div className="flex items-center p-2">
                  <input
                    type="checkbox"
                    id="spec-displacement"
                    className="mr-2"
                    checked={formData.specifications.includes('Displacement: 4951 cc')}
                    onChange={() => toggleSpecification('Displacement: 4951 cc')}
                  />
                  <label htmlFor="spec-displacement" className="text-sm">Displacement: 4951 cc</label>
                </div>
                <div className="flex items-center p-2">
                  <input
                    type="checkbox"
                    id="spec-fuel"
                    className="mr-2"
                    checked={formData.specifications.includes('Fuel Type: Petrol')}
                    onChange={() => toggleSpecification('Fuel Type: Petrol')}
                  />
                  <label htmlFor="spec-fuel" className="text-sm">Fuel Type: Petrol</label>
                </div>
                <div className="flex items-center p-2">
                  <input
                    type="checkbox"
                    id="spec-mileage"
                    className="mr-2"
                    checked={formData.specifications.includes('Mileage (ARAI): 7.9 km/l')}
                    onChange={() => toggleSpecification('Mileage (ARAI): 7.9 km/l')}
                  />
                  <label htmlFor="spec-mileage" className="text-sm">Mileage (ARAI): 7.9 km/l</label>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag, index) => (
              <button
                key={index}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.tags.includes(tag)
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Car
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CarForm;
