from .base import *
import os

DEBUG = True

DATABASES["default"].update({
    "NAME": os.getenv("MYSQL_DB", "myproject"),
    "USER": os.getenv("MYSQL_USER", "root"),
    "PASSWORD": os.getenv("MYSQL_PASSWORD", ""),
    "HOST": os.getenv("MYSQL_HOST", "localhost"),
    "PORT": "3306",
})
