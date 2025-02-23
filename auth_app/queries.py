from chowkidar.decorators import login_required
import strawberry
from .utils import get_user_data


@strawberry.field
@login_required
def protected_data(self, info) -> str:
    user_data = get_user_data(info.context.LOGIN_USER)  # hypothetical method
    if not user_data:  # Check if user_data is None
        raise Exception("No data found for user")
    return user_data
