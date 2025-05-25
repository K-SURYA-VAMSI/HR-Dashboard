'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Rating from '@/components/ui/Rating';
import { Employee } from '@/types';

export default function Home() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = state.employees.filter((employee) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      employee.firstName.toLowerCase().includes(searchLower) ||
      employee.lastName.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower)
    );
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
          <input
            type="text"
            placeholder="Search employees..."
            className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
    </div>
  );
}
