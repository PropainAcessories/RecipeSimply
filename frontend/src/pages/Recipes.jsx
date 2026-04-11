import { useEffect, useRef, useState } from "react";

function Recipes() {
  const url = `${import.meta.env.VITE_API_URL}/api/recipes/`;
  console.log("FETCHING:", url);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    console.log("Recipes component mounted");

    const getRecipes = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        console.log("DATA:", data);
        setRecipes(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [url]);

  if (loading) {
    return <p style={{ padding: "1rem" }}>Loading recipes...</p>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Recipes</h1>

      {recipes.length === 0 && <p>No recipes found.</p>}

      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: "1px solid #ddd",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
          }}
        >
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>

          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.quantity} {ing.name}
              </li>
            ))}
          </ul>

          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.id}>{step.instruction}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
