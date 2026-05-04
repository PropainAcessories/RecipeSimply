from rest_framework import generics, permissions
from ..models import Comment, Recipe
from ..serializers import CommentSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        recipe_id = self.kwargs["recipe_id"]
        return Comment.objects.filter(recipe_id=recipe_id).order_by("-created_at")

    def perform_create(self, serializer):
        recipe = Recipe.objects.get(id=self.kwargs["recipe_id"])
        serializer.save(author=self.request.user, recipe=recipe)
