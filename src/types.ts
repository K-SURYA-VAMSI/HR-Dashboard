export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  performance: number; // 1-5 rating
  address: {
    address: string;
    city: string;
    postalCode: string;
  };
  phone: string;
  bio: string;
  performanceHistory: PerformanceReview[];
  assignedProjects?: string[]; // Add assignedProjects property
}

export interface PerformanceReview {
  date: string;
  rating: number;
  feedback: string;
}

export interface Bookmark {
  id: number;
  employeeId: number;
  timestamp: string;
}

export interface FilterState {
  search: string;
  departments: string[];
  performance: number[];
} 