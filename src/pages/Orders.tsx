import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, DollarSign, X, CreditCard, Sparkles, CheckCircle, Truck } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  restaurantName: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    restaurantName: 'Spice Palace',
    items: [
      { name: 'Butter Chicken', quantity: 2, price: 299 },
      { name: 'Biryani', quantity: 1, price: 199 }
    ],
    total: 797,
    status: 'preparing',
    createdAt: '2024-01-15T10:30:00Z',
    estimatedDelivery: '45 minutes'
  },
  {
    id: '2',
    restaurantName: 'American Diner',
    items: [
      { name: 'Classic Burger', quantity: 1, price: 12.99 },
      { name: 'Caesar Salad', quantity: 1, price: 8.99 }
    ],
    total: 21.98,
    status: 'delivered',
    createdAt: '2024-01-14T18:15:00Z',
    estimatedDelivery: 'Delivered'
  },
  {
    id: '3',
    restaurantName: 'Mumbai Street Kitchen',
    items: [
      { name: 'Vada Pav', quantity: 3, price: 89 },
      { name: 'Pav Bhaji', quantity: 1, price: 129 }
    ],
    total: 396,
    status: 'confirmed',
    createdAt: '2024-01-16T14:20:00Z',
    estimatedDelivery: '25 minutes'
  }
];

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

  const canCancelOrder = (order: Order) => {
    return (user?.role === 'admin' || user?.role === 'manager') && 
           (order.status === 'pending' || order.status === 'confirmed');
  };

  const canCheckout = () => {
    return user?.role === 'admin' || user?.role === 'manager';
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' as const } : order
    ));
    toast.success('Order cancelled successfully! 🚫', {
      style: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: 'white',
        border: 'none'
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'confirmed': return 'bg-gradient-to-r from-blue-400 to-blue-600 text-white';
      case 'preparing': return 'bg-gradient-to-r from-orange-400 to-red-500 text-white';
      case 'delivered': return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
      case 'cancelled': return 'bg-gradient-to-r from-red-400 to-red-600 text-white';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3 animate-spin" />;
      case 'confirmed': return <CheckCircle className="h-3 w-3 animate-pulse" />;
      case 'preparing': return <Sparkles className="h-3 w-3 animate-bounce" />;
      case 'delivered': return <Truck className="h-3 w-3" />;
      case 'cancelled': return <X className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const handleCheckout = () => {
    toast.success('Payment processed successfully! 🎉', {
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        border: 'none'
      }
    });
    setShowCheckoutDialog(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-4 sm:py-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="text-center sm:text-left animate-fadeInUp">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 gradient-text">My Orders</h1>
            <p className="text-white/80 text-sm sm:text-base">Track and manage your food orders ✨</p>
          </div>
          
          {canCheckout() && (
            <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-sm sm:text-base transition-all duration-300 hover:scale-105 neon-glow animate-pulse">
                  <CreditCard className="h-4 w-4 mr-2" />
                  New Order Checkout
                </Button>
              </DialogTrigger>
              <DialogContent className="mx-4 max-w-md sm:max-w-lg glass-effect border-white/20">
                <DialogHeader>
                  <DialogTitle className="gradient-text">Checkout & Payment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="glass-effect p-4 rounded-lg border border-white/20">
                    <h3 className="font-medium mb-2 text-white">Order Summary</h3>
                    <p className="text-sm text-white/80">Sample order for demonstration</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-white">Total:</span>
                      <span className="font-bold gradient-text">
                        {user?.country === 'india' ? '₹' : '$'}299.00
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Process Payment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          {orders.map((order, index) => (
            <Card key={order.id} className="food-card animate-fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <span className="text-base sm:text-lg gradient-text">Order #{order.id}</span>
                      <Badge className={`${getStatusColor(order.status)} text-xs w-fit border-0 flex items-center gap-1`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600">
                      {order.restaurantName}
                    </CardDescription>
                  </div>
                  
                  <div className="flex flex-row sm:flex-col sm:text-right gap-3 sm:gap-1">
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-white/70 glass-effect px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 animate-pulse" />
                      <span>{order.estimatedDelivery}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-base sm:text-lg font-bold gradient-text">
                      <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{user?.country === 'india' ? '₹' : '$'}{order.total}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between text-xs sm:text-sm glass-effect p-2 rounded">
                      <span className="text-white">{item.name} x {item.quantity}</span>
                      <span className="font-bold text-yellow-300">
                        {user?.country === 'india' ? '₹' : '$'}{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm text-white/70">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  
                  {canCancelOrder(order) && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => cancelOrder(order.id)}
                      className="text-xs sm:text-sm self-start sm:self-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {user?.role === 'member' && (
          <div className="mt-6 sm:mt-8 glass-effect border border-blue-300/30 rounded-lg p-4 sm:p-6 text-center animate-bounceIn">
            <h3 className="text-base sm:text-lg font-medium gradient-text mb-2">Limited Access</h3>
            <p className="text-sm sm:text-base text-white/80">
              As a Member, you can view orders and add items to cart, but cannot checkout or cancel orders. 
              Please contact an Admin or Manager for assistance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
