###############################################
# FRONTEND BUILD
###############################################
FROM node:24 AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN npm run build


###############################################
# BACKEND BUILD
###############################################
FROM python:3.12-slim AS backend
WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend code
COPY backend .

# Copy React build into Django templates + static
COPY --from=frontend /app/frontend/dist/index.html /app/RecipeSimply/templates/index.html
COPY --from=frontend /app/frontend/dist/assets /app/static/assets

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Collect static files
RUN python manage.py collectstatic --noinput

RUN chmod +x /app/entrypoint.sh
CMD ["bash", "/app/entrypoint.sh"]
