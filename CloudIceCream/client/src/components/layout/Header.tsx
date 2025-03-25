import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";

export default function Header() {
  const { cartTotalItems } = useCart();
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="font-['Poppins'] font-semibold text-2xl text-[#2D2926] tracking-wide">
            clouds
          </a>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <a className="text-[#2D2926] p-2 relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartTotalItems > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-[#F0C4A8] text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartTotalItems}
                </span>
              )}
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
