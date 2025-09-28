import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus, ShoppingBag, CreditCard, MapPin } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: (paymentMethod: string) => void;
}

const CartSidebar = ({ 
  open, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: CartSidebarProps) => {
  const [paymentMethod, setPaymentMethod] = useState("pickup");

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12; // 12% VAT
  const total = subtotal + tax;

  const handleCheckout = () => {
    onCheckout(paymentMethod);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Your cart is empty</p>
              <p className="text-sm">Add some products to get started!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-card rounded-lg">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-store-warm rounded-md flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    <p className="text-store-orange font-semibold">₱{item.price.toFixed(2)}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="px-3 py-1 bg-muted rounded text-sm font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Separator />

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h4 className="font-semibold">Payment Method</h4>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-store-green" />
                      <span>Pay on Pickup</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pay when you collect your order
                    </p>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-store-orange" />
                      <span>Pay Online</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Secure online payment via GCash, Card, or Bank Transfer
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (12%):</span>
                <span>₱{tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span className="text-store-orange">₱{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Button 
              variant="hero" 
              className="w-full" 
              size="lg"
              onClick={handleCheckout}
            >
              {paymentMethod === "pickup" ? "Place Order" : "Pay Now"} - ₱{total.toFixed(2)}
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;