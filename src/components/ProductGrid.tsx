import { useState } from "react";
import ProductCard from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

// Sample product data - this will be replaced with real data from Supabase
const sampleProducts = [
  {
    id: 1,
    name: "Lucky Me! Instant Pancit Canton",
    price: 15.50,
    description: "Original flavor instant noodles - a Filipino favorite",
    category: "Snacks & Treats",
    status: "available" as const,
    quantity: 45,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Kopiko Coffee Candy",
    price: 8.00,
    description: "Rich coffee flavor hard candy",
    category: "Snacks & Treats", 
    status: "available" as const,
    quantity: 23,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Selecta Ice Cream",
    price: 120.00,
    description: "Premium local ice cream - assorted flavors",
    category: "Frozen Goods",
    status: "available" as const,
    quantity: 8,
    rating: 4.8,
  },
  {
    id: 4,
    name: "Colgate Toothpaste",
    price: 85.00,
    description: "Fresh mint toothpaste for daily oral care",
    category: "Personal Care",
    status: "available" as const,
    quantity: 15,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Joy Dishwashing Liquid",
    price: 25.00,
    description: "Lemon scented dishwashing soap",
    category: "Household Items",
    status: "unavailable" as const,
    quantity: 0,
    rating: 4.1,
  },
  {
    id: 6,
    name: "San Miguel Beer",
    price: 55.00,
    description: "Premium Filipino beer - ice cold",
    category: "Beverages",
    status: "available" as const,
    quantity: 32,
    rating: 4.6,
  },
];

const categories = [
  "All Categories",
  "Snacks & Treats", 
  "Beverages",
  "Personal Care",
  "Household Items", 
  "Frozen Goods",
  "Fresh Produce"
];

interface ProductGridProps {
  onAddToCart: (product: any) => void;
}

const ProductGrid = ({ onAddToCart }: ProductGridProps) => {
  const [products] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 bg-gradient-warm" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our wide selection of quality products from trusted brands and local favorites
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No products found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All Categories");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;