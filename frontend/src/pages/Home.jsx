import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to RecipeSimply</h1>
      <p>Your place to store and explore recipes.</p>

      <div style={{ marginTop: "1.5rem" }}>
        <Link
          to="/recipes"
          style={{
            padding: "0.75rem 1.25rem",
            background: "#4f46e5",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          View Recipes
        </Link>
      </div>
    </div>
  );
}

export default Home;
