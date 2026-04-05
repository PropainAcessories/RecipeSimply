import { useEffect, useState } from "react";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/recipes/`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          <h2>{recipe.title}</h2>
          <p>{recipe.description}</p>

          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.amount} {ing.name}
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
