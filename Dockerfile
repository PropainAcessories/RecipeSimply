###############################################
# FRONTEND BUILD
###############################################
FROM node:24 AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build-prod


###############################################
# BACKEND BUILD
###############################################
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend code into /app/backend
COPY backend/ /app/backend/

# Copy entrypoint
COPY backend/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Copy requirements
COPY requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Move into backend folder for Django commands
WORKDIR /app/backend

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Default command (Gunicorn)
CMD ["gunicorn", "RecipeSimply.wsgi:application", "--bind", "0.0.0.0:8000"]
