"use client";

import { useState, useEffect } from "react"; // Added useEffect and useState
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSearch, setSortBy } from "@/store/slices/filterSlice";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export function CatalogHeader() {
  const dispatch = useDispatch();
  const { search, sortBy } = useSelector((state: RootState) => state.filters);

  // 1. Local state for immediate input feedback
  const [localSearch, setLocalSearch] = useState(search);

  // 2. Sync local state if Redux changes (e.g., when clicking a "Saved Preset")
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // 3. Debounce Logic: Wait 300ms after last keystroke before updating Redux
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearch(localSearch));
    }, 300);

    // Cleanup the timer if the user types again before 300ms passes
    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-10 h-10 bg-white border-blue-950"
          // 4. Bind to localState for instant responsiveness
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Sort by:</span>
        <Select value={sortBy} onValueChange={(v) => dispatch(setSortBy(v))}>
          <SelectTrigger aria-label="Sort products by" className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
            <SelectItem value="rating-high-to-low">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}