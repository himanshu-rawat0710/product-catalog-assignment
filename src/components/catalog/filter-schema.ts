import * as z from "zod";

export const filterSchema = z.object({
  search: z.string().catch(""),
  category: z.string().catch("all"),
  minPrice: z.union([z.number(), z.literal("")]).catch(""),
  maxPrice: z.union([z.number(), z.literal("")]).catch(""),
  minRating: z.string().catch("0"),
  stockStatus: z.enum(["all", "in-stock", "out-of-stock"]).catch("all"),
}).refine((data) => {
  if (typeof data.minPrice === "number" && typeof data.maxPrice === "number") {
    return data.minPrice <= data.maxPrice;
  }
  return true;
}, {
  message: "Min price cannot exceed Max price",
  path: ["maxPrice"],
});

// We use z.infer but force it to be Required for the Form
export type FilterFormValues = Required<z.infer<typeof filterSchema>>;