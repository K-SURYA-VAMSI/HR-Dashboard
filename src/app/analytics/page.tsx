'use client';

import { useApp } from '@/context/AppContext';
import Card from '@/components/ui/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useBookmarks } from '@/hooks/useBookmarks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const { state } = useApp();
  const { bookmarks } = useBookmarks();

  // Calculate department-wise average ratings
  const departmentRatings = state.employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = { total: 0, count: 0 };
    }
    acc[employee.department].total += employee.performance;
    acc[employee.department].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const departmentData = {
    labels: Object.keys(departmentRatings),
    datasets: [
      {
        label: 'Average Rating',
        data: Object.values(departmentRatings).map(
          (dept) => dept.total / dept.count
        ),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      }],
  };

  // Generate mock bookmark trends data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse();

  const bookmarkTrendsData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Bookmarks Added',
        data: last7Days.map(() => Math.floor(Math.random() * 5)),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="text-lg font-medium text-gray-900">
            Department Performance
          </h3>
          <div className="mt-4 h-80">
            <Bar data={departmentData} options={chartOptions} />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-gray-900">
            Bookmark Trends
          </h3>
          <div className="mt-4 h-80">
            <Line data={bookmarkTrendsData} options={chartOptions} />
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-medium text-gray-900">Summary</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-800">Total Employees</p>
            <p className="mt-1 text-2xl font-semibold text-blue-900">
              {state.employees.length}
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-sm font-medium text-green-800">Bookmarked</p>
            <p className="mt-1 text-2xl font-semibold text-green-900">
              {bookmarks.length}
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-4">
            <p className="text-sm font-medium text-purple-800">
              Average Rating
            </p>
            <p className="mt-1 text-2xl font-semibold text-purple-900">
              {(
                state.employees.reduce((acc, emp) => acc + emp.performance, 0) /
                state.employees.length
              ).toFixed(1)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 