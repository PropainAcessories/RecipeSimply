from .base import *
import os
from pathlib import Path
import dj_database_url

# Detect Fly.io environment
ON_FLY = "FLY_APP_NAME" in os.environ

DEBUG = False

# Correct template directory
TEMPLATES[0]["DIRS"] = [
    BASE_DIR / "templates",
]

# Allowed hosts for Fly.io
ALLOWED_HOSTS = ["*"]

# CSRF + CORS for production domain
CSRF_TRUSTED_ORIGINS = [
    "https://recipesimply.fly.dev",
    "https://recipesimply",
]

CORS_ALLOWED_ORIGINS = [
    "https://recipesimply.fly.dev",
    "https://recipesimply",
]

# Static + media
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "static"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Production database (Neon)
DATABASES["default"] = dj_database_url.config(
    conn_max_age=600,
    ssl_require=True,
)

AUTH_USER_MODEL = "users.User"

# -----------------------------
# SECURITY HARDENING
# -----------------------------

# Redirect all HTTP → HTTPS
SECURE_SSL_REDIRECT = True

# Required for Fly.io reverse proxy
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# HSTS (strict transport security)
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Cookies
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Prevent MIME sniffing
SECURE_CONTENT_TYPE_NOSNIFF = True

# XSS protection
SECURE_BROWSER_XSS_FILTER = True

# Referrer policy
SECURE_REFERRER_POLICY = "same-origin"

# Cross-origin opener policy
SECURE_CROSS_ORIGIN_OPENER_POLICY = "same-origin"

# Clickjacking protection
X_FRAME_OPTIONS = "DENY"
