import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
  status: "available" | "unavailable";
  quantity: number;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (product.status === "available" && product.quantity > 0) {
      onAddToCart(product);
    }
  };

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <CardHeader className="p-0 relative">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-warm overflow-hidden">
          {product.image && !imageError ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-store-warm">
              <div className="text-center text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{product.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2">
          {product.status === "unavailable" && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
          {product.quantity <= 5 && product.quantity > 0 && (
            <Badge variant="secondary">Low Stock</Badge>
          )}
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart 
            className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>
      </CardHeader>

      <CardContent className="p-4">
        {/* Category */}
        {product.category && (
          <Badge variant="outline" className="mb-2 text-xs">
            {product.category}
          </Badge>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating!) 
                    ? 'text-store-yellow fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-store-orange">
              ₱{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              {product.quantity} in stock
            </span>
          </div>
          
          <Button
            variant="cart"
            size="sm"
            onClick={handleAddToCart}
            disabled={product.status === "unavailable" || product.quantity === 0}
            className="group"
          >
            <ShoppingCart className="w-4 h-4 mr-1 group-hover:animate-bounce" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;