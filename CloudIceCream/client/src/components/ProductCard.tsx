import { Link } from "wouter";
import { Product } from "@shared/schema";
import { useCart } from "@/lib/cartStore";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="product-card rounded-xl overflow-hidden bg-[#F9F5F2] shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-60 object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold font-poppins text-lg text-gray-800">{product.name}</h3>
          <span className="text-sm font-semibold bg-[#F2DFC8] px-2 py-1 rounded-full">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-[#E8D4C4] text-white py-2 rounded-lg font-medium transition duration-200 hover:bg-opacity-90 transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
