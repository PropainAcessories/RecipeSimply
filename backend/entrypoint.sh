#!/usr/bin/env bash
set -e

echo "Starting Gunicorn..."
exec gunicorn RecipeSimply.wsgi:application --bind 0.0.0.0:8000
