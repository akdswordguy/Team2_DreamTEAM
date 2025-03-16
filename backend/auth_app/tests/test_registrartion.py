from django.test import TestCase
from django.contrib.auth.models import User
from django.http import HttpRequest
from auth_app.schemas import schema
from unittest.mock import Mock


class CustomTestContext(dict):
    """Custom context to emulate the GraphQL context during tests."""

    def __init__(self, request):
        super().__init__()
        self.request = request
        self["request"] = request
        self["LOGIN_USER"] = None
        self["META"] = {}

    def __getattr__(self, name):
        """Allow attribute-style access."""
        return self[name]

    def __setattr__(self, name, value):
        """Allow attribute-style setting."""
        self[name] = value


class AuthMutationsTests(TestCase):
    def setUp(self):
        self.test_user_data = {
            "username": "testuser1",
            "email": "testuser1@example.com",
            "password": "1234",
            "name": "Test User1",
        }

        # Create a user in the database
        self.test_user = User.objects.create_user(
            username=self.test_user_data["username"],
            email=self.test_user_data["email"],
            password=self.test_user_data["password"],
            first_name=self.test_user_data["name"],
        )

        # Create a mock request
        self.request = HttpRequest()
        self.request.COOKIES = {}
        self.request.META = {"REMOTE_ADDR": "127.0.0.1"}
        self.context = CustomTestContext(self.request)

    def execute_query(self, query, variables=None):
        """Helper function to execute GraphQL queries."""
        return schema.execute_sync(
            query,
            variable_values=variables,
            context_value=self.context,
        )

    def test_register_user_success(self):
        query = """
        mutation Register($username: String!, $email: String!, $password: String!, $name: String!) {
            register(username: $username, email: $email, password: $password, name: $name) {
                message
                success
            }
        }
        """
        response = self.execute_query(
            query,
            variables={
                "username": "newuser",
                "email": "newuser@example.com",
                "password": "newpassword",
                "name": "New User",
            },
        )

        self.assertTrue(response.data["register"]["success"])
        self.assertEqual(
            response.data["register"]["message"],
            "User newuser registered successfully!",
        )

    def test_register_user_failure_duplicate(self):
        query = """
        mutation Register($username: String!, $email: String!, $password: String!, $name: String!) {
            register(username: $username, email: $email, password: $password, name: $name) {
                message
                success
            }
        }
        """
        response = self.execute_query(
            query,
            variables=self.test_user_data,
        )

        self.assertFalse(response.data["register"]["success"])
        self.assertEqual