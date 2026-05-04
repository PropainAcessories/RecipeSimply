from rest_framework import generics, permissions
from ..models import Recipe, Like
from ..serializers import RecipeSerializer

class UserRecipesView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Recipe.objects.filter(author=self.request.user).order_by("-created_at")


class UserLikedRecipesView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Recipe.objects.filter(likes__user=self.request.user).order_by("-created_at")
