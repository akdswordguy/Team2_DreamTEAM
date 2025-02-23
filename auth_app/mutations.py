import strawberry
from django.contrib.auth.models import User
from django.db import IntegrityError
from chowkidar.wrappers import issue_tokens_on_login, revoke_tokens_on_logout
from chowkidar.authentication import authenticate


@strawberry.type
class AuthMutations:
    @strawberry.mutation
    def register(self, username: str, email: str, password: str) -> str:
        try:
            user = User.objects.create_user(
                username=username, email=email, password=password
            )
            return f"User {user.username} registered successfully!"
        except IntegrityError:
            raise Exception("A user with that username or email already exists.")

    @strawberry.mutation
    @issue_tokens_on_login
    def login(self, info, username: str, password: str) -> bool:
        user = authenticate(username=username, password=password)
        if user is None:
            raise Exception("Invalid username or password")
        info.context.LOGIN_USER = user
        return True

    @strawberry.mutation
    @revoke_tokens_on_logout
    def logout(self, info) -> bool:
        info.context.LOGOUT_USER = True
        return True
