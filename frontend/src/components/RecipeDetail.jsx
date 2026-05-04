import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/recipes/${id}/`).then((res) => setRecipe(res.data));
  }, [id]);

  if (!recipe) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>

      <p className="text-gray-600 mt-1">
        by {recipe.author.username}
      </p>

      <LikeButton recipeId={recipe.id} isLiked={recipe.is_liked} />

      <p className="mt-4 text-gray-800 whitespace-pre-line">
        {recipe.description}
      </p>

      <h2 className="text-xl font-semibold mt-6">Ingredients</h2>
      <p className="whitespace-pre-line mt-2">{recipe.ingredients}</p>

      <h2 className="text-xl font-semibold mt-6">Steps</h2>
      <p className="whitespace-pre-line mt-2">{recipe.steps}</p>

      <CommentSection recipeId={recipe.id} />
    </div>
  );
}
