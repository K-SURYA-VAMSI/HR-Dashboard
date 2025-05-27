'use client';

import { useApp } from '@/context/AppContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Rating from '@/components/ui/Rating';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useMemo } from 'react';

export default function BookmarksPage() {
  const { state } = useApp();
  const { bookmarks, removeBookmark } = useBookmarks();

  const bookmarkedEmployees = useMemo(() => {
    const bookmarkedEmployeeIds = bookmarks.map(b => b.employeeId);
    return state.employees.filter(employee => bookmarkedEmployeeIds.includes(employee.id));
  }, [bookmarks, state.employees]);

  const handleRemoveBookmark = (employeeId: number) => {
    removeBookmark(employeeId);
  };

  const handlePromote = (employee: any) => {
    // In a real application, this would trigger a promotion workflow
    alert(`Promotion workflow initiated for ${employee.firstName} ${employee.lastName}`);
  };

  const handleAssignProject = (employee: any) => {
    // This is a UI action - in a real app, this would open a project assignment modal/page
    alert(`Assign Project UI action triggered for ${employee.firstName} ${employee.lastName}`);
  };

  if (bookmarkedEmployees.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">No Bookmarks</h2>
        <p className="mt-2 text-gray-500">You haven't bookmarked any employees yet.</p>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => window.location.href = '/'}
        >
          Browse Employees
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Bookmarked Employees</h2>
        <p className="text-sm text-gray-500">
          {bookmarkedEmployees.length} employee{bookmarkedEmployees.length !== 1 ? 's' : ''} bookmarked
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarkedEmployees.map((employee) => (
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveBookmark(employee.id)}
              >
                Remove
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handlePromote(employee)}
              >
                Promote
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAssignProject(employee)}
              >
                Assign to Project
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 