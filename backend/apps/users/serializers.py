from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, get_user_model
from django.db import IntegrityError

from .auth.utils import create_user
from .auth.jwt import generate_tokens_for_user

User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        try:
            user = create_user(
                validated_data["username"],
                validated_data["email"],
                validated_data["password"],
            )
            return user
        except IntegrityError:
            raise serializers.ValidationError({
                "email": ["A user with this email already exists."]
            })
        except ValidationError as e:
            raise serializers.ValidationError({"password": e.messages})


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        return generate_tokens_for_user(user)


class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "is_active", "avatar", "avatar_url"]
        extra_kwargs = {
            "avatar": {"write_only": True, "required": False},
        }

    def get_avatar_url(self, obj):
        request = self.context.get("request")
        if obj.avatar and hasattr(obj.avatar, "url"):
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url
        return None


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "avatar"]
        extra_kwargs = {
            "username": {"required": False},
            "avatar": {"required": False},
        }
