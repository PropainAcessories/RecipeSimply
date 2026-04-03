#!/bin/sh

python manage.py migrate --noinput
gunicorn RecipeSimply.wsgi:application --bind 0.0.0.0:8000
