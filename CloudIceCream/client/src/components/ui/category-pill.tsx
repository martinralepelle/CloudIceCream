import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryPill({ name, isActive, onClick }: CategoryPillProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "category-pill px-4 py-2 rounded-full text-sm font-['Poppins'] font-medium bg-white transition-all duration-200 hover:bg-[#F0C4A8]/20",
        isActive && "active bg-[#F0C4A8] text-[#2D2926]"
      )}
    >
      {name}
    </button>
  );
}
