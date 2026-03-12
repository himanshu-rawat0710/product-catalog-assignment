// src/store/slices/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, StockStatus } from "@/types/product";

interface SavedFilter extends FilterState {
  id: string;
  name: string;
}

interface FilterSliceState extends FilterState {
  savedFilters: SavedFilter[];
  sortBy: string;
}

const initialState: FilterSliceState = {
  search: "",
  category: "all",
  minPrice: "",
  maxPrice: "",
  minRating: 0,
  stockStatus: "all",
  sortBy: "price-low-to-high",
  savedFilters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number | ""; max: number | "" }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.minRating = action.payload;
    },
    setStockStatus: (state, action: PayloadAction<StockStatus>) => {
      state.stockStatus = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      return { ...initialState, savedFilters: state.savedFilters };
    },

    saveCurrentFilter: (state, action: PayloadAction<string>) => {
      const newFilter: SavedFilter = {
        id: crypto.randomUUID(),
        name: action.payload,
        search: state.search,
        category: state.category,
        minPrice: state.minPrice,
        maxPrice: state.maxPrice,
        minRating: state.minRating,
        stockStatus: state.stockStatus,
      };
      state.savedFilters.push(newFilter);
    },
    applySavedFilter: (state, action: PayloadAction<SavedFilter>) => {
      return {
        ...state,
        ...action.payload,
        savedFilters: state.savedFilters, // Keep the list of saved filters
      };
    },
  },
});

export const { 
  setSearch, setCategory, setPriceRange, 
  setRating, setStockStatus, setSortBy, 
  resetFilters, saveCurrentFilter, applySavedFilter 
} = filterSlice.actions;

export default filterSlice.reducer;