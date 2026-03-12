"use client";

import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const { filteredProducts, visibleCount, totalCount } = useFilteredProducts();

  return (
    <div className="flex-1 space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{visibleCount}</span> of{" "}
          <span className="font-medium text-foreground">{totalCount}</span> products
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center border rounded-lg bg-muted/20">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}