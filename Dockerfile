###############################################
# FRONTEND BUILD
###############################################
FROM node:24 AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build-prod
COPY frontend/ .
RUN npm run build-prod


###############################################
# BACKEND BUILD
###############################################
FROM python:3.12-slim AS backend

WORKDIR /app

# Install system dependencies
# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend code (including manage.py)
COPY backend/ /app/

# Copy requirements
COPY requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Make entrypoint executable
RUN chmod +x /app/entrypoint.sh

# Collect static files
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

# Default command (Gunicorn)
CMD ["gunicorn", "RecipeSimply.wsgi:application", "--bind", "0.0.0.0:8000"]
