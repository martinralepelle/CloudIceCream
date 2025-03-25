import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "@/lib/cartStore";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import PaymentModal from "@/components/PaymentModal";

export default function Checkout() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Calculate order totals
  const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
  const delivery = cart.length > 0 ? 3.99 : 0;
  const total = parseFloat((subtotal + tax + delivery - discount).toFixed(2));

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (cart.length === 0) {
        throw new Error("Your cart is empty");
      }

      const response = await apiRequest("POST", "/api/orders", {
        subtotal,
        tax,
        delivery,
        total,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      });
      
      return response.json();
    },
    onSuccess: () => {
      // Order created successfully - payment will happen in the modal
    },
    onError: (error) => {
      toast({
        title: "Failed to place order",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
        duration: 5000,
      });
    }
  });

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    // Simple promo code logic for demo purposes
    if (promoCode.toLowerCase() === "welcome10") {
      const discountAmount = Math.round(subtotal * 0.1 * 100) / 100; // 10% discount
      setDiscount(discountAmount);
      toast({
        title: "Promo Code Applied",
        description: `You received a $${discountAmount.toFixed(2)} discount!`,
        duration: 3000,
      });
    } else {
      setDiscount(0);
      toast({
        title: "Invalid Promo Code",
        description: "Please enter a valid promo code",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleProceedToPayment = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }
    
    // Create the order first
    createOrderMutation.mutate();
    
    // Then open the payment modal
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // Clear the cart after successful payment
    clearCart();
  };

  return (
    <>
      <section className="py-10 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold font-poppins text-gray-800 mb-8">
            Your Cart
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                {cart.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <Link 
                      to="/"
                      className="text-primary hover:underline"
                    >
                      Continue shopping
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y">
                    {cart.map((item) => (
                      <div key={item.productId} className="py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {item.imageUrl ? (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                          )}
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            {item.categoryName && (
                              <p className="text-sm text-gray-600">{item.categoryName}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <button 
                              className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button 
                              className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          <button 
                            className="text-gray-600 hover:text-red-500"
                            onClick={() => handleRemoveItem(item.productId)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-4">
                <h3 className="font-semibold font-poppins text-lg mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span>${delivery.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Promo code" 
                      className="flex-grow px-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button 
                      className="bg-primary text-white px-4 py-2 rounded-r-lg font-medium hover:bg-primary/90 transition"
                      onClick={handleApplyPromo}
                    >
                      Apply
                    </button>
                  </div>
                  {promoCode && promoCode.toLowerCase() !== "welcome10" && (
                    <p className="text-xs text-gray-500 mt-1">Try "WELCOME10" for 10% off</p>
                  )}
                </div>
                
                <button 
                  className={`w-full ${cart.length > 0 ? 'bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600' : 'bg-gray-300 cursor-not-allowed'} text-white py-3 rounded-lg font-medium transition mb-3`}
                  onClick={handleProceedToPayment}
                  disabled={cart.length === 0 || createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending ? "Processing..." : "Continue to Payment"}
                </button>
                <Link to="/" className="block text-center text-sm text-gray-600 hover:text-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Payment Modal */}
      <PaymentModal 
        open={isPaymentModalOpen} 
        onOpenChange={setIsPaymentModalOpen} 
        total={total}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}
