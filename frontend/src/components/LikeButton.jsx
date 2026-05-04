import { useState } from "react";
import axios from "../utils/axios";

export default function LikeButton({ recipeId, isLiked }) {
  const [liked, setLiked] = useState(isLiked);

  const toggleLike = () => {
    axios.post(`/recipes/${recipeId}/like/`).then((res) => {
      setLiked(res.data.liked);
    });
  };

  return (
    <button
      onClick={toggleLike}
      className="mt-4 px-4 py-2 rounded-lg text-white 
                 transition w-full sm:w-auto
                 bg-red-500 hover:bg-red-200 active:scale-95"
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
