
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Clock, DollarSign, X, CreditCard } from 'lucide-react';
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
    toast.success('Order cancelled successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCheckout = () => {
    toast.success('Payment processed successfully!');
    setShowCheckoutDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your food orders</p>
          </div>
          
          {canCheckout() && (
            <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
              <DialogTrigger asChild>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <CreditCard className="h-4 w-4 mr-2" />
                  New Order Checkout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Checkout & Payment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <p className="text-sm text-gray-600">Sample order for demonstration</p>
                    <div className="flex justify-between mt-2">
                      <span>Total:</span>
                      <span className="font-bold">
                        {user?.country === 'india' ? '₹' : '$'}299.00
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Process Payment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>Order #{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{order.restaurantName}</CardDescription>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                      <Clock className="h-4 w-4" />
                      <span>{order.estimatedDelivery}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-lg font-bold text-orange-600">
                      <DollarSign className="h-4 w-4" />
                      <span>{user?.country === 'india' ? '₹' : '$'}{order.total}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{user?.country === 'india' ? '₹' : '$'}{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  
                  {canCancelOrder(order) && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => cancelOrder(order.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {user?.role === 'member' && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Limited Access</h3>
            <p className="text-blue-700">
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
