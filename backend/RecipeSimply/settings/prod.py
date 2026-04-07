from .base import *
import os

DEBUG = False

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

DATABASES["default"] = dj_database_url.config(
    conn_max_age=600,
    ssl_require=True,
)
