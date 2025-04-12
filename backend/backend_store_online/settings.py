"""
Django settings for backend_store_online project.

Generated by 'django-admin startproject' using Django 5.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from django.utils import timezone
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-n_i34=_vo37j&6k+da1t2#5oovj^*t7690%bsjx99$7*yq3kx!"


DATABASES = {
    'default': {
        'ENGINE': config('DB_ENGINE'),
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}



DEBUG = True

ALLOWED_HOSTS = ["team2-dreamteam.onrender.com", "127.0.0.1", "localhost"]

REFRESH_TOKEN_MODEL = "auth_app.RefreshToken"


INSTALLED_APPS = [
    "jazzmin",
    # 'jet.dashboard',
    # 'jet',
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "auth_app",
    "chowkidar",
    "product",
    "corsheaders",
]
JET_DEFAULT_THEME = 'light-gray'

JET_THEMES = [
    {
        'theme': 'light-gray',
        'color': '#47bac1',
        'title': 'Light Gray',
    },
    {
        'theme': 'light-violet',
        'color': '#6254c2',
        'title': 'Light Violet',
    },
]

JET_SIDE_MENU_COMPACT = True

JAZZMIN_SETTINGS = {
    "site_title": "Luxora Admin",
    "site_header": "LUXORA Dashboard",
    "site_brand": "LUXORA",
    "welcome_sign": "Welcome, Prarthana 👋",
    "search_model": ["product.Product", "auth_app.CustomUser", "product.Order"],
    "topmenu_links": [
        {"name": "Home", "url": "/", "permissions": ["auth.view_user"]},
        {"model": "auth_app.customuser"},
        {"app": "product"},
    ],
    "user_avatar": None,
    "show_sidebar": True,
    "show_ui_builder": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "default_theme": "darkly",
    "custom_js": None,
    "custom_css": "css/custom.css",
    "changeform_format": "horizontal_tabs",
}



MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
CORS_ALLOWED_ORIGINS = [
    "https://team2-dreamteam-1.onrender.com",  # Frontend URL
]
CORS_ALLOW_CREDENTIALS = True
ROOT_URLCONF = "backend_store_online.urls"

CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = "akdattingal@gmail.com"
EMAIL_HOST_PASSWORD = "aeny jtjz iniy qkjl "  # Use App Password, NOT email password

JWT_ACCESS_TOKEN_EXPIRATION_DELTA = timezone.timedelta(seconds=60)
JWT_REFRESH_TOKEN_EXPIRATION_DELTA = timezone.timedelta(days=7)

JWT_ACCESS_TOKEN_COOKIE_NAME = "JWT_ACCESS_TOKEN"
JWT_REFRESH_TOKEN_COOKIE_NAME = "JWT_REFRESH_TOKEN"

JWT_COOKIE_SECURE = False
JWT_COOKIE_HTTP_ONLY = True
JWT_SECRET_KEY = SECRET_KEY

WSGI_APPLICATION = "backend_store_online.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / "static",
]

STATIC_ROOT = BASE_DIR / "staticfiles" 



# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
