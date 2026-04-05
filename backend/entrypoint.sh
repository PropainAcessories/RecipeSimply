#!/bin/bash
set -e

# Start MySQL
echo "Starting MySQL..."
mysqld_safe --datadir=/var/lib/mysql &

# Wait for MySQL to be ready
echo "Waiting for MySQL..."
until mysqladmin ping --silent; do
  sleep 1
done

echo "MySQL is ready."

# Start Django
echo "Starting Gunicorn..."
exec gunicorn RecipeSimply.wsgi:application --bind 0.0.0.0:8000
