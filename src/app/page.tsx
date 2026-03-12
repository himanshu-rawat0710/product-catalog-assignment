// src/app/page.tsx
import { fetchProducts } from "@/services/productService";
import ProductCatalogClient from "@/components/catalog/ProductCatalogClient";

export default async function Page() {
  // Server-side fetch (Next.js handles this during SSR/SSG)
  const products = await fetchProducts();

  return (
    <div className="container mx-auto">
      <ProductCatalogClient initialData={products} />
    </div>
  );
}