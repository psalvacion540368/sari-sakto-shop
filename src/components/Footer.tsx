import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import LoginModal from "./LoginModal";

const Footer = () => {
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-b from-store-warm to-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Store Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                Sari-Sari Store
              </h3>
              <p className="text-muted-foreground">
                Your trusted neighborhood store, bringing fresh products and Filipino favorites 
                to your doorstep with modern convenience.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <div className="space-y-2">
                {["Home", "Categories", "About Us", "Contact", "FAQ", "Terms of Service"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Categories</h4>
              <div className="space-y-2">
                {["Snacks & Treats", "Beverages", "Personal Care", "Household Items", "Fresh Produce", "Filipino Specialties"].map((category) => (
                  <a
                    key={category}
                    href="#"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-store-orange mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    123 Barangay Street<br />
                    Quezon City, Metro Manila
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-store-orange flex-shrink-0" />
                  <span className="text-muted-foreground">+63 912 345 6789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-store-orange flex-shrink-0" />
                  <span className="text-muted-foreground">hello@sarisaristore.ph</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Login Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="text-center space-y-4">
              <h4 className="text-lg font-semibold">Access Your Account</h4>
              <p className="text-muted-foreground">
                Login to start shopping or access the admin dashboard
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  onClick={() => setShowUserLogin(true)}
                  className="px-8"
                >
                  Customer Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdminLogin(true)}
                  className="px-8"
                >
                  Admin Login
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Sari-Sari Store. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modals */}
      <LoginModal 
        open={showUserLogin} 
        onClose={() => setShowUserLogin(false)}
        userType="customer"
      />
      <LoginModal 
        open={showAdminLogin} 
        onClose={() => setShowAdminLogin(false)}
        userType="admin"
      />
    </>
  );
};

export default Footer;