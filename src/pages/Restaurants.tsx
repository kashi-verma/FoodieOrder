
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
      },
      { 
        id: '5', 
        name: 'Masala Dosa', 
        price: 149, 
        description: 'Crispy rice crepe filled with spiced potato filling', 
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop', 
        category: 'Breakfast' 
      },
      { 
        id: '6', 
        name: 'Tandoori Roti', 
        price: 49, 
        description: 'Traditional clay oven baked Indian bread', 
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop', 
        category: 'Bread' 
      }
    ]
  },
  {
    id: '2',
    name: 'Mumbai Street Kitchen',
    cuisine: 'Street Food',
    rating: 4.3,
    deliveryTime: '20-30 min',
    country: 'india',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop',
    menu: [
      { 
        id: '7', 
        name: 'Vada Pav', 
        price: 89, 
        description: 'Mumbai\'s iconic street food - spiced potato fritter in bread', 
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop', 
        category: 'Street Food' 
      },
      { 
        id: '8', 
        name: 'Pav Bhaji', 
        price: 129, 
        description: 'Spiced vegetable curry served with buttered bread rolls', 
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=300&h=200&fit=crop', 
        category: 'Street Food' 
      },
      { 
        id: '9', 
        name: 'Bhel Puri', 
        price: 79, 
        description: 'Crispy puffed rice mixed with tangy chutneys and vegetables', 
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop', 
        category: 'Snacks' 
      },
      { 
        id: '10', 
        name: 'Dosa', 
        price: 99, 
        description: 'Crispy South Indian crepe served with coconut chutney', 
        image: 'https://images.unsplash.com/photo-1694672023072-7c2e3b6b3b5c?w=300&h=200&fit=crop', 
        category: 'South Indian' 
      }
    ]
  },
  {
    id: '3',
    name: 'American Diner',
    cuisine: 'American',
    rating: 4.2,
    deliveryTime: '25-35 min',
    country: 'america',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    menu: [
      { 
        id: '11', 
        name: 'Classic Burger', 
        price: 12.99, 
        description: 'Beef patty with lettuce, tomato, cheese and special sauce', 
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop', 
        category: 'Main Course' 
      },
      { 
        id: '12', 
        name: 'Caesar Salad', 
        price: 8.99, 
        description: 'Fresh romaine lettuce with caesar dressing and croutons', 
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop', 
        category: 'Salads' 
      },
      { 
        id: '13', 
        name: 'Buffalo Wings', 
        price: 10.99, 
        description: 'Spicy chicken wings served with ranch dipping sauce', 
        image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=300&h=200&fit=crop', 
        category: 'Appetizer' 
      },
      { 
        id: '14', 
        name: 'Pepperoni Pizza', 
        price: 14.99, 
        description: 'Classic pizza with pepperoni and mozzarella cheese', 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop', 
        category: 'Main Course' 
      },
      { 
        id: '15', 
        name: 'Mac and Cheese', 
        price: 9.99, 
        description: 'Creamy macaroni pasta with melted cheese', 
        image: 'https://images.unsplash.com/photo-1543826173-ceeb3139f4ed?w=300&h=200&fit=crop', 
        category: 'Main Course' 
      },
      { 
        id: '16', 
        name: 'French Fries', 
        price: 4.99, 
        description: 'Golden crispy potato fries with sea salt', 
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=300&h=200&fit=crop', 
        category: 'Sides' 
      }
    ]
  },
  {
    id: '4',
    name: 'Brooklyn Steakhouse',
    cuisine: 'Steakhouse',
    rating: 4.7,
    deliveryTime: '35-50 min',
    country: 'america',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
    menu: [
      { 
        id: '17', 
        name: 'Ribeye Steak', 
        price: 28.99, 
        description: 'Premium ribeye steak grilled to perfection', 
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop', 
        category: 'Steaks' 
      },
      { 
        id: '18', 
        name: 'Grilled Salmon', 
        price: 22.99, 
        description: 'Fresh Atlantic salmon with herbs and lemon', 
        image: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?w=300&h=200&fit=crop', 
        category: 'Seafood' 
      },
      { 
        id: '19', 
        name: 'Lobster Tail', 
        price: 34.99, 
        description: 'Butter-poached lobster tail with garlic butter', 
        image: 'https://images.unsplash.com/photo-1559737558-2d0d8ddf8e7b?w=300&h=200&fit=crop', 
        category: 'Seafood' 
      },
      { 
        id: '20', 
        name: 'Mashed Potatoes', 
        price: 6.99, 
        description: 'Creamy garlic mashed potatoes with butter', 
        image: 'https://images.unsplash.com/photo-1630939071656-58b6a2a7b6b0?w=300&h=200&fit=crop', 
        category: 'Sides' 
      }
    ]
  },
  {
    id: '5',
    name: 'Coastal Seafood',
    cuisine: 'Seafood',
    rating: 4.4,
    deliveryTime: '30-40 min',
    country: 'america',
    image: 'https://images.unsplash.com/photo-1544124979-7516b7d609b1?w=400&h=300&fit=crop',
    menu: [
      { 
        id: '21', 
        name: 'Fish Tacos', 
        price: 13.99, 
        description: 'Fresh fish tacos with cabbage slaw and lime crema', 
        image: 'https://images.unsplash.com/photo-1611250282120-f011b9b26d52?w=300&h=200&fit=crop', 
        category: 'Mexican' 
      },
      { 
        id: '22', 
        name: 'Shrimp Scampi', 
        price: 18.99, 
        description: 'Garlic butter shrimp over linguine pasta', 
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop', 
        category: 'Pasta' 
      },
      { 
        id: '23', 
        name: 'Clam Chowder', 
        price: 8.99, 
        description: 'Creamy New England style clam chowder', 
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop', 
        category: 'Soup' 
      }
    ]
  },
  {
    id: '6',
    name: 'Royal Mughal',
    cuisine: 'Mughlai',
    rating: 4.6,
    deliveryTime: '40-55 min',
    country: 'india',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop',
    menu: [
      { 
        id: '24', 
        name: 'Mutton Biryani', 
        price: 399, 
        description: 'Fragrant basmati rice layered with tender mutton pieces', 
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop', 
        category: 'Biryani' 
      },
      { 
        id: '25', 
        name: 'Seekh Kebab', 
        price: 299, 
        description: 'Minced meat skewers grilled in tandoor', 
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop', 
        category: 'Kebabs' 
      },
      { 
        id: '26', 
        name: 'Hyderabadi Haleem', 
        price: 249, 
        description: 'Slow-cooked lentil and meat stew', 
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop', 
        category: 'Traditional' 
      },
      { 
        id: '27', 
        name: 'Naan', 
        price: 59, 
        description: 'Soft leavened bread baked in tandoor', 
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop', 
        category: 'Bread' 
      }
    ]
  }
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
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Restaurants in {user?.country?.charAt(0).toUpperCase()}{user?.country?.slice(1)}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Discover amazing food from local restaurants</p>
        </div>

        {!selectedRestaurant ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-36 sm:h-48 object-cover rounded-lg mb-3 sm:mb-4"
                  />
                  <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                    {restaurant.name}
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                      <span className="text-xs sm:text-sm">{restaurant.rating}</span>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">{restaurant.cuisine}</Badge>
                      <span className="text-xs sm:text-sm text-gray-500">{restaurant.deliveryTime}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-sm sm:text-base"
                  >
                    View Menu
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedRestaurant(null)}
                className="self-start text-sm sm:text-base"
              >
                ← Back to Restaurants
              </Button>
              
              {getTotalItems() > 0 && (
                <div className="flex items-center space-x-2 sm:space-x-4 bg-orange-100 px-3 sm:px-4 py-2 rounded-lg">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  <span className="font-medium text-sm sm:text-base">{getTotalItems()} items</span>
                  <span className="font-bold text-sm sm:text-base">
                    {user?.country === 'india' ? '₹' : '$'}{getTotalPrice().toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">{selectedRestaurant.name}</h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-600">
                <Badge variant="secondary" className="text-xs">{selectedRestaurant.cuisine}</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                  <span className="text-xs sm:text-sm">{selectedRestaurant.rating}</span>
                </div>
                <span className="text-xs sm:text-sm">{selectedRestaurant.deliveryTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {selectedRestaurant.menu.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-24 sm:h-32 object-cover rounded-lg mb-2"
                    />
                    <CardTitle className="text-base sm:text-lg">{item.name}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-lg sm:text-xl font-bold text-orange-600">
                        {user?.country === 'india' ? '₹' : '$'}{item.price}
                      </span>
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {cart[item.id] ? (
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="font-medium text-sm sm:text-base min-w-[20px] text-center">{cart[item.id]}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => addToCart(item.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => addToCart(item.id)}
                          className="bg-orange-600 hover:bg-orange-700 text-xs sm:text-sm"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
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
