import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed, Users, Globe, ShieldCheck } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <UtensilsCrossed className="h-16 w-16 text-orange-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">FoodieOrder</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive role-based food ordering platform with multi-country support
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
            <p className="text-gray-600">Different permissions for Admins, Managers, and Members</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-Country Support</h3>
            <p className="text-gray-600">Separate operations for India and America</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <ShieldCheck className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Protected routes and secure payment handling</p>
          </div>
        </div>

        <div className="text-center">
          {isAuthenticated ? (
            <Link to="/restaurants">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                Browse Restaurants
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                Get Started
              </Button>
            </Link>
          )}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Demo Credentials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-red-600">Admin</h3>
              <p className="text-sm text-gray-600 mb-2">admin@example.com</p>
              <p className="text-sm text-gray-600">admin123</p>
              <p className="text-xs text-gray-500 mt-2">Full access to all features</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-600">Manager</h3>
              <p className="text-sm text-gray-600 mb-2">manager.india@example.com</p>
              <p className="text-sm text-gray-600">manager123</p>
              <p className="text-xs text-gray-500 mt-2">Can checkout & pay</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-green-600">Member</h3>
              <p className="text-sm text-gray-600 mb-2">member.india@example.com</p>
              <p className="text-sm text-gray-600">member123</p>
              <p className="text-xs text-gray-500 mt-2">Can browse & add to cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
