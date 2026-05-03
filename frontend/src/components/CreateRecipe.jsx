import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function CreateRecipe() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    axios.post("/recipes/", form).then((res) => {
      navigate(`/recipes/${res.data.id}`);
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Create Recipe</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full border px-3 py-2 rounded-lg"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border px-3 py-2 rounded-lg h-24"
          onChange={handleChange}
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients (one per line)"
          className="w-full border px-3 py-2 rounded-lg h-32"
          onChange={handleChange}
        />

        <textarea
          name="steps"
          placeholder="Steps (one per line)"
          className="w-full border px-3 py-2 rounded-lg h-32"
          onChange={handleChange}
        />

        <button
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Publish Recipe
        </button>
      </form>
    </div>
  );
}
