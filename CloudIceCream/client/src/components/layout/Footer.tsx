import { useState } from "react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive updates on new flavors and special offers.",
    });
    
    setEmail("");
  };
  
  return (
    <footer className="bg-primary/5 pt-12 pb-6 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-['Poppins'] font-semibold text-xl mb-4 text-primary">About Clouds</h3>
            <p className="text-gray-700 mb-4">
              Clouds is a premium ice cream delivery service dedicated to bringing handcrafted, artisanal ice cream straight to your door.
            </p>
            <div className="flex items-center mt-4">
              <div className="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Fast Delivery</p>
                <p className="text-xs text-gray-500">Delivered within 1 hour</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-['Poppins'] font-semibold text-xl mb-4 text-primary">Customer Service</h3>
            <ul className="space-y-3 text-gray-700">
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Logistics</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Poppins'] font-semibold text-xl mb-4 text-primary">Subscribe</h3>
            <p className="text-gray-700 mb-3">
              Join our newsletter for special offers and new flavors.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow rounded-l-full rounded-r-none border-primary/20 focus:ring-2 focus:ring-primary/30 focus:border-transparent"
              />
              <Button 
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 text-white rounded-r-full rounded-l-none font-['Poppins'] text-sm transition-colors"
              >
                Subscribe
              </Button>
            </form>
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2 text-gray-800">Payment Methods</h4>
              <div className="flex space-x-3">
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">VISA</span>
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">MC</span>
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">AMEX</span>
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">PYPL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-700 mb-4 md:mb-0">
            © {new Date().getFullYear()} Clouds Ice Cream. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
