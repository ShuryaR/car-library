export interface Car {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  carType: string; // 'automatic' or 'manual'
  tags: string[];
  specifications?: string[]; // Added specifications field
  createdAt: string;
}

export interface CarListItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  carType: string;
  createdAt?: string; // Make this optional since some list items might not have it
  tags?: string[]; // Make this optional as well
}

export interface SortOptions {
  sortBy: 'name' | 'createdAt';
  sortOrder: 'ASC' | 'DESC';
}

export interface FilterOptions {
  carType?: string;
  tags?: string[];
  search?: string;
}
