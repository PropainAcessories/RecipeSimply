from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from ..models import Like, Recipe


class LikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, recipe_id):
        recipe = Recipe.objects.get(id=recipe_id)
        like, created = Like.objects.get_or_create(recipe=recipe, user=request.user)

        if created:
            return Response({"liked": True}, status=status.HTTP_201_CREATED)

        like.delete()
        return Response({"liked": False}, status=status.HTTP_200_OK)
