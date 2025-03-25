import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type Order = {
  id: number;
  date: string;
  total: number;
  status: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
};

// Mock order data for display
const mockOrders: Order[] = [
  {
    id: 1,
    date: "2023-03-15",
    total: 24.98,
    status: "Delivered",
    items: [
      { name: "Vanilla Cloud", quantity: 2, price: 7.99 },
      { name: "Chocolate Nimbus", quantity: 1, price: 8.99 }
    ]
  },
  {
    id: 2,
    date: "2023-03-01",
    total: 15.99,
    status: "Delivered",
    items: [
      { name: "Strawberry Cirrus", quantity: 1, price: 7.99 },
      { name: "Mango Cumulus", quantity: 1, price: 7.99 }
    ]
  }
];

export default function ProfilePage() {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "555-123-4567",
    address: "123 Cloud Ave, Sky City, SC 45678"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(formData);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">My Profile</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <div className="overflow-x-auto pb-2 -mx-4 px-4">
          <TabsList className="inline-flex min-w-full md:grid md:grid-cols-5 gap-2">
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
            <TabsTrigger value="addresses" className="flex-1">Addresses</TabsTrigger>
            <TabsTrigger value="payment" className="flex-1">Payment</TabsTrigger>
            <TabsTrigger value="preferences" className="flex-1">Preferences</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      type="button" 
                      onClick={() => {
                        setFormData(userProfile);
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                      <p className="text-base">{userProfile.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                      <p className="text-base">{userProfile.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                      <p className="text-base">{userProfile.phone}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                      <p className="text-base">{userProfile.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mockOrders.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                        </div>
                        <div className="mt-2 md:mt-0 flex flex-wrap items-center gap-2 md:gap-3">
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {order.status}
                          </span>
                          <span className="font-medium">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-2">Items</h4>
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between py-1 text-sm">
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Addresses</CardTitle>
              <CardDescription>
                Manage your delivery addresses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4 relative">
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
                  </div>
                  <h3 className="font-medium">Home</h3>
                  <p className="text-sm text-muted-foreground mt-1">123 Cloud Ave, Sky City, SC 45678</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-muted-foreground">Remove</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium">Work</h3>
                  <p className="text-sm text-muted-foreground mt-1">456 Office Tower, Suite 789, Sky City, SC 45680</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-muted-foreground">Remove</Button>
                    <Button variant="outline" size="sm" className="text-primary">Set as Default</Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Add New Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md p-4 relative bg-gradient-to-r from-primary/5 to-primary/10">
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-indigo-600 rounded-md flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Visa ending in 4242</h3>
                      <p className="text-xs text-muted-foreground mt-1">Expires 05/2025</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-muted-foreground">Remove</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 relative">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-amber-600 rounded-md flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Mastercard ending in 8353</h3>
                      <p className="text-xs text-muted-foreground mt-1">Expires 12/2026</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-muted-foreground">Remove</Button>
                    <Button variant="outline" size="sm" className="text-primary">Set as Default</Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your account preferences and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive order updates and promotions via email</p>
                      </div>
                      <Button variant="outline" size="sm" className="self-start sm:self-center">
                        Enabled
                      </Button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive order updates via text message</p>
                      </div>
                      <Button variant="outline" size="sm" className="self-start sm:self-center">
                        Disabled
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Account Settings</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}