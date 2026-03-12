"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { filterSchema, type FilterFormValues } from "./filter-schema";
import {
    setCategory, setPriceRange, setRating,
    setStockStatus, resetFilters, saveCurrentFilter, applySavedFilter
} from "@/store/slices/filterSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { selectCategories } from "@/store/slices/productSlice";

export function FilterSidebar() {
    const categories = useSelector(selectCategories); // Get dynamic categories
    const [mounted, setMounted] = useState(false);
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);
    const [newFilterName, setNewFilterName] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FilterFormValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            search: filters.search,
            category: filters.category,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            minRating: filters.minRating.toString(),
            stockStatus: filters.stockStatus,
        },
    });

    const onSubmit = (data: FilterFormValues) => {
        dispatch(setCategory(data.category));
        dispatch(setPriceRange({ min: data.minPrice, max: data.maxPrice }));
        dispatch(setRating(Number(data.minRating)));
        dispatch(setStockStatus(data.stockStatus));
    };

    const handleSaveFilter = () => {
        if (!newFilterName.trim()) return;
        dispatch(saveCurrentFilter(newFilterName));
        setNewFilterName("");
    };

    if (!mounted) {
        return (
            <aside className="w-64 p-4 border-r h-screen bg-slate-50/50 animate-pulse shrink-0">
                <div className="h-8 w-32 bg-slate-200 rounded mb-8" />
                <div className="space-y-6">
                    <div className="h-24 bg-slate-100 rounded" />
                    <div className="h-24 bg-slate-100 rounded" />
                    <div className="h-24 bg-slate-100 rounded" />
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-64 p-4 border-r h-screen flex flex-col gap-6 bg-white shrink-0">
            <h2 className="text-xl font-bold tracking-tight">Filters</h2>

            <ScrollArea className="flex-1 -mr-4 pr-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Category Filter */}
                    <div className="space-y-2 w-full" >
                        <Label className="text-sm font-semibold">Category</Label>
                        <Select onValueChange={(v) => setValue("category", v)} value={watch("category")} >
                            <SelectTrigger aria-label="Select product category" className="w-full">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {/* Capitalize the first letter for the UI */}
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-2">
                        <Label aria-label="price-range" className="text-sm font-semibold">Price Range</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Min" {...register("minPrice", { valueAsNumber: true })} className="h-9" />
                            <Input type="number" placeholder="Max" {...register("maxPrice", { valueAsNumber: true })} className="h-9" />
                        </div>
                        {errors.maxPrice && <p className="text-[10px] font-medium text-destructive">{errors.maxPrice.message}</p>}
                    </div>

                    {/* ADDED: Rating Filter */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Minimum Rating</Label>
                        <Select onValueChange={(v) => setValue("minRating", v)} value={watch("minRating")}>
                            <SelectTrigger aria-label="Select minimum star rating" className="w-full">
                                <SelectValue placeholder="Select Rating" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Any Rating</SelectItem>
                                <SelectItem value="4">4+ Stars</SelectItem>
                                <SelectItem value="3">3+ Stars</SelectItem>
                                <SelectItem value="2">2+ Stars</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Stock Status */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold">Stock Status</Label>
                        <RadioGroup onValueChange={(v: any) => setValue("stockStatus", v)} value={watch("stockStatus")} className="flex flex-col gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all" />
                                <Label htmlFor="all" className="text-sm font-normal">All Products</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="in-stock" id="in-stock" />
                                <Label htmlFor="in-stock" className="text-sm font-normal">In Stock</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700">Apply</Button>
                        <Button type="button" variant="outline" onClick={() => { reset(); dispatch(resetFilters()); }}>
                            Clear
                        </Button>
                    </div>
                </form>

                <Separator className="my-6" />

                {/* Save Configuration UI */}
                <div className="space-y-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                    <Label className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Save Current View</Label>
                    <Input
                        placeholder="e.g. 4 Star Groceries"
                        value={newFilterName}
                        onChange={(e) => setNewFilterName(e.target.value)}
                        className="h-8 text-sm bg-white border-indigo-100"
                    />
                    <Button
                        onClick={handleSaveFilter}
                        disabled={!newFilterName.trim()}
                        className="w-full h-8 text-xs bg-indigo-600 hover:bg-indigo-700"
                    >
                        💾 Save Configuration
                    </Button>
                </div>

                {/* Saved Presets List */}
                <div className="mt-6 space-y-3">
                    <h3 className="text-sm font-bold flex items-center gap-2">📌 Saved Presets</h3>
                    <div className="flex flex-col gap-1">
                        {filters.savedFilters.length === 0 ? (
                            <p className="text-xs text-muted-foreground italic px-2">No presets saved yet.</p>
                        ) : (
                            filters.savedFilters.map((sf) => (
                                <Button
                                    key={sf.id}
                                    variant="ghost"
                                    className="w-full justify-start text-xs h-9 px-3 hover:bg-indigo-50 hover:text-indigo-700 font-medium"
                                    onClick={() => {
                                        dispatch(applySavedFilter(sf));
                                        reset({
                                            search: sf.search,
                                            category: sf.category,
                                            minPrice: sf.minPrice,
                                            maxPrice: sf.maxPrice,
                                            minRating: sf.minRating.toString(),
                                            stockStatus: sf.stockStatus,
                                        });
                                    }}
                                >
                                    <span className="truncate">{sf.name}</span>
                                </Button>
                            ))
                        )}
                    </div>
                </div>
            </ScrollArea>
        </aside>
    );
}