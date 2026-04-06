from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Recipe
from .serializers import RecipeSerializer

@api_view(["GET"])
def recipe_list(request):
    recipes = Recipe.objects.all()
    print("Recipes count:", recipes.count())  # <--- ADD THIS
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def recipe_detail(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
        return Response({"error": "Recipe not found"}, status=404)

    serializer = RecipeSerializer(recipe)
    return Response(serializer.data)
