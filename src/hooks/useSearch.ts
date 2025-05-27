import { useState, useEffect } from 'react';
import { Employee, FilterState } from '@/types';

export function useSearch(employees: Employee[]) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    departments: [],
    performance: [],
  });

  const handleSearchTermChange = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleDepartmentFilterChange = (department: string) => {
    setFilters(prev => {
      const currentDepartments = prev.departments;
      const newDepartments = currentDepartments.includes(department)
        ? currentDepartments.filter(d => d !== department)
        : [...currentDepartments, department];
      return { ...prev, departments: newDepartments };
    });
  };

  const handleRatingFilterChange = (rating: number) => {
    setFilters(prev => {
      const currentRatings = prev.performance;
      const newRatings = currentRatings.includes(rating)
        ? currentRatings.filter(r => r !== rating)
        : [...currentRatings, rating];
      return { ...prev, performance: newRatings };
    });
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchLower = filters.search.toLowerCase();
    const matchesSearch = (
      employee.firstName.toLowerCase().includes(searchLower) ||
      employee.lastName.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower)
    );

    const matchesDepartment = filters.departments.length === 0 || filters.departments.includes(employee.department);
    const matchesRating = filters.performance.length === 0 || filters.performance.includes(employee.performance);

    return matchesSearch && matchesDepartment && matchesRating;
  });

  return {
    filters,
    filteredEmployees,
    handleSearchTermChange,
    handleDepartmentFilterChange,
    handleRatingFilterChange,
  };
} 