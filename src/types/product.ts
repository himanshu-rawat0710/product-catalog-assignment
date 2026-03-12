export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
      createdAt: string;
      updatedAt: string;
      barcode: string;
      qrCode: string;
    };
    images: string[];
    thumbnail: string;
  }
  
  // Response type for our local JSON structure
  export interface ProductResponse {
    products: Product[];
  }
  
  export type StockStatus = "all" | "in-stock" | "out-of-stock";
  
  export interface FilterState {
    search: string;
    category: string;
    minPrice: number | "";
    maxPrice: number | "";
    minRating: number;
    stockStatus: StockStatus;
  }