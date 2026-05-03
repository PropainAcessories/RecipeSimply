import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

export default function RecipeFeed() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("/recipes/feed/").then((res) => setRecipes(res.data));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Latest Recipes</h1>

      <div className="space-y-4">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
            className="block bg-white shadow rounded-lg p-4 hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
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
        ))}
      </div>
    </div>
  );
}
