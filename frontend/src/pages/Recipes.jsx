import { useEffect, useState } from "react";

function Recipes() {
  const url = `${import.meta.env.VITE_API_URL}/api/recipes/`;
  console.log("FETCHING:", url);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Recipes component mounted");

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        console.log("DATA:", data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err);
        setLoading(false);
      });
  }, [url]); // <-- correct placement



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
          {/* FIX: Django uses "name", not "title" */}
          <h2>{recipe.name}</h2>

          {/* FIX: Django uses "description" or "summary" */}
          <p>{recipe.description}</p>

          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {/* FIX: Django often uses "quantity" + "name" */}
                {ing.quantity} {ing.name}
              </li>
            ))}
          </ul>

          <h3>Steps</h3>
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.id}>
                {/* FIX: Django uses "instruction" or "text" */}
                {step.instruction}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
