import { useQuery } from "@tanstack/react-query";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { Category, Product } from "@shared/schema";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const categoriesQuery = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const productsQuery = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Get just the first four products for the featured section
  const featuredProducts = productsQuery.data?.slice(0, 4) || [];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-semibold font-poppins text-gray-800 mb-3">
              Handcrafted Ice Cream
            </h1>
            <p className="text-lg md:text-xl font-light font-nunito text-gray-600 mb-8 md:mb-10">
              Experience bliss in every scoop. Ready in just three clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-10 md:py-16 bg-[#F9F5F2]">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold font-poppins text-gray-800">
              Our Collections
            </h2>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categoriesQuery.isLoading ? (
              // Show loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : categoriesQuery.error ? (
              <div className="col-span-full py-4 text-center text-red-500">
                Failed to load categories. Please try again.
              </div>
            ) : (
              categoriesQuery.data?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold font-poppins text-gray-800 mb-8">
            Featured Flavors
          </h2>

          {/* Products Carousel */}
          {productsQuery.isLoading ? (
            // Show loading skeleton in a grid for loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div 
                  key={index}
                  className="bg-primary/5 rounded-xl overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="h-60 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : productsQuery.error ? (
            <div className="py-4 text-center text-red-500">
              Failed to load products. Please try again.
            </div>
          ) : (
            <div className="mx-auto max-w-6xl px-4">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
                setApi={(api) => {
                  if (api) {
                    // Auto-scroll every 4 seconds
                    const autoplayInterval = setInterval(() => {
                      if (api.canScrollNext()) {
                        api.scrollNext();
                      } else {
                        api.scrollTo(0);
                      }
                    }, 4000);
                    
                    // Clear interval when component unmounts
                    return () => clearInterval(autoplayInterval);
                  }
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <div className="p-1">
                        <ProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="hidden md:flex justify-end gap-2 mt-4">
                  <CarouselPrevious className="static translate-y-0 bg-primary/10 hover:bg-primary/20 text-primary" />
                  <CarouselNext className="static translate-y-0 bg-primary/10 hover:bg-primary/20 text-primary" />
                </div>
              </Carousel>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
