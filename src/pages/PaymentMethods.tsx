
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreditCard, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'upi' | 'wallet';
  name: string;
  lastFour: string;
  expiryDate?: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit',
      name: 'Visa Credit Card',
      lastFour: '4532',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'upi',
      name: 'Google Pay',
      lastFour: '9876',
      isDefault: false
    }
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit' as const,
    name: '',
    lastFour: '',
    expiryDate: ''
  });

  const addPaymentMethod = () => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      ...newPaymentMethod,
      isDefault: paymentMethods.length === 0
    };
    
    setPaymentMethods(prev => [...prev, newMethod]);
    setNewPaymentMethod({ type: 'credit', name: '', lastFour: '', expiryDate: '' });
    setShowAddDialog(false);
    toast.success('Payment method added successfully!');
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    toast.success('Payment method removed successfully!');
  };

  const setAsDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    toast.success('Default payment method updated!');
  };

  const getPaymentIcon = (type: string) => {
    return <CreditCard className="h-5 w-5" />;
  };

  const getPaymentColor = (type: string) => {
    switch (type) {
      case 'credit': return 'bg-blue-100 text-blue-800';
      case 'debit': return 'bg-green-100 text-green-800';
      case 'upi': return 'bg-purple-100 text-purple-800';
      case 'wallet': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Methods</h1>
            <p className="text-gray-600">Manage your payment options for food orders</p>
          </div>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Payment Method</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Payment Type</Label>
                  <select 
                    id="type"
                    value={newPaymentMethod.type}
                    onChange={(e) => setNewPaymentMethod(prev => ({ 
                      ...prev, 
                      type: e.target.value as any 
                    }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="wallet">Digital Wallet</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newPaymentMethod.name}
                    onChange={(e) => setNewPaymentMethod(prev => ({ 
                      ...prev, 
                      name: e.target.value 
                    }))}
                    placeholder="e.g., Visa Credit Card"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastFour">Last Four Digits</Label>
                  <Input
                    id="lastFour"
                    value={newPaymentMethod.lastFour}
                    onChange={(e) => setNewPaymentMethod(prev => ({ 
                      ...prev, 
                      lastFour: e.target.value 
                    }))}
                    placeholder="1234"
                    maxLength={4}
                  />
                </div>
                
                {(newPaymentMethod.type === 'credit' || newPaymentMethod.type === 'debit') && (
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={newPaymentMethod.expiryDate}
                      onChange={(e) => setNewPaymentMethod(prev => ({ 
                        ...prev, 
                        expiryDate: e.target.value 
                      }))}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                )}
                
                <Button 
                  onClick={addPaymentMethod}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!newPaymentMethod.name || !newPaymentMethod.lastFour}
                >
                  Add Payment Method
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method) => (
            <Card key={method.id} className={method.isDefault ? 'ring-2 ring-orange-500' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getPaymentIcon(method.type)}
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(method.type)}`}>
                    {method.type.toUpperCase()}
                  </div>
                </div>
                <CardDescription>
                  **** **** **** {method.lastFour}
                  {method.expiryDate && ` • Expires ${method.expiryDate}`}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {method.isDefault ? (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                        Default
                      </span>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAsDefault(method.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => deletePaymentMethod(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {paymentMethods.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Methods</h3>
            <p className="text-gray-600 mb-4">Add a payment method to start ordering food</p>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Add Your First Payment Method
            </Button>
          </div>
        )}

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-amber-900 mb-2">Admin Access</h3>
          <p className="text-amber-700">
            As an Admin, you have full access to manage payment methods. This includes adding, 
            modifying, and removing payment options for the organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
