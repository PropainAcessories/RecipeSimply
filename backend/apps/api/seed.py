import random
from django.contrib.auth import get_user_model
from apps.api.models import Recipe, Comment, Like

User = get_user_model()

def run():
    print("Seeding database...")

    # --- USERS ---
    users_data = [
        {"username": "henry", "email": "henry@example.com"},
        {"username": "chef_amy", "email": "amy@example.com"},
        {"username": "foodie_john", "email": "john@example.com"},
    ]

    users = []
    for data in users_data:
        user, created = User.objects.get_or_create(
            username=data["username"],
            defaults={
                "email": data["email"],
                "password": "pbkdf2_sha256$260000$dummy$dummyhash"  # placeholder
            },
        )
        users.append(user)

    # --- RECIPES ---
    recipes_data = [
        {
            "title": "Classic Spaghetti Carbonara",
            "description": "A creamy Roman pasta dish with eggs, cheese, pancetta, and pepper.",
            "ingredients": "Spaghetti\nEggs\nParmesan\nPancetta\nBlack Pepper",
            "steps": "Boil pasta\nCook pancetta\nMix eggs + cheese\nCombine everything",
        },
        {
            "title": "Garlic Butter Steak Bites",
            "description": "Juicy steak cubes seared in garlic butter.",
            "ingredients": "Steak\nButter\nGarlic\nSalt\nPepper",
            "steps": "Cut steak\nSear in butter\nAdd garlic\nServe hot",
        },
        {
            "title": "Chicken Alfredo",
            "description": "Creamy Alfredo sauce tossed with fettuccine and grilled chicken.",
            "ingredients": "Chicken\nFettuccine\nCream\nParmesan\nGarlic",
            "steps": "Cook pasta\nMake sauce\nGrill chicken\nCombine",
        },
        {
            "title": "Avocado Toast",
            "description": "Simple and delicious breakfast toast with smashed avocado.",
            "ingredients": "Bread\nAvocado\nSalt\nPepper\nLemon",
            "steps": "Toast bread\nMash avocado\nSpread and season",
        },
        {
            "title": "Blueberry Pancakes",
            "description": "Fluffy pancakes loaded with fresh blueberries.",
            "ingredients": "Flour\nEggs\nMilk\nBlueberries\nSugar",
            "steps": "Mix batter\nAdd berries\nCook on skillet",
        },
        {
            "title": "Homemade Pizza",
            "description": "Crispy homemade pizza with your favorite toppings.",
            "ingredients": "Dough\nTomato Sauce\nCheese\nPepperoni\nBasil",
            "steps": "Roll dough\nAdd toppings\nBake",
        },
    ]

    recipes = []
    for data in recipes_data:
        recipe, created = Recipe.objects.get_or_create(
            title=data["title"],
            defaults={
                "author": random.choice(users),
                "description": data["description"],
                "ingredients": data["ingredients"],
                "steps": data["steps"],
            },
        )
        recipes.append(recipe)

    # --- COMMENTS ---
    sample_comments = [
        "This looks amazing!",
        "I tried this and loved it.",
        "Great recipe!",
        "My family enjoyed this a lot.",
        "Super easy to make!",
    ]

    for recipe in recipes:
        for _ in range(random.randint(1, 3)):
            Comment.objects.get_or_create(
                recipe=recipe,
                author=random.choice(users),
                text=random.choice(sample_comments),
            )

    # --- LIKES ---
    for recipe in recipes:
        for user in users:
            if random.random() < 0.5:  # 50% chance user likes recipe
                Like.objects.get_or_create(recipe=recipe, user=user)

    print("Seeding complete!")
