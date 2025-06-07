import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarListItem, Car, FilterOptions, SortOptions } from '../types/car';
import { CarService } from '../services/api';
import Header from '../components/layout/Header';
import SearchBar from '../components/common/SearchBar';
import SortDropdown from '../components/common/SortDropdown';
import FilterSelector from '../components/common/FilterSelector';
import CarCard from '../components/cars/CarCard';
import CarDetails from '../components/cars/CarDetails';
import CarForm from '../components/cars/CarForm';
import ConfirmationModal from '../components/common/ConfirmationModal';
import Background from '../components/common/Background';
import { FilterIcon, SortIcon, PlusIcon } from '../components/icons/Icons';
import { Heading, Caption } from '../components/common/Typography';
import Tag from '../components/common/Tag';
import TagGroup from '../components/common/TagGroup';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarListItem[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [carToDelete, setCarToDelete] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showCarDetailsModal, setShowCarDetailsModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: '',
    carType: undefined,
    tags: [],
  });
  
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    sortBy: 'name',
    sortOrder: 'ASC',
  });

  // Fetch initial data on component mount
  useEffect(() => {
    fetchCars();
    fetchFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch cars when filters or sorting changes
  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOptions, sortOptions]);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const data = await CarService.getAllCars(filterOptions, sortOptions);
      setCars(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cars. Please try again later.');
      console.error('Error fetching cars:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      // Fetch car types and tags in parallel
      const [typesData, tagsData] = await Promise.all([
        CarService.getCarTypes(),
        CarService.getCarTags(),
      ]);
      
      setCarTypes(typesData);
      setTags(tagsData);
    } catch (err) {
      console.error('Error fetching filters:', err);
    }
  };

  const handleCarClick = async (id: number) => {
    try {
      const car = await CarService.getCarById(id);
      setSelectedCar(car);
      setShowCarDetailsModal(true);
    } catch (err) {
      console.error('Error fetching car details:', err);
    }
  };

  const handleAddCar = async (car: Omit<Car, 'id' | 'createdAt'>) => {
    try {
      await CarService.createCar(car);
      setShowAddCarModal(false);
      fetchCars();
    } catch (err) {
      console.error('Error adding car:', err);
    }
  };

  const handleDeleteClick = (id: number) => {
    setCarToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (carToDelete) {
      try {
        await CarService.deleteCar(carToDelete);
        setShowDeleteConfirmation(false);
        setCarToDelete(null);
        
        // Close detail modal if the deleted car was being viewed
        if (selectedCar && selectedCar.id === carToDelete) {
          setShowCarDetailsModal(false);
        }
        
        fetchCars();
      } catch (err) {
        console.error('Error deleting car:', err);
      }
    }
  };

  const handleSearch = (query: string) => {
    setFilterOptions(prev => ({ ...prev, search: query }));
  };

  const handleSortChange = (sort: SortOptions) => {
    setSortOptions(sort);
  };

  const handleCarTypeFilter = (selected: string[]) => {
    // Since car type is a single select, use the first value or undefined
    const carType = selected.length > 0 ? selected[0] : undefined;
    setFilterOptions(prev => ({ ...prev, carType }));
  };

  const handleTagsFilter = (selected: string[]) => {
    setFilterOptions(prev => ({ ...prev, tags: selected }));
  };

  // Don't show modals if data isn't loaded
  const showDetails = showCarDetailsModal && selectedCar !== null;
  
  // Check if any filters are applied
  const hasActiveFilters = filterOptions.search || filterOptions.carType || (filterOptions.tags && filterOptions.tags.length > 0);
  
  // Get currently applied car type
  const activeCarType = filterOptions.carType || '';
  
  // Formatted result count text
  const resultsCountText = `${cars.length} ${cars.length === 1 ? 'Car' : 'Cars'} Found`;
    
  return (
    <Background variant="light" className="min-h-screen pb-16">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Page title and search section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <Heading className="text-[28px] mb-1">Car Library</Heading>
            <Caption className="text-gray-500">{resultsCountText}</Caption>
          </div>
          
          <div className="w-full md:w-[320px]">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search by name, type..." 
              initialValue={filterOptions.search || ''}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Filters section */}
        <div className="mb-10 flex flex-col gap-6">
          {/* Filter controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Car Type Filter */}
            <div className="relative">
              <FilterSelector
                title="Car Type"
                options={carTypes}
                selectedOptions={filterOptions.carType ? [filterOptions.carType] : []}
                onChange={handleCarTypeFilter}
              />
            </div>
            
            {/* Tags Filter */}
            <div className="relative">
              <FilterSelector
                title="Tags"
                options={tags}
                selectedOptions={filterOptions.tags || []}
                onChange={handleTagsFilter}
                multiSelect
              />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative ml-auto">
              <SortDropdown onSort={handleSortChange} />
            </div>
          </div>
          
          {/* Applied filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-3">
              <Caption className="text-gray-600 mr-1">Applied Filters:</Caption>
              
              {/* Show car type filter tag if applied */}
              {filterOptions.carType && (
                <Tag 
                  variant="filter-selected" 
                  onClick={() => handleCarTypeFilter([])}
                >
                  {activeCarType}
                  <span className="ml-2">×</span>
                </Tag>
              )}
              
              {/* Show tags filter chips if applied */}
              {filterOptions.tags && filterOptions.tags.map(tag => (
                <Tag 
                  key={tag}
                  variant="filter-selected"
                  onClick={() => handleTagsFilter(filterOptions.tags?.filter(t => t !== tag) || [])}
                >
                  {tag}
                  <span className="ml-2">×</span>
                </Tag>
              ))}
              
              {/* Clear all filters button */}
              {hasActiveFilters && (
                <button 
                  onClick={() => {
                    setFilterOptions({
                      search: '',
                      carType: undefined,
                      tags: []
                    });
                  }}
                  className="text-sm text-gray-600 underline hover:text-purple-600 ml-2"
                >
                  Clear All
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-center">
            <span className="text-red-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
            {error}
          </div>
        )}
        
        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mb-4"></div>
            <Caption className="text-gray-500">Loading cars...</Caption>
          </div>
        )}
        
        {/* Empty state */}
        {!isLoading && cars.length === 0 && (
          <div className="bg-white rounded-3xl shadow-[-6px_-2px_16px_0px_rgba(0,0,0,0.04),6px_12px_16px_0px_rgba(0,0,0,0.02)] p-12 text-center">
            <div className="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <Heading as="h3" className="text-xl mb-2">No cars found</Heading>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Try adjusting your search filters or add a new car to your collection.</p>
            <button 
              onClick={() => setShowAddCarModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
            >
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </span>
              Add New Car
            </button>
          </div>
        )}
        
        {/* Car grid */}
        {!isLoading && cars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cars.map(car => (
              <CarCard
                key={car.id}
                car={car}
                onClick={handleCarClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <CarDetails
        car={selectedCar as Car} /* Cast is safe because we only open modal when selectedCar has been fully fetched */
        isOpen={showDetails}
        onClose={() => setShowCarDetailsModal(false)}
        onDelete={handleDeleteClick}
      />

      <CarForm
        isOpen={showAddCarModal}
        onClose={() => setShowAddCarModal(false)}
        onSubmit={handleAddCar}
        carTypes={carTypes}
        availableTags={tags}
      />

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title="Delete Car"
        message="Are you sure you want to delete this car? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirmation(false)}
        danger
      />
      
      {/* Floating Add Car Button */}
      <div className="fixed bottom-8 right-8">
        <Button 
          variant="action" 
          onClick={() => navigate('/add-car')}
          startIcon={<PlusIcon size={16} color="white" />}
          className="shadow-lg hover:shadow-xl">
          Add Car
        </Button>
      </div>
    </Background>
  );
};

export default HomePage;
