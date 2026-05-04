from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from .auth.jwt import blacklist_refresh_token, generate_tokens_for_user

from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, ProfileUpdateSerializer

User = get_user_model()
# These do what they say on the can.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = response.data  # contains username/email
        user_obj = User.objects.get(email=user["email"])
        tokens = generate_tokens_for_user(user_obj)
        return Response(tokens, status=201)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            return Response({"detail": "Refresh token required"}, status=400)

        if blacklist_refresh_token(refresh):
            return Response(status=status.HTTP_205_RESET_CONTENT)

        return Response({"detail": "Invalid token"}, status=400)

# Custom refresh token, no valuable data to secure
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(serializer.data)


class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        serializer = ProfileUpdateSerializer(
            request.user,
            data=request.data,
            partial=True,
        )
        if serializer.is_valid():
            serializer.save()
            # return full user data after update
            full = UserSerializer(request.user, context={"request": request})
            return Response(full.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
