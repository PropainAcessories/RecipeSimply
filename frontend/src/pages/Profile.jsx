import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axios";
import RecipeCard from "../components/RecipeCard";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  const [myRecipes, setMyRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  // Redirect safely using useEffect
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  // Fetch recipes only when authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      axios.get("/users/me/recipes/").then((res) => setMyRecipes(res.data));
      axios.get("/users/me/likes/").then((res) => setLikedRecipes(res.data));
    }
  }, [loading, isAuthenticated]);

  // Gated render — no early returns before hooks
  if (loading || !isAuthenticated) {
    return (
      <p className="text-center mt-10">
        {loading ? "Loading profile..." : "Redirecting..."}
      </p>
    );
  }

  const avatarSrc =
    user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.username || "User"
    )}`;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-10">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your Profile</h1>

        <div className="flex flex-col items-center gap-4">
          <img
            src={avatarSrc}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover"
          />

          <div className="text-center">
            <p className="text-lg">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <Link
            to="/profile/edit"
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* My Recipes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Your Recipes</h2>

        {myRecipes.length === 0 ? (
          <p className="text-gray-600">You haven't posted any recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* Liked Recipes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Liked Recipes</h2>

        {likedRecipes.length === 0 ? (
          <p className="text-gray-600">You haven't liked any recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {likedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
