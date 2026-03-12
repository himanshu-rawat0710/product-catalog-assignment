// src/store/slices/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { RootState } from "../store";

interface ProductState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    items: [],
    loading: false, // Default to false because server provides data
    error: null,
};

export const selectCategories = (state: RootState) => {
    const products = state.products.items;
    // Use Set to get unique values, then sort them alphabetically
    const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
    return ["all", ...uniqueCategories.sort()];
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // This is the "Hydration" action
        setInitialProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
            state.loading = false;
        },
    },
});

export const { setInitialProducts } = productSlice.actions;
export default productSlice.reducer;