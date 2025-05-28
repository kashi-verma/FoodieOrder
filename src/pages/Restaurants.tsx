
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  country: 'india' | 'america';
  image: string;
  menu: MenuItem[];
}

const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Spice Palace',
    cuisine: 'Indian',
    rating: 4.5,
    deliveryTime: '30-45 min',
    country: 'india',
    image: '/placeholder.svg',
    menu: [
      { id: '1', name: 'Butter Chicken', price: 299, description: 'Creamy tomato-based curry', image: '/placeholder.svg', category: 'Main Course' },
      { id: '2', name: 'Biryani', price: 199, description: 'Aromatic rice with spices', image: '/placeholder.svg', category: 'Main Course' },
    ]
  },
  {
    id: '2',
    name: 'American Diner',
    cuisine: 'American',
    rating: 4.2,
    deliveryTime: '25-35 min',
    country: 'america',
    image: '/placeholder.svg',
    menu: [
      { id: '3', name: 'Classic Burger', price: 12.99, description: 'Beef patty with fresh toppings', image: '/placeholder.svg', category: 'Main Course' },
      { id: '4', name: 'Caesar Salad', price: 8.99, description: 'Fresh romaine with caesar dressing', image: '/placeholder.svg', category: 'Salads' },
    ]
  },
];

const Restaurants = () => {
  const { user } = useAuth();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const filteredRestaurants = mockRestaurants.filter(restaurant => 
    restaurant.country === user?.country
  );

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    toast.success('Item added to cart!');
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    if (!selectedRestaurant) return 0;
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = selectedRestaurant.menu.find(m => m.id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Restaurants in {user?.country?.charAt(0).toUpperCase()}{user?.country?.slice(1)}
          </h1>
          <p className="text-gray-600">Discover amazing food from local restaurants</p>
        </div>

        {!selectedRestaurant ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="flex items-center justify-between">
                    {restaurant.name}
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{restaurant.rating}</span>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{restaurant.cuisine}</Badge>
                      <span className="text-sm text-gray-500">{restaurant.deliveryTime}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    View Menu
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedRestaurant(null)}
              >
                ← Back to Restaurants
              </Button>
              
              {getTotalItems() > 0 && (
                <div className="flex items-center space-x-4 bg-orange-100 px-4 py-2 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-orange-600" />
                  <span className="font-medium">{getTotalItems()} items</span>
                  <span className="font-bold">
                    {user?.country === 'india' ? '₹' : '$'}{getTotalPrice().toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{selectedRestaurant.name}</h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <Badge variant="secondary">{selectedRestaurant.cuisine}</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{selectedRestaurant.rating}</span>
                </div>
                <span>{selectedRestaurant.deliveryTime}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedRestaurant.menu.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-orange-600">
                        {user?.country === 'india' ? '₹' : '$'}{item.price}
                      </span>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {cart[item.id] ? (
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium">{cart[item.id]}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => addToCart(item.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => addToCart(item.id)}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
