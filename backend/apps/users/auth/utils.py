from django.contrib.auth import authenticate, get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from typing import TYPE_CHECKING

User = get_user_model()

if TYPE_CHECKING:
    from django.contrib.auth.models import AbstractBaseUser as UserType
else:
    UserType = User

def validate_user_password(password: str):
    """
    Runs Django's built-in password validators.
    Raises ValidationError if invalid.
    """
    validate_password(password)


def authenticate_user(username: str, password: str):
    """
    Wrapper around Django's authenticate() for clarity.
    """
    user = authenticate(username=username, password=password)
    if not user:
        raise ValidationError("Invalid username or password")
    return user


def create_user(username: str, email: str, password: str) -> User: # type: ignore
    """
    Creates a user with hashed password.
    """
    validate_user_password(password)
    return User.objects.create_user(
        username=username,
        email=email,
        password=password,
        is_active=True,
        is_staff=False,
    )
