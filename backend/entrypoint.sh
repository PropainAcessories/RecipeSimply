#!/bin/bash
gunicorn RecipeSimply.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 1 \
  --threads 2 \
  --log-level warning
