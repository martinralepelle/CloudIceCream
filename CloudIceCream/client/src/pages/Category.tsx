import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import ProductCard from "@/components/ProductCard";
import FilterSort from "@/components/FilterSort";
import { Category, Product } from "@shared/schema";
import { useState } from "react";

export default function CategoryPage() {
  const [match, params] = useRoute("/category/:slug");
  const { slug } = params || {};

  const [filter, setFilter] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const categoryQuery = useQuery<Category>({
    queryKey: [`/api/categories/${slug}`],
    enabled: !!slug,
  });

  const productsQuery = useQuery<Product[]>({
    queryKey: [`/api/products/category/${slug}`, { filter, sort }],
    enabled: !!slug,
  });

  const handleFilterChange = (value: string | null) => {
    setFilter(value);
  };

  const handleSortChange = (value: string | null) => {
    setSort(value);
  };

  if (!match) {
    return null;
  }

  return (
    <section className="py-10 md:py-16 bg-[#F9F5F2]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold font-poppins text-gray-800">
            {categoryQuery.isLoading ? (
              <div className="h-8 bg-gray-200 animate-pulse w-48 rounded"></div>
            ) : (
              categoryQuery.data?.name || "Products"
            )}
          </h2>

          <FilterSort 
            onFilterChange={handleFilterChange} 
            onSortChange={handleSortChange}
          />
        </div>

        {categoryQuery.isLoading ? (
          <div className="h-6 bg-gray-200 animate-pulse w-96 rounded mb-6"></div>
        ) : categoryQuery.data?.description ? (
          <p className="text-gray-600 mb-6">{categoryQuery.data.description}</p>
        ) : null}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsQuery.isLoading ? (
            // Show loading skeleton
            Array.from({ length: 8 }).map((_, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
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
            ))
          ) : productsQuery.error ? (
            <div className="col-span-full py-4 text-center text-red-500">
              Failed to load products. Please try again.
            </div>
          ) : productsQuery.data?.length === 0 ? (
            <div className="col-span-full py-4 text-center text-gray-500">
              No products found in this category.
            </div>
          ) : (
            productsQuery.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
