# ============================
# BASE PYTHON IMAGE
# ============================
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System deps for psycopg2
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# ============================
# INSTALL PYTHON DEPENDENCIES
# ============================
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# ============================
# COPY BACKEND CODE
# ============================
COPY . .

# ============================
# COLLECT STATIC FILES
# ============================
RUN python manage.py collectstatic --noinput

# ============================
# START SERVER
# ============================
CMD ["bash", "entrypoint.sh"]
