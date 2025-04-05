from typing import Optional
from chowkidar.decorators import login_required
import strawberry
from .utils import get_user_data
from django.contrib.auth.models import User
from .models import UserProfile
from strawberry.types import Info


@strawberry.type
class UserProfileType:
    first_name: str
    last_name: str
    email: str
    phone: str
    street: str
    city: str
    landmark: str
    state: str
    country: str
    postal_code: str


@strawberry.type
class Query:
    @strawberry.field
    def my_profile(self, info: Info) -> Optional[UserProfileType]:
        user = info.context["request"].user
        if not user.is_authenticated:
            return None

        profile, _ = UserProfile.objects.get_or_create(user=user)
        return UserProfileType(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            phone=profile.phone or "",
            street=profile.street or "",
            city=profile.city or "",
            landmark=profile.landmark or "",
            state=profile.state or "",
            country=profile.country or "",
            postal_code=profile.postal_code or "",
        )

    @strawberry.field
    @login_required
    def protected_data(self, info: Info) -> str:
        user_data = get_user_data(info.context["LOGIN_USER"])
        if not user_data:
            raise Exception("No data found for user")
        return user_data

    @strawberry.field
    def user_id_by_username(self, username: str) -> Optional[int]:
        try:
            user = User.objects.get(username=username)
            return user.id
        except User.DoesNotExist:
            return None
