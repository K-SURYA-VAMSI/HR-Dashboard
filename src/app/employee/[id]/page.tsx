'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Rating from '@/components/ui/Rating';
import Badge from '@/components/ui/Badge';
import React from 'react';
import { useParams } from 'next/navigation';
import { useBookmarks } from '@/hooks/useBookmarks';
import FeedbackForm from '@/components/FeedbackForm';

interface Tab {
  id: string;
  label: string;
}

interface PerformanceReview {
  date: string;
  rating: number;
  feedback: string;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'feedback', label: 'Feedback' },
];

export default function EmployeePage() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const [activeTab, setActiveTab] = useState('overview');

  console.log('Employee details page: id from URL:', id);
  console.log('Employee details page: all employees:', state.employees);

  const employee = state.employees.find((emp) => emp.id.toString() === id?.toString());

  if (state.loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">Employee not found</div>
          </div>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee.id);
    }
  };

  const handlePromote = () => {
    // In a real application, this would trigger a promotion workflow
    alert(`Promotion workflow initiated for ${employee.firstName} ${employee.lastName}`);
  };

  const handleFeedbackSubmit = (newFeedback: PerformanceReview) => {
    dispatch({
      type: 'UPDATE_EMPLOYEE',
      payload: {
        id: employee.id,
        updates: {
          performanceHistory: [...employee.performanceHistory, newFeedback],
        },
      },
    });
  };

  // Determine badge variant based on performance rating
  const getPerformanceBadgeVariant = (rating: number) => {
    if (rating >= 4) return 'success';
    if (rating >= 3) return 'info';
    if (rating >= 2) return 'warning';
    return 'danger';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {employee.firstName} {employee.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-sm text-gray-900">{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="mt-1 text-sm text-gray-900">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Age</p>
                  <p className="mt-1 text-sm text-gray-900">{employee.age}</p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-gray-900">Address</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-900">{employee.address.address}</p>
                <p className="text-sm text-gray-900">
                  {employee.address.city}, {employee.address.postalCode}
                </p>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-gray-900">Bio</h3>
              <p className="mt-4 text-sm text-gray-900">{employee.bio}</p>
            </Card>
          </div>
        );

      case 'projects':
        return (
          <Card>
            <h3 className="text-lg font-medium text-gray-900">Current Projects</h3>
            <div className="mt-4 space-y-4">
              {['Project A', 'Project B', 'Project C'].map((project, index) => (
                <div key={index} className="rounded-lg border border-gray-200 p-4">
                  <h4 className="font-medium text-gray-900">{project}</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Project description and details would go here.
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      In Progress
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );

      case 'feedback':
        return (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-medium text-gray-900">Performance History</h3>
              <div className="mt-4 space-y-4">
                {employee.performanceHistory.map((review: PerformanceReview, index: number) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                      <Rating value={review.rating} size="sm" />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{review.feedback}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="text-lg font-medium text-gray-900">Add New Feedback</h3>
              <div className="mt-4">
                <FeedbackForm employeeId={employee.id} onSubmit={handleFeedbackSubmit} />
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {employee.firstName} {employee.lastName}
          </h2>
          <p className="mt-1 text-sm text-gray-500">{employee.department}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Rating value={employee.performance} size="lg" />
          <Badge variant={getPerformanceBadgeVariant(employee.performance)}>
            {employee.performance}/5
          </Badge>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium
                ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={isBookmarked(employee.id) ? "secondary" : "outline"}
          onClick={handleBookmark}
        >
          {isBookmarked(employee.id) ? "Bookmarked" : "Bookmark"}
        </Button>
        <Button
          variant="primary"
          onClick={handlePromote}
        >
          Promote
        </Button>
      </div>

      {renderTabContent()}
    </div>
  );
} 