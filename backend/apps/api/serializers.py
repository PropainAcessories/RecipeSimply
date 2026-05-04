from rest_framework import serializers
from .models import Recipe, Comment, Like
from django.contrib.auth import get_user_model

User = get_user_model()

class RecipeSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    like_count = serializers.IntegerField(source="likes.count", read_only=True)
    comment_count = serializers.IntegerField(source="comments.count", read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            "id",
            "title",
            "description",
            "created_at",
            "author",
            "ingredients",
            "steps",
            "like_count",
            "comment_count",
            "is_liked",
        ]

    def get_author(self, obj):
        return {
            "id": obj.author.id,
            "username": obj.author.username,
        }

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if not request or request.user.is_anonymous:
            return False
        return obj.likes.filter(user=request.user).exists()
    
class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "author_username", "text", "created_at"]
        