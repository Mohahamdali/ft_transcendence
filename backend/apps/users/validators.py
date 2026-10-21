
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

def validate_username(username):
    username_validator = UnicodeUsernameValidator()
    if not isinstance(username, str):
        raise ValueError("Username must be a string")
    
    if not username.strip():
        raise ValueError("Username cannot be empty")

    if len(username) > 150:
        raise ValueError("Username is too long")

    try:
        username_validator(username)
    except ValidationError:
        raise ValueError("Username contains invalid characters")


def validate_user_password(password):
    if not isinstance(password, str):
        raise ValueError("Password must be a string")

    if not password:
        raise ValueError("Password cannot be empty")

    validate_password(password)