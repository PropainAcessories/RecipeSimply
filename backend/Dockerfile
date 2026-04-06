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
FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies required for psycopg2/Postgres
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Start Gunicorn via your entrypoint
CMD ["bash", "/app/entrypoint.sh"]
