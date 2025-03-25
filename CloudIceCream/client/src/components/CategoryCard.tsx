import { Link } from "wouter";
import { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      href={`/category/${category.slug}`}
      className="category-card rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="aspect-w-1 aspect-h-1 w-full">
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold font-poppins text-lg text-gray-800">{category.name}</h3>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>
    </Link>
  );
}
