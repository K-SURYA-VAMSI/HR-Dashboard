'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Employee, Bookmark, FilterState } from '@/types';

interface AppState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_EMPLOYEES'; payload: Employee[] }
  | { type: 'ADD_EMPLOYEE'; payload: Employee }
  | { type: 'UPDATE_EMPLOYEE'; payload: { id: number; updates: Partial<Employee> } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ASSIGN_PROJECT'; payload: { id: number; project: string } };

const initialState: AppState = {
  employees: [],
  loading: false,
  error: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return { ...state, employees: action.payload };
    case 'ADD_EMPLOYEE':
      return { ...state, employees: [...state.employees, action.payload] };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id
            ? { ...employee, ...action.payload.updates }
            : employee
        ),
      };
    case 'ASSIGN_PROJECT':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id
            ? {
                ...employee,
                assignedProjects: [
                  ...(employee.assignedProjects || []),
                  action.payload.project
                ]
              }
            : employee
        ),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const CUSTOM_EMPLOYEES_KEY = 'hr-dashboard-custom-employees';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load employees from API and merge with custom employees from localStorage
  useEffect(() => {
    async function fetchEmployees() {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20');
        const data = await response.json();
        const employees: Employee[] = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][Math.floor(Math.random() * 5)],
          performance: Math.floor(Math.random() * 5) + 1,
          address: {
            address: user.address.address,
            city: user.address.city,
            postalCode: user.address.postalCode,
          },
          phone: user.phone,
          bio: `${user.firstName} is a dedicated team member with ${Math.floor(Math.random() * 10) + 1} years of experience.`,
          performanceHistory: Array.from({ length: 3 }, (_, i) => ({
            date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
            rating: Math.floor(Math.random() * 5) + 1,
            feedback: `Performance review for ${new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
          })),
          assignedProjects: [
            'Website Redesign',
            'Mobile App Development',
            'Database Migration'
          ].slice(0, Math.floor(Math.random() * 3) + 1), // Randomly assign 1-3 projects
        }));

        // Load custom employees from localStorage
        const customEmployeesRaw = localStorage.getItem(CUSTOM_EMPLOYEES_KEY);
        let customEmployees: Employee[] = [];
        if (customEmployeesRaw) {
          try {
            customEmployees = JSON.parse(customEmployeesRaw);
            console.log('Loaded custom employees from localStorage:', customEmployees);
          } catch (e) {
            console.error('Failed to parse custom employees from localStorage', e);
          }
        }

        // Merge API and custom employees
        const allEmployees = [...employees, ...customEmployees];
        console.log('All employees after merge:', allEmployees);
        dispatch({ type: 'SET_EMPLOYEES', payload: allEmployees });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch employees' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    fetchEmployees();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {console.log('AppProvider render: state:', state)}
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 