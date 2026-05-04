from rest_framework import generics, permissions
from ..models import Recipe
from ..serializers import RecipeSerializer


class FeedView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Recipe.objects.all().order_by("-created_at")
