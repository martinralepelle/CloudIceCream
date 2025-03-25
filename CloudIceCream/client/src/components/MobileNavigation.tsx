import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cartStore";

export default function MobileNavigation() {
  const [location] = useLocation();
  const { cart } = useCart();
  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="flex justify-around py-3">
        <Link 
          href="/" 
          className={`flex flex-col items-center ${location === '/' ? 'text-[#E8D4C4]' : 'text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          href="#" 
          className="flex flex-col items-center text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-xs mt-1">Search</span>
        </Link>
        
        <Link 
          href="#" 
          className="flex flex-col items-center text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-xs mt-1">Favorites</span>
        </Link>
        
        <Link 
          href="/checkout" 
          className={`flex flex-col items-center relative ${location === '/checkout' ? 'text-[#E8D4C4]' : 'text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#E8D4C4] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </Link>
      </div>
    </div>
  );
}
