from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

from common.models import IndexedTimeStampedModel

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **kwargs):
        #verification
        if not email:
            raise ValueError("Users must have an email address")
        if not username:
            raise ValueError("Users must have a username")
        if not password:
            raise ValueError("Users must have a password")
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **kwargs)
        user.set_password(password)
        user.save(using=self.db)
        return user
    
    def create_superuser(self, username, email, password):
        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True

        if user.get("is_staff") is not True:
            raise ValueError("Not Admin, get the F*ck out.")
        if user.get("is_superuser") is not True:
            raise ValueError("Not Admin, get the F*ck out.")
        user.save(using=self.db)
        return user

class User(AbstractBaseUser, PermissionsMixin, IndexedTimeStampedModel):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.CharField(db_index=True, max_length=255, unique=True)
    is_staff = models.BooleanField(
        default=False, help_text="Designates Administrative permissons."
    )
    is_active = models.BooleanField(
        default=True, help_text="Monitors activity."
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return f"User(username={self.username}, email={self.email})"
    