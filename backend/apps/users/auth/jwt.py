from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()


def generate_tokens_for_user(user: User) -> dict: # type: ignore
    """
    Returns a dict containing access and refresh tokens for a user.
    """
    refresh = RefreshToken.for_user(user)
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }


def blacklist_refresh_token(refresh_token: str) -> bool:
    """
    Attempts to blacklist a refresh token.
    Returns True if successful, False otherwise.
    """
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
        return True
    except Exception:
        return False
