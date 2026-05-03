import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className="block bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition"
    >
      <h2 className="text-lg font-semibold">{recipe.title}</h2>

      <p className="text-gray-600 text-sm mt-1">
        by {recipe.author.username}
      </p>

      <p className="mt-2 text-gray-700 line-clamp-2">
        {recipe.description}
      </p>

      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
        <span>❤️ {recipe.like_count}</span>
        <span>💬 {recipe.comment_count}</span>
      </div>
    </Link>
  );
}
