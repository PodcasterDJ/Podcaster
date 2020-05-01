MIDDLEWARE = [
    # CORS policies ---- Has to be before other entries
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Middleware for heroku
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

CORS_ORIGIN_WHITELIST = [
    "http://localhost:8080",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://127.0.0.1:9000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8080",
    # "127.0.0.1:3000",
    # "localhost:3000"
]
CORS_ORIGIN_REGEX_WHITELIST = [
    r".*",
]

# CSRF_COOKIE_HTTPONLY = True

# This is default
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]