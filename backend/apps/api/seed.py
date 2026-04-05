from apps.api.models import Recipe, Ingredient, Step

# Clear existing data (optional)
Recipe.objects.all().delete()

# --- Recipe 1 ---
pancakes = Recipe.objects.create(
    title="Fluffy Pancakes",
    description="Light, fluffy pancakes perfect for breakfast."
)

Ingredient.objects.create(recipe=pancakes, name="Flour", amount="1 cup")
Ingredient.objects.create(recipe=pancakes, name="Milk", amount="1 cup")
Ingredient.objects.create(recipe=pancakes, name="Eggs", amount="2")
Ingredient.objects.create(recipe=pancakes, name="Sugar", amount="2 tbsp")
Ingredient.objects.create(recipe=pancakes, name="Baking Powder", amount="2 tsp")

Step.objects.create(recipe=pancakes, order=1, instruction="Mix dry ingredients together.")
Step.objects.create(recipe=pancakes, order=2, instruction="Whisk in milk and eggs.")
Step.objects.create(recipe=pancakes, order=3, instruction="Pour batter onto hot skillet.")
Step.objects.create(recipe=pancakes, order=4, instruction="Cook until golden brown on both sides.")

# --- Recipe 2 ---
spaghetti = Recipe.objects.create(
    title="Classic Spaghetti",
    description="Simple and delicious spaghetti with tomato sauce."
)

Ingredient.objects.create(recipe=spaghetti, name="Spaghetti", amount="1 lb")
Ingredient.objects.create(recipe=spaghetti, name="Tomato Sauce", amount="2 cups")
Ingredient.objects.create(recipe=spaghetti, name="Garlic", amount="3 cloves")
Ingredient.objects.create(recipe=spaghetti, name="Olive Oil", amount="2 tbsp")
Ingredient.objects.create(recipe=spaghetti, name="Salt", amount="to taste")

Step.objects.create(recipe=spaghetti, order=1, instruction="Boil spaghetti until al dente.")
Step.objects.create(recipe=spaghetti, order=2, instruction="Sauté garlic in olive oil.")
Step.objects.create(recipe=spaghetti, order=3, instruction="Add tomato sauce and simmer.")
Step.objects.create(recipe=spaghetti, order=4, instruction="Combine spaghetti with sauce and serve.")

print("Database seeded successfully!")
