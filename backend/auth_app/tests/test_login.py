from django.test import TestCase, RequestFactory
from unittest.mock import patch
from strawberry.django.context import StrawberryDjangoContext
from django.contrib.auth.models import User
from django.http import HttpResponse
from auth_app.schemas import schema  # Adjust the import to your project structure


class TestLoginMutations(TestCase):
    def setUp(self):
        # Create test user
        self.user_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "1234",
        }
        self.user = User.objects.create_user(
            username=self.user_data["username"],
            email=self.user_data["email"],
            password=self.user_data["password"],
        )

        # Create a request factory
        self.factory = RequestFactory()

    def get_context(self):
        """Create a valid StrawberryDjangoContext instance for GraphQL testing."""
        request = self.factory.post("/graphql/")
        response = HttpResponse()
        return StrawberryDjangoContext(request=request, response=response)

    @patch("chowkidar.authentication.authenticate")
    def test_login_success(self, mock_authenticate):
        """Test successful login with valid credentials."""
        # Mock successful authentication
        mock_authenticate.return_value = self.user

        query = """
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                success
                username
                token
            }
        }
        """

        context = self.get_context()
        response = schema.execute_sync(
            query,
            variable_values={
                "username": self.user_data["username"],
                "password": self.user_data["password"],
            },
            context_value=context,
        )

        # Verify response contains expected data
        self.assertIsNotNone(response.data)
        self.assertTrue(response.data["login"]["success"])
        self.assertEqual(response.data["login"]["username"], self.user_data["username"])

    @patch("chowkidar.authentication.authenticate")
    def test_login_invalid_credentials(self, mock_authenticate):
        """Test login with invalid credentials."""
        # Mock failed authentication (invalid credentials)
        mock_authenticate.return_value = None

        query = """
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                success
                username
                token
            }
        }
        """

        context = self.get_context()
        response = schema.execute_sync(
            query,
            variable_values={
                "username": self.user_data["username"],
                "password": "wrong_password",
            },
            context_value=context,
        )

        # Check if `errors` exist in the response
        self.assertIsNotNone(response.errors)
        self.assertIn("username or password", str(response.errors[0]).lower())