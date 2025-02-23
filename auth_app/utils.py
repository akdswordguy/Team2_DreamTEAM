from django.contrib.auth.models import User


def get_user_data(user_id):
    try:
        user = User.objects.get(id=user_id)
        return {
            "username": user.username,
            "email": user.email,
        }
    except User.DoesNotExist:
        return None
