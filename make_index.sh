#!/bin/bash
set -e

# Paths
FRONTEND_BUILD_DIR="/app/frontend/dist"
DJANGO_TEMPLATE_DIR="/app/RecipeSimply/templates"

echo "Copying React index.html into Django templates..."

# Ensure template directory exists
mkdir -p "$DJANGO_TEMPLATE_DIR"

# Copy index.html
cp "$FRONTEND_BUILD_DIR/index.html" "$DJANGO_TEMPLATE_DIR/index.html"

echo "index.html copied successfully."
