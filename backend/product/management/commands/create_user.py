from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = "Creates a new user with email, username, password, and name."

    def handle(self, *args, **kwargs):
        User = get_user_model()
        user = User.objects.create_user(
            email="testuser@example.com",
            username="testuser",
            password="password123",
            first_name="Test User",
        )
        self.stdout.write(self.style.SUCCESS(f"User created: {user}"))

        # Verify authentication
        if user.check_password("password123"):
            self.stdout.write(self.style.SUCCESS("Authentication successful!"))
        else:
            self.stdout.write(self.style.ERROR("Authentication failed."))
