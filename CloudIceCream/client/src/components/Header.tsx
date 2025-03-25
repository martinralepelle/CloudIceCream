import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cartStore";
import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock authentication state
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentLocation] = useLocation();
  
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    // In a real app, this would handle signing out the user
    window.location.href = '/login';
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Render the dropdown menu content
  const renderProfileDropdownContent = () => (
    <>
      <DropdownMenuItem asChild>
        <Link href="/profile" className="cursor-pointer">
          My Profile
        </Link>
      </DropdownMenuItem>
      {!isLoggedIn && (
        <DropdownMenuItem asChild>
          <Link href="/register" className="cursor-pointer">
            Register
          </Link>
        </DropdownMenuItem>
      )}
      <DropdownMenuSeparator />
      {isLoggedIn ? (
        <DropdownMenuItem onSelect={handleSignOut} className="cursor-pointer text-red-500">
          Sign Out
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem asChild>
          <Link href="/login" className="cursor-pointer">
            Sign In
          </Link>
        </DropdownMenuItem>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo (left side) */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-semibold font-poppins text-amber-400">
            clouds
          </Link>
        </div>
        
        {/* Center section with burger menu on mobile */}
        <div className="md:hidden flex justify-center">
          <button 
            type="button" 
            className="text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Desktop navigation (center-right) */}
        <div className="hidden md:flex items-center space-x-6">
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/" 
                  className={`text-gray-800 hover:text-primary font-nunito font-semibold ${currentLocation === '/' ? 'text-primary' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/our-story" 
                  className={`text-gray-600 hover:text-primary font-nunito ${currentLocation === '/our-story' ? 'text-primary' : ''}`}
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Right section with user icon and cart on desktop and mobile */}
        <div className="flex items-center space-x-5">
          <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent ref={dropdownRef} className="w-56 mt-1" align="end">
              {renderProfileDropdownContent()}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/checkout" className="text-amber-500 hover:text-amber-600 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t">
          <nav className="mb-4">
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className={`block text-gray-800 hover:text-primary font-nunito font-semibold ${currentLocation === '/' ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/our-story" 
                  className={`block text-gray-600 hover:text-primary font-nunito ${currentLocation === '/our-story' ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
