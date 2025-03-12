from django.core.management.base import BaseCommand
from auth_app.models import CustomUser

class Command(BaseCommand):
    help = "Create a new admin user interactively"

    def handle(self, *args, **kwargs):
        self.stdout.write("Creating a new admin user...")

        first_name = input("Enter first name: ").strip()
        last_name = input("Enter last name (optional): ").strip() or None
        email = input("Enter email: ").strip()
        password = input("Enter password: ").strip()

        if CustomUser.objects.filter(email=email).exists():
            self.stdout.write(self.style.ERROR("Error: User with this email already exists."))
            return

        user = CustomUser.objects.create_superuser(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        self.stdout.write(self.style.SUCCESS(f"Admin user {email} created successfully!"))
