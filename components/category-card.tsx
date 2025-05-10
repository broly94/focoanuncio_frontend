import Link from "next/link"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/search?category=${category.slug}`}
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-full mb-3">
        <span className="text-emerald-600 text-xl">{category.icon}</span>
      </div>
      <h3 className="text-sm font-medium text-center text-gray-900">{category.name}</h3>
    </Link>
  )
}
