import { useState, useEffect } from 'react';
import { Bookmark, Employee } from '@/types';

const LOCAL_STORAGE_KEY = 'hr-dashboard-bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks from localStorage', e);
      }
    }
  }, []);

  // Persist bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (employeeId: number) => {
    // Prevent adding duplicates
    if (!bookmarks.some(b => b.employeeId === employeeId)) {
      const newBookmark: Bookmark = {
        id: Date.now(), // Simple unique ID for bookmark entry
        employeeId: employeeId,
        timestamp: new Date().toISOString(),
      };
      setBookmarks(prev => [...prev, newBookmark]);
    }
  };

  const removeBookmark = (employeeId: number) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.employeeId !== employeeId));
  };

  const isBookmarked = (employeeId: number): boolean => {
    return bookmarks.some(bookmark => bookmark.employeeId === employeeId);
  };

  // Function to get bookmarked employees from a full employee list
  const getBookmarkedEmployees = (allEmployees: Employee[]): Employee[] => {
    const bookmarkedEmployeeIds = bookmarks.map(b => b.employeeId);
    return allEmployees.filter(employee => bookmarkedEmployeeIds.includes(employee.id));
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkedEmployees,
  };
} 