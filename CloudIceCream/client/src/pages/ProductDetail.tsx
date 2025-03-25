import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/lib/cartStore";

// Extended type to include category information
type ProductWithCategory = Product & { category?: { name: string; slug: string } };

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:slug");
  const { slug } = params || {};
  const { toast } = useToast();
  const { addToCart } = useCart();

  const productQuery = useQuery<ProductWithCategory>({
    queryKey: [`/api/products/${slug}`],
    enabled: !!slug,
  });

  if (!match) {
    return null;
  }

  const handleAddToCart = () => {
    if (productQuery.data) {
      addToCart({
        productId: productQuery.data.id,
        name: productQuery.data.name,
        price: productQuery.data.price,
        quantity: 1,
        imageUrl: productQuery.data.imageUrl,
        categoryName: productQuery.data.category?.name
      });
      
      toast({
        title: "Added to cart",
        description: `${productQuery.data.name} has been added to your cart.`,
        duration: 3000,
      });
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  const product = productQuery.data;
  const categorySlug = product?.category?.slug;

  return (
    <section className="py-10 md:py-16 bg-[#F9F5F2]">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          {categorySlug && (
            <Link 
              to={`/category/${categorySlug}`} 
              className="text-gray-600 hover:text-[#E8D4C4] flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to {product?.category?.name || "Products"}</span>
            </Link>
          )}
        </div>

        {productQuery.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden bg-gray-200 animate-pulse h-[400px] md:h-[500px]"></div>
            <div className="animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-20 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-8"></div>
              <div className="h-12 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ) : productQuery.error ? (
          <div className="text-center text-red-500 py-8">
            Failed to load product details. Please try again.
          </div>
        ) : product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-[#E8D4C4]">
                    {product.category?.name}
                  </span>
                </div>
                <h1 className="text-3xl font-semibold font-poppins text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-medium text-gray-800 mb-6">
                  ${product.price.toFixed(2)}
                </p>
                
                <div className="mb-6">
                  <p className="text-gray-600">
                    {product.description}
                  </p>
                </div>

                {product.ingredients && (
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-2">Ingredients</h3>
                    <p className="text-sm text-gray-600">
                      {product.ingredients}
                    </p>
                  </div>
                )}
                
                {product.dietary && product.dietary.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-medium text-gray-800 mb-2">Dietary Information</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.dietary.map((diet, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-[#F2DFC8] text-gray-800 text-xs rounded-full"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#E8D4C4] text-white py-3 rounded-lg font-medium transition hover:bg-opacity-90"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-white border border-[#E8D4C4] text-[#E8D4C4] py-3 rounded-lg font-medium transition hover:bg-[#E8D4C4] hover:text-white"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 py-8">
            Product not found.
          </div>
        )}
      </div>
    </section>
  );
}
