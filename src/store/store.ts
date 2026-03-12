// src/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import filterReducer from "./slices/filterSlice";
import { persistenceMiddleware } from "./middleware/localPersistence";

// 1. Explicitly combine reducers first to create a stable RootReducer type
const rootReducer = combineReducers({
  products: productReducer,
  filters: filterReducer,
});

const loadPreloadedState = () => {
  if (typeof window === "undefined") return undefined;
  
  try {
    const serializedFilters = localStorage.getItem("prod_catalog_saved_filters");
    if (!serializedFilters) return undefined;
    
    const parsedFilters = JSON.parse(serializedFilters);
    
    // Return the partial state. We use "any" here because 
    // preloadedState only needs to satisfy a PART of the state.
    return {
      filters: {
        search: "",
        category: "all",
        minPrice: "",
        maxPrice: "",
        minRating: 0,
        stockStatus: "all",
        sortBy: "price-low-to-high",
        savedFilters: parsedFilters,
      },
    } as any; 
  } catch (e) {
    return undefined;
  }
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer, // Use the combined reducer here
    preloadedState: loadPreloadedState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Recommended when using preloadedState from localStorage
      }).concat(persistenceMiddleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// 2. Derive types from the rootReducer itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];