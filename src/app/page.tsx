'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Rating from '@/components/ui/Rating';
import Modal from '@/components/ui/Modal';
import CreateUserForm from '@/components/CreateUserForm';
import { Employee } from '@/types';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { clsx } from 'clsx';

export default function Home() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  console.log('Dashboard page: employees:', state.employees);

  // Extract unique departments and performance ratings for filters
  const uniqueDepartments = Array.from(new Set(state.employees.map(emp => emp.department))).sort();
  const uniqueRatings = Array.from(new Set(state.employees.map(emp => emp.performance))).sort();

  const handleDepartmentFilter = (department: string) => {
    const currentDepartments = state.filters.departments;
    const newDepartments = currentDepartments.includes(department)
      ? currentDepartments.filter(d => d !== department)
      : [...currentDepartments, department];
    dispatch({ type: 'SET_FILTERS', payload: { departments: newDepartments } });
  };

  const handleRatingFilter = (rating: number) => {
    const currentRatings = state.filters.performance;
    const newRatings = currentRatings.includes(rating)
      ? currentRatings.filter(r => r !== rating)
      : [...currentRatings, rating];
    dispatch({ type: 'SET_FILTERS', payload: { performance: newRatings } });
  };

  const filteredEmployees = state.employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      employee.firstName.toLowerCase().includes(searchLower) ||
      employee.lastName.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower)
    );

    const matchesDepartment = state.filters.departments.length === 0 || state.filters.departments.includes(employee.department);
    const matchesRating = state.filters.performance.length === 0 || state.filters.performance.includes(employee.performance);

    return matchesSearch && matchesDepartment && matchesRating;
  });

  const handleBookmark = (employee: Employee) => {
    const bookmark = {
      id: Date.now(),
      employeeId: employee.id,
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_BOOKMARK', payload: bookmark });
  };

  const handlePromote = (employee: Employee) => {
    // In a real application, this would trigger a promotion workflow
    alert(`Promotion workflow initiated for ${employee.firstName} ${employee.lastName}`);
  };

  if (state.loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">{state.error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Employee Dashboard</h2>
        <div className="flex items-center space-x-4">
          <Button
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Add Employee
          </Button>
          <input
            type="text"
            placeholder="Search employees..."
            className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Department Filter */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Department
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {uniqueDepartments.map(department => (
                    <Menu.Item key={department}>
                      {({ active }) => (
                        <button
                          onClick={() => handleDepartmentFilter(department)}
                          className={clsx(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm w-full text-left'
                          )}>
                          {department}
                          {state.filters.departments.includes(department) && (
                            <span className="float-right text-blue-600">✓</span>
                          )}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Rating Filter */}
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                Rating
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {uniqueRatings.map(rating => (
                    <Menu.Item key={rating}>
                      {({ active }) => (
                        <button
                          onClick={() => handleRatingFilter(rating)}
                          className={clsx(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm w-full text-left'
                          )}>
                          {rating} Star{rating !== 1 && 's'}
                          {state.filters.performance.includes(rating) && (
                            <span className="float-right text-blue-600">✓</span>
                          )}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-500">{employee.email}</p>
              </div>
              <Rating value={employee.performance} size="sm" />
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Department:</span> {employee.department}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Age:</span> {employee.age}
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.location.href = `/employee/${employee.id}`}
              >
                View
              </Button>
              {
                state.bookmarks.some((bookmark) => bookmark.employeeId === employee.id) ? (
                  <Button variant="secondary" size="sm" disabled>
                    Bookmarked
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBookmark(employee)}
                  >
                    Bookmark
                  </Button>
                )
              }
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePromote(employee)}
              >
                Promote
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Employee"
      >
        <CreateUserForm onClose={() => setIsCreateModalOpen(false)} />
      </Modal>
    </div>
  );
}
