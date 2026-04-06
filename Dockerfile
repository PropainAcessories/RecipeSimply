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

# System deps for psycopg2
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend into Django static root
COPY --from=frontend /app/frontend/dist ./backend/static/

# Collect static files
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

# Start Gunicorn
CMD ["bash", "entrypoint.sh"]
