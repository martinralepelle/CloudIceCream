import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const registerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  discountEmails: z.boolean().default(false),
  termsAndConditions: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      discountEmails: true,
      termsAndConditions: false,
    },
  });

  function onSubmit(data: RegisterFormValues) {
    toast({
      title: "Account created",
      description: "Your account has been created successfully. You can now log in.",
    });
    
    // Redirect to login page (to be implemented)
    setTimeout(() => {
      setLocation("/profile");
    }, 1500);
  }

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hidden md:block relative">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-amber-100 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-primary/20 rounded-full opacity-60 blur-xl"></div>
            <div className="relative rounded-2xl overflow-hidden h-full">
              <img 
                src="https://images.unsplash.com/photo-1538489949601-cbebf62b8605?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Ice cream shop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">Join our Cloud Community</h2>
                <p className="text-lg mb-6">Experience premium ice cream delivered to your doorstep</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">15%</div>
                    <div className="text-sm">Welcome discount</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-3xl font-bold">24</div>
                    <div className="text-sm">Exclusive flavors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Card className="border-primary/10 shadow-lg">
              <CardHeader className="space-y-1">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-primary">Create Your Account</CardTitle>
                  <div className="h-10 w-10 bg-gradient-to-br from-primary to-amber-400 rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                </div>
                <CardDescription>
                  Join Clouds to unlock exclusive benefits and personalized offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="border-primary/20 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="john.doe@example.com" 
                              {...field} 
                              className="border-primary/20 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                {...field} 
                                className="border-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                {...field} 
                                className="border-primary/20 focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="555-123-4567" 
                              {...field} 
                              className="border-primary/20 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123 Cloud St, Sky City" 
                              {...field} 
                              className="border-primary/20 focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mt-6">
                      <h3 className="font-medium text-sm mb-3 text-primary">Your Benefits</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Exclusive access to limited edition flavors
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Priority delivery during peak hours
                        </li>
                        <li className="flex items-center text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Birthday surprise gift every year
                        </li>
                      </ul>
                    </div>
                    
                    <Separator className="my-6 bg-primary/10" />
                    
                    <FormField
                      control={form.control}
                      name="discountEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="text-amber-500 border-primary/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Email me about special discounts and new flavors
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="termsAndConditions"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="text-amber-500 border-primary/20 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the <Link href="/terms" className="text-primary underline">terms and conditions</Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600">
                      Create Account
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="text-sm text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}