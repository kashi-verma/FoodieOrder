//Hambuger added
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
  X
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
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-orange-600 font-bold text-xl">
              <UtensilsCrossed className="h-6 w-6" />
              <span>FoodieOrder</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              <Link
                to="/restaurants"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Restaurants</span>
              </Link>
              
              <Link
                to="/orders"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Orders</span>
              </Link>
              
              {user.role === 'admin' && (
                <Link
                  to="/payment-methods"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Payment Methods</span>
                </Link>
              )}
            </div>
          </div>
          
          {/* Desktop User Info and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {user.country.charAt(0).toUpperCase() + user.country.slice(1)}
              </span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              {/* User Info */}
              <div className="flex items-center space-x-3 px-3 py-2 mb-4">
                <User className="h-5 w-5 text-gray-600" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  <div className="flex space-x-2 mt-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {user.country.charAt(0).toUpperCase() + user.country.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <Link
                to="/restaurants"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Restaurants</span>
              </Link>
              
              <Link
                to="/orders"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Orders</span>
              </Link>
              
              {user.role === 'admin' && (
                <Link
                  to="/payment-methods"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors mt-4"
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
