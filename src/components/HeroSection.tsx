import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onShopNowClick: () => void;
}

const HeroSection = ({ onShopNowClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Star className="w-8 h-8 text-store-yellow fill-current" />
      </div>
      <div className="absolute bottom-40 right-20 animate-bounce-gentle">
        <Star className="w-6 h-6 text-store-orange fill-current" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Your Neighborhood
          <span className="block bg-gradient-to-r from-store-orange to-store-yellow bg-clip-text text-transparent">
            Sari-Sari Store
          </span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl">Online</span>
        </h1>

        <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Fresh products, convenient shopping, and the warmth of your local sari-sari store - 
          now just a click away!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onShopNowClick}
            className="text-lg px-8 py-6 group"
          >
            Start Shopping
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
          >
            View Categories
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { title: "Fresh Products", desc: "Quality items daily" },
            { title: "Fast Service", desc: "Quick pickup & online pay" },
            { title: "Local Favorites", desc: "Traditional Filipino items" }
          ].map((feature, index) => (
            <div key={index} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;