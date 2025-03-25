import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  onSuccess?: () => void;
}

export default function PaymentModal({ open, onOpenChange, total, onSuccess }: PaymentModalProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("visa");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleProcess = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onOpenChange(false);
      
      toast({
        title: "Payment successful!",
        description: "Your order has been placed successfully.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect to a thank you page or home page
      setLocation("/");
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-primary">Complete Your Purchase</DialogTitle>
          <DialogDescription className="text-center">
            Select your preferred payment method
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center py-4">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-amber-200 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
        
        <RadioGroup 
          value={selectedPayment} 
          onValueChange={setSelectedPayment}
          className="gap-4"
        >
          {/* Credit Card Option */}
          <div className={`border rounded-lg p-4 ${selectedPayment === 'visa' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visa" id="visa" />
              <Label htmlFor="visa" className="flex-1 flex items-center cursor-pointer">
                <div className="h-8 w-12 bg-indigo-600 rounded-md flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium">Credit Card</p>
                  <p className="text-xs text-muted-foreground">Visa ending in 4242</p>
                </div>
              </Label>
            </div>
          </div>
          
          {/* PayPal Option */}
          <div className={`border rounded-lg p-4 ${selectedPayment === 'paypal' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex-1 flex items-center cursor-pointer">
                <div className="h-8 w-12 bg-blue-600 rounded-md flex items-center justify-center mr-3">
                  <span className="text-white text-xs font-bold">PayPal</span>
                </div>
                <div>
                  <p className="font-medium">PayPal</p>
                  <p className="text-xs text-muted-foreground">Pay with your PayPal account</p>
                </div>
              </Label>
            </div>
          </div>
          
          {/* Apple Pay Option */}
          <div className={`border rounded-lg p-4 ${selectedPayment === 'apple' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="apple" id="apple" />
              <Label htmlFor="apple" className="flex-1 flex items-center cursor-pointer">
                <div className="h-8 w-12 bg-gray-800 rounded-md flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
                    <path
                      d="M14.94 5.19A4.38 4.38 0 0016 2a4.44 4.44 0 00-3 1.52 4.17 4.17 0 00-1 3.09 3.69 3.69 0 002.94-1.42zm2.52 7.44a4.51 4.51 0 012.16-3.81 4.66 4.66 0 00-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87a4.92 4.92 0 00-4.14 2.53C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.82 3.28-.82 2 .82 3.3.79 2.22-1.23 3.06-2.45a11 11 0 001.38-2.85 4.41 4.41 0 01-2.68-4.04z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Apple Pay</p>
                  <p className="text-xs text-muted-foreground">Pay with Apple Pay</p>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>
        
        <DialogFooter className="sm:justify-center">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleProcess}
            disabled={isProcessing}
            className="bg-gradient-to-r from-primary to-amber-500 hover:from-primary/90 hover:to-amber-600 min-w-[120px]"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}