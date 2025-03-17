from chowkidar.decorators import login_required
import strawberry
from .utils import get_user_data
from django.contrib.auth.models import User


@strawberry.field
@login_required
def protected_data(self, info) -> str:
    user_data = get_user_data(info.context.LOGIN_USER)  # hypothetical method
    if not user_data:  # Check if user_data is None
        raise Exception("No data found for user")
    return user_data


def userIdByUsername(username: str) -> int:
    """
    Get the user ID for a given username. Raises an Exception if the user is not found.
    """
    user = User.objects.filter(username=username).first()
    if user:
        return user.id
    raise Exception("User not found")