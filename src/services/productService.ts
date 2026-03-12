import productsData from "./products.json";
import { Product, ProductResponse } from "@/types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Simulate network latency (800ms - 1000ms is standard for a mock API)
    setTimeout(() => {
      const data = productsData as ProductResponse;
      resolve(data.products);
    }, 800);
  });
};