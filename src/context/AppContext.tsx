'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Employee, Bookmark, FilterState } from '@/types';

interface AppState {
  employees: Employee[];
  bookmarks: Bookmark[];
  filters: FilterState;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'SET_EMPLOYEES'; payload: Employee[] }
  | { type: 'ADD_BOOKMARK'; payload: Bookmark }
  | { type: 'SET_BOOKMARKS'; payload: Bookmark[] }
  | { type: 'REMOVE_BOOKMARK'; payload: number }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  employees: [],
  bookmarks: [],
  filters: {
    search: '',
    departments: [],
    performance: [],
  },
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
    case 'ADD_BOOKMARK':
      if (state.bookmarks.some(b => b.employeeId === action.payload.employeeId)) {
        return state;
      }
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case 'SET_BOOKMARKS':
      return { ...state, bookmarks: action.payload };
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter((b) => b.id !== action.payload),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const LOCAL_STORAGE_KEY = 'hr-dashboard-bookmarks';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedBookmarks) {
      dispatch({ type: 'SET_BOOKMARKS', payload: JSON.parse(savedBookmarks) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.bookmarks));
  }, [state.bookmarks]);

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
        }));

        dispatch({ type: 'SET_EMPLOYEES', payload: employees });
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