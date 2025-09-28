import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import LoginModal from "./LoginModal";

interface NavbarProps {
  cartItemCount?: number;
  onCartClick?: () => void;
}

const Navbar = ({ cartItemCount = 0, onCartClick }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Categories", href: "#categories" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                Sari-Sari Store
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="hero"
                onClick={() => setShowLoginModal(true)}
                className="hidden sm:block"
              >
                Shop Now
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onCartClick}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-store-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                variant="hero"
                onClick={() => {
                  setShowLoginModal(true);
                  setIsMenuOpen(false);
                }}
                className="w-full mt-4"
              >
                Shop Now
              </Button>
            </div>
          </div>
        )}
      </nav>

      <LoginModal 
        open={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        userType="customer"
      />
    </>
  );
};

export default Navbar;