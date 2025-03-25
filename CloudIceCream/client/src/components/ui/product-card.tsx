import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { type ProductWithCategory } from "../../../server/storage";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: ProductWithCategory;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    addItem(product.id, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
      <Link href={`/product/${product.slug}`}>
        <a className="block">
          <div className="h-64 overflow-hidden">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs font-medium uppercase text-[#F0C4A8] mb-1">{product.categoryName}</p>
                <h3 className="font-['Poppins'] font-medium text-lg text-[#2D2926]">{product.name}</h3>
              </div>
              <span className="font-['Poppins'] font-semibold text-lg">${product.price}</span>
            </div>
            <p className="text-sm text-[#5F5F5F] mb-4">{product.description.split('.')[0]}.</p>
          </div>
        </a>
      </Link>
      <div className="px-5 pb-5">
        <Button 
          onClick={handleAddToCart}
          className="w-full py-3 bg-[#FFF9F5] text-[#2D2926] font-['Poppins'] text-sm rounded-full transition-all duration-200 hover:bg-[#F0C4A8]"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
