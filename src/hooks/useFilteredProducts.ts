import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Product } from "@/types/product";

export const useFilteredProducts = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const filters = useSelector((state: RootState) => state.filters);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Global Search (Name or Description) [cite: 45]
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter [cite: 46]
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }

    // 3. Price Range [cite: 47]
    if (filters.minPrice !== "") {
      result = result.filter((p) => p.price >= (filters.minPrice as number));
    }
    if (filters.maxPrice !== "") {
      result = result.filter((p) => p.price <= (filters.maxPrice as number));
    }

    // 4. Minimum Rating [cite: 48]
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // 5. Stock Status [cite: 49]
    if (filters.stockStatus !== "all") {
      result = result.filter((p) => 
        filters.stockStatus === "in-stock" ? p.stock > 0 : p.stock === 0
      );
    }

    // 6. Sorting [cite: 60, 61, 62]
    result.sort((a, b) => {
      if (filters.sortBy === "price-low-to-high") return a.price - b.price;
      if (filters.sortBy === "price-high-to-low") return b.price - a.price;
      if (filters.sortBy === "rating-high-to-low") return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [products, filters]);

  return {
    filteredProducts: filteredAndSortedProducts,
    totalCount: products.length,
    visibleCount: filteredAndSortedProducts.length,
  };
};