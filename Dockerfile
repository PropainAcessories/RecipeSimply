# ============================
# FRONTEND BUILD STAGE
# ============================
FROM node:20 AS frontend

WORKDIR /app/frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Build the React app
COPY frontend ./
RUN npm run build-prod

# ============================
# BACKEND BUILD STAGE
# ============================
FROM python:3.12-slim AS backend

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy backend code
COPY backend ./

# Copy built frontend into Django static root
COPY --from=frontend /app/frontend/dist /app/static/

# Gunicorn entrypoint
CMD ["gunicorn", "RecipeSimply.wsgi:application", "--bind", "0.0.0.0:8000"]
