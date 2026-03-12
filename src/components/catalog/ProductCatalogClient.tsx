"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Product } from "@/types/product";
import { setInitialProducts } from "@/store/slices/productSlice";
import { FilterSidebar } from "./FilterSidebar";
import { CatalogHeader } from "./CatalogHeader";
import { ProductGrid } from "./ProductGrid";

interface Props {
  initialData: Product[];
}

export default function ProductCatalogClient({ initialData }: Props) {
  const dispatch = useDispatch();
  const initialized = useRef(false);

  // Hydrate Redux store with server-side data once on mount
  if (!initialized.current) {
    dispatch(setInitialProducts(initialData));
    initialized.current = true;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Fixed Sidebar for Desktop */}
      <div className="hidden md:block">
        <FilterSidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <CatalogHeader />
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter View (Optional: You can add a Sheet/Drawer here) */}
            <ProductGrid />
          </div>
        </div>
      </main>
    </div>
  );
}