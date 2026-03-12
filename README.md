# Advanced Product Catalog System (SDE-3 Assignment)

A high-performance, responsive product catalog built with **Next.js 15**, **Redux Toolkit**, and **Tailwind CSS**. This project demonstrates advanced state management, custom middleware persistence, and optimized filtering logic.

## 🚀 Live Demo
**Link:** [Insert your Vercel/Netlify URL here]

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **State Management:** Redux Toolkit (RTK)
- **Validation:** Zod + React Hook Form
- **UI Components:** Shadcn UI + Lucide Icons
- **Styling:** Tailwind CSS (OKLCH Color Space)
- **Deployment:** Vercel

## ✨ Key Engineering Features

### 1. High-Performance Filtering (Memoized)
Used a custom hook `useFilteredProducts` with `useMemo` to handle multi-criteria filtering (Category, Price, Rating, Stock) on the client side. This ensures O(1) reactive updates without unnecessary re-renders of the 194+ product list.

### 2. State Persistence & Hydration
- **Custom Middleware:** Implemented `persistenceMiddleware` to automatically sync "Saved Presets" to `localStorage` on specific action dispatches.
- **SSR-Safe Hydration:** Solved the "Hydration Mismatch" common in Next.js by using a `mounted` state guard and `preloadedState` in the Redux Store.

### 3. UX Optimizations
- **Search Debouncing:** Implemented a 300ms debounce on the global search bar to prevent layout thrashing and heavy computation during rapid typing.
- **Dynamic Categories:** Categories are derived dynamically from the data set, ensuring the UI stays in sync with the inventory without manual updates.
- **Skeleton Loaders:** Used Framer-motion inspired skeleton states for the sidebar to prevent Layout Shift (CLS) during hydration.

## 📦 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd product-catalog