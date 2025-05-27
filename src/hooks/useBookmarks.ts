import { useApp } from '@/context/AppContext';
import { useMemo } from 'react';

export function useBookmarks() {
  const { state, dispatch } = useApp();

  const addBookmark = (employeeId: number) => {
    // Prevent adding duplicates
    if (!state.bookmarks.some(b => b.employeeId === employeeId)) {
      const newBookmark = {
        id: Date.now(), // Simple unique ID for bookmark entry
        employeeId: employeeId,
        timestamp: new Date().toISOString(),
      };
      dispatch({ type: 'SET_BOOKMARKS', payload: [...state.bookmarks, newBookmark] });
    }
  };

  const removeBookmark = (employeeId: number) => {
    dispatch({
      type: 'SET_BOOKMARKS',
      payload: state.bookmarks.filter(bookmark => bookmark.employeeId !== employeeId),
    });
  };

  const isBookmarked = (employeeId: number): boolean => {
    return state.bookmarks.some(bookmark => bookmark.employeeId === employeeId);
  };

  // Function to get bookmarked employees from a full employee list (no longer needed here)
  // const getBookmarkedEmployees = (allEmployees: Employee[]): Employee[] => {
  //   const bookmarkedEmployeeIds = state.bookmarks.map(b => b.employeeId);
  //   return allEmployees.filter(employee => bookmarkedEmployeeIds.includes(employee.id));
  // };

  return {
    bookmarks: state.bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    // getBookmarkedEmployees, // No longer needed here
  };
} 