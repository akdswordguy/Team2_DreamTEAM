import strawberry
import logging
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from django.contrib.auth import login as auth_login
from django.core.mail import send_mail
from typing import Optional
from strawberry.types import Info
from django.contrib.auth.models import User
from chowkidar.wrappers import revoke_tokens_on_logout
from chowkidar.authentication import authenticate
from chowkidar.tokens import generate_tokens

from .models import UserProfile

logger = logging.getLogger(__name__)
User = get_user_model()

# ---------- Response and Input Types ----------

@strawberry.type
class RegisterResponse:
    message: str
    success: bool

@strawberry.type
class LoginResult:
    success: bool
    username: Optional[str]
    email: Optional[str]
    token: Optional[str]
    errors: Optional[str]

@strawberry.input
class SignupInput:
    username: str
    email: str
    password: str
    name: str

@strawberry.type
class SignupResponse:
    message: str
    success: bool

@strawberry.type
class CheckoutResponse:
    message: str
    success: bool

@strawberry.input
class UpdateProfileInput:
    first_name: str
    last_name: str
    phone: str
    street: str
    city: str
    landmark: str
    state: str
    country: str
    postal_code: str

@strawberry.type
class UpdateProfilePayload:
    success: bool
    message: str

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
class LogoutResponse:
    success: bool
    message: str

# ---------- Auth Mutations ----------

@strawberry.type
class AuthMutations:

    @strawberry.mutation
    def register(self, username: str, email: str, password: str, name: str) -> RegisterResponse:
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=name,
            )
            logger.info(f"User {user.username} registered successfully!")
            return RegisterResponse(
                message=f"User {user.username} registered successfully!",
                success=True,
            )
        except IntegrityError:
            logger.warning("Registration failed: A user with that username or email already exists.")
            return RegisterResponse(
                message="A user with that username or email already exists.",
                success=False,
            )

    @strawberry.mutation
    def signup(self, input: SignupInput) -> SignupResponse:
        try:
            user = User.objects.create_user(
                username=input.username,
                email=input.email,
                password=input.password,
                first_name=input.name,
            )
            return SignupResponse(
                message=f"User {user.username} signed up successfully!",
                success=True
            )
        except IntegrityError:
            return SignupResponse(
                message="A user with that username or email already exists.",
                success=False,
            )

    @strawberry.mutation
    def login(self, info: Info, username: str, password: str) -> LoginResult:
        request = info.context.get("request")
        if not request:
            return LoginResult(success=False, username=None, email=None, token=None, errors="Request not found")

        if request.user.is_authenticated:
            tokens = generate_tokens(request.user)  # <-- FIX
            return LoginResult(
                success=False,
                username=request.user.username,
                email=request.user.email,
                token=tokens.get("access"),
                errors="You are already logged in!"
        )

        user = authenticate(username=username, password=password)
        if user:
            auth_login(request, user)
            tokens = generate_tokens(user)

            return LoginResult(
                success=True,
                username=user.username,
                email=user.email,
                token=tokens.get("access"),
                errors=None
            )

        return LoginResult(success=False, username=None, email=None, token=None, errors="Invalid credentials")

    @strawberry.mutation
    @revoke_tokens_on_logout
    def logout(self, info: Info) -> LogoutResponse:
        info.context["LOGOUT_USER"] = True
        logger.info("User logged out successfully.")
        return LogoutResponse(success=True, message="User logged out successfully.")

    @strawberry.mutation
    def checkout(self, email: str) -> CheckoutResponse:
        try:
            send_mail(
                subject="Order Initiated",
                message="Your order has been successfully placed! We will keep you updated on its progress.",
                from_email="akdattingal@gmail.com",
                recipient_list=[email],
                fail_silently=False,
            )
            logger.info(f"Order initiation email sent to {email}")
            return CheckoutResponse(message="Order initiation email sent successfully!", success=True)
        except Exception as e:
            logger.error(f"Failed to send order initiation email: {str(e)}")
            return CheckoutResponse(message="Failed to send order initiation email.", success=False)

    @strawberry.mutation
    def update_profile(self, info: Info, input: UpdateProfileInput) -> UpdateProfilePayload:
        request = info.context.get("request")
        if not request or not request.user.is_authenticated:
            return UpdateProfilePayload(success=False, message="Authentication required")

        user = request.user
        try:
            user.first_name = input.first_name
            user.last_name = input.last_name
            user.save()

            profile, _ = UserProfile.objects.get_or_create(user=user)
            profile.phone = input.phone
            profile.street = input.street
            profile.city = input.city
            profile.landmark = input.landmark
            profile.state = input.state
            profile.country = input.country
            profile.postal_code = input.postal_code
            profile.save()

            return UpdateProfilePayload(success=True, message="Profile updated successfully")
        except Exception as e:
            logger.error(f"Profile update failed: {str(e)}")
            return UpdateProfilePayload(success=False, message="Profile update failed")

    @strawberry.mutation
    def check_auth(self, info: Info) -> str:
        request = info.context.get("request")
        if not request:
            return "No request found"
        return f"Authenticated: {request.user.is_authenticated}, User: {request.user}"


# ---------- Query ----------

@strawberry.type
class Query:
    @strawberry.field
    def placeholder(self) -> str:
        return "GraphQL API is working!"


# ---------- Schema ----------

schema = strawberry.Schema(query=Query, mutation=AuthMutations)
