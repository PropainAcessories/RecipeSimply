from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from ..models import Recipe
from ..serializers import RecipeSerializer


class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all().order_by("-created_at")
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        recipe = self.get_object()
        if recipe.author != self.request.user:
            raise PermissionDenied("You can only edit your own recipes.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("You can only delete your own recipes.")
        instance.delete()
