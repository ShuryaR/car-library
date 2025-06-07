import axios from 'axios';
import { Car, CarListItem, FilterOptions, SortOptions } from '../types/car';

const API_URL = 'https://cars-mock-api-new-6e7a623e6570.herokuapp.com';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const CarService = {
  // Get all cars with optional filtering and sorting
  getAllCars: async (filters?: FilterOptions, sort?: SortOptions): Promise<CarListItem[]> => {
    let queryParams = new URLSearchParams();
    
    // Add filters if provided
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.carType) queryParams.append('carType', filters.carType);
    if (filters?.tags && filters.tags.length > 0) queryParams.append('tags', filters.tags.join(','));
    
    // Add sorting if provided
    if (sort?.sortBy) queryParams.append('sortBy', sort.sortBy);
    if (sort?.sortOrder) queryParams.append('sortOrder', sort.sortOrder);
    
    const response = await apiClient.get(`/api/cars?${queryParams.toString()}`);
    return response.data;
  },
  
  // Get a specific car by ID
  getCarById: async (id: number): Promise<Car> => {
    const response = await apiClient.get(`/api/cars/${id}`);
    return response.data;
  },
  
  // Get all unique car types
  getCarTypes: async (): Promise<string[]> => {
    const response = await apiClient.get('/api/cars/types');
    return response.data;
  },
  
  // Get all unique tags
  getCarTags: async (): Promise<string[]> => {
    const response = await apiClient.get('/api/cars/tags');
    return response.data;
  },
  
  // Create a new car
  createCar: async (car: Omit<Car, 'id' | 'createdAt'>): Promise<Car> => {
    const response = await apiClient.post('/api/cars', car);
    return response.data;
  },
  
  // Update a car
  updateCar: async (id: number, car: Partial<Omit<Car, 'id' | 'createdAt'>>): Promise<Car> => {
    const response = await apiClient.patch(`/api/cars/${id}`, car);
    return response.data;
  },
  
  // Delete a car
  deleteCar: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/cars/${id}`);
  },
  
  // Reset the database to initial state
  resetDatabase: async (): Promise<void> => {
    await apiClient.post('/api/cars/reset');
  },
};
