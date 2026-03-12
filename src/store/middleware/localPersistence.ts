
import { Middleware } from "@reduxjs/toolkit";

export const persistenceMiddleware: Middleware = (store) => (next) => (action) => {
  // 1. Pass the action to the reducer first so the state updates
  const result = next(action);
  
  const actionType = (action as any).type;

  // 2. Only run persistence logic for filter-related actions
  if (actionType && actionType.startsWith("filters/")) {
    const state = store.getState() as any; // Cast to any to bypass the circular RootState check
    
    // 3. Robust check: Ensure we only save if the array actually exists
    const savedFilters = state.filters?.savedFilters;
    
    if (Array.isArray(savedFilters)) {
       // Using a clear, unique key
      localStorage.setItem("prod_catalog_saved_filters", JSON.stringify(savedFilters));
    //   console.log("💾 Middleware: Persisted to localStorage", savedFilters);
    }
  }

  return result;
};