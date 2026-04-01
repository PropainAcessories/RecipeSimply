from .base import *
import os

DEBUG = False

DATABASES["default"].update({
    "NAME": os.getenv("MYSQL_DB"),
    "USER": os.getenv("MYSQL_USER"),
    "PASSWORD": os.getenv("MYSQL_PASSWORD"),
    "HOST": os.getenv("MYSQL_HOST"),
    "PORT": os.getenv("MYSQL_PORT", "3306"),
})
