
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  UtensilsCrossed, 
  ShoppingCart, 
  CreditCard, 
  LogOut,
  User,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (!user) return null;

  return (
    <nav className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-2xl border-b border-white/20">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl animate-pulse">
              <div className="relative">
                <UtensilsCrossed className="h-6 w-6 floating-animation" />
                <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-spin" />
              </div>
              <span className="gradient-text bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                FoodieOrder
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <Link
                to="/restaurants"
                className="group flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <Home className="h-4 w-4 group-hover:animate-bounce" />
                <span>Restaurants</span>
              </Link>
              
              <Link
                to="/orders"
                className="group flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4 group-hover:animate-bounce" />
                <span>Orders</span>
              </Link>
              
              {user.role === 'admin' && (
                <Link
                  to="/payment-methods"
                  className="group flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <CreditCard className="h-4 w-4 group-hover:animate-bounce" />
                  <span>Payment Methods</span>
                </Link>
              )}
            </div>
          </div>
          
          {/* Desktop User Info and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-white/90 glass-effect px-3 py-2 rounded-full">
              <User className="h-4 w-4 animate-pulse" />
              <span>{user.name}</span>
              <span className="px-2 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full text-xs font-medium animate-fadeInUp">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span className="px-2 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full text-xs font-medium animate-fadeInUp">
                {user.country.charAt(0).toUpperCase() + user.country.slice(1)}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:scale-105 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 animate-spin" />
              ) : (
                <Menu className="h-6 w-6 animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slideInLeft">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/20 glass-effect rounded-b-lg">
              {/* User Info */}
              <div className="flex items-center space-x-3 px-3 py-2 mb-4 animate-fadeInUp">
                <User className="h-5 w-5 text-white animate-pulse" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{user.name}</span>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full text-xs font-medium">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className="px-2 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full text-xs font-medium">
                      {user.country.charAt(0).toUpperCase() + user.country.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <Link
                to="/restaurants"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-white hover:text-white hover:bg-white/20 transition-all duration-300 animate-slideInLeft"
              >
                <Home className="h-5 w-5" />
                <span>Restaurants</span>
              </Link>
              
              <Link
                to="/orders"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-white hover:text-white hover:bg-white/20 transition-all duration-300 animate-slideInLeft"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Orders</span>
              </Link>
              
              {user.role === 'admin' && (
                <Link
                  to="/payment-methods"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-white hover:text-white hover:bg-white/20 transition-all duration-300 animate-slideInLeft"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all duration-300 mt-4 animate-bounceIn"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
