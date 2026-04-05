#!/bin/bash
set -e

echo "Running migrations..."
python manage.py migrate

echo "Starting Gunicorn..."
exec gunicorn RecipeSimply.wsgi:application --bind 0.0.0.0:8000
