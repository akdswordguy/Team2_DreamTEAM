import strawberry
import logging
from django.db import IntegrityError
from django.contrib.auth.models import User
from typing import Optional
from chowkidar.wrappers import issue_tokens_on_login, revoke_tokens_on_logout
from chowkidar.authentication import authenticate
from django.core.mail import send_mail

logger = logging.getLogger(__name__)

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
                message=f"User {user.username} signed up successfully!", success=True
            )
        except IntegrityError:
            return SignupResponse(
                message="A user with that username or email already exists.",
                success=False,
            )

    @strawberry.mutation
    @issue_tokens_on_login
    def login(self, info, username: str, password: str) -> LoginResult:
        request = info.context["request"]

        # Prevent multiple logins
        if request.user.is_authenticated:
            logger.warning("Login attempt while already authenticated.")
            return LoginResult(
                success=False,
                username=request.user.username,
                email=request.user.email,
                token=None,
                errors="You are already logged in!",
            )

        user = authenticate(username=username, password=password)
        if user:
            jwt_access_token = request.COOKIES.get("JWT_ACCESS_TOKEN")
            logger.info(f"User {user.username} logged in successfully.")
            print(f"User {user.username} logged in with email: {user.email}")  # Print user email

            return LoginResult(
                success=True,
                username=user.username,
                email=user.email,
                token=jwt_access_token,
                errors=None,
            )

        logger.warning("Login failed: Invalid credentials.")
        return LoginResult(success=False, username=None, email=None, token=None, errors="Invalid credentials")

    @strawberry.mutation
    @revoke_tokens_on_logout
    def logout(self, info) -> bool:
        info.context["LOGOUT_USER"] = True
        logger.info("User logged out successfully.")
        return True

    @strawberry.mutation
    def checkout(self, email: str) -> CheckoutResponse:
        try:
            send_mail(
                subject="Order Initiated",
                message="Your order has been successfully placed! We will keep you updated on its progress and notify you as soon as there are any updates. Thank you for choosing us!",
                from_email="akdattingal@gmail.com",
                recipient_list=[email],
                fail_silently=False,
            )
            logger.info(f"Order initiation email sent to {email}")
            return CheckoutResponse(message="Order initiation email sent successfully!", success=True)
        except Exception as e:
            logger.error(f"Failed to send order initiation email: {str(e)}")
            return CheckoutResponse(message="Failed to send order initiation email.", success=False)
