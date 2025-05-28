
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
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
    menu: [
      { 
        id: '1', 
        name: 'Butter Chicken', 
        price: 299, 
        description: 'Creamy tomato-based curry with tender chicken pieces', 
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=300&h=200&fit=crop', 
        category: 'Main Course' 
      },
      { 
        id: '2', 
        name: 'Chicken Biryani', 
        price: 199, 
        description: 'Aromatic basmati rice with spiced chicken and herbs', 
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop', 
        category: 'Main Course' 
      },
      { 
        id: '3', 
        name: 'Paneer Tikka', 
        price: 249, 
        description: 'Grilled cottage cheese marinated in spices', 
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop', 
        category: 'Appetizer' 
      },
      { 
        id: '4', 
        name: 'Dal Makhani', 
        price: 179, 
        description: 'Rich and creamy black lentils cooked with butter', 
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop', 
        category: 'Main Course' 
      }
    ]
  },
  {
    id: '2',
    name: 'American Diner',
    cuisine: 'American',
    rating: 4.2,
    deliveryTime: '25-35 min',
    country: 'america',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    menu: [
      { 
        id: '5', 
        name: 'Classic Burger', 
        price: 12.99, 
        description: 'Beef patty with lettuce, tomato, cheese and special sauce', 
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop', 
        category: 'Main Course' 
      },
      { 
        id: '6', 
        name: 'Caesar Salad', 
        price: 8.99, 
        description: 'Fresh romaine lettuce with caesar dressing and croutons', 
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop', 
        category: 'Salads' 
      },
      { 
        id: '7', 
        name: 'Buffalo Wings', 
        price: 10.99, 
        description: 'Spicy chicken wings served with ranch dipping sauce', 
        image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=300&h=200&fit=crop', 
        category: 'Appetizer' 
      },
      { 
        id: '8', 
        name: 'Pepperoni Pizza', 
        price: 14.99, 
        description: 'Classic pizza with pepperoni and mozzarella cheese', 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop', 
        category: 'Main Course' 
      }
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
