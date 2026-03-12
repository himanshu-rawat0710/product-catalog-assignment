import { Product } from "@/types/product";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-md pt-0">
            <CardHeader className="p-0 border-b relative aspect-square bg-muted">
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    // This tells the browser which size image to download based on the viewport
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform hover:scale-105"
                    // Add priority if it's one of the first 6 images to improve LCP
                    priority={product.id <= 6}
                />
                {product.stock < 10 && (
                    <Badge variant="destructive" className="absolute top-2 right-2">
                        Low Stock
                    </Badge>
                )}
            </CardHeader>
            <CardContent className="flex-1 p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                        {product.category}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {product.rating}
                    </div>
                </div>
                <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                </p>
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
                <span className="text-xl font-bold">${product.price}</span>
                <Badge variant={product.availabilityStatus === "In Stock" ? "secondary" : "outline"}>
                    {product.availabilityStatus}
                </Badge>
            </CardFooter>
        </Card>
    );
}