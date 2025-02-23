from django.urls import path
from chowkidar.view import auth_enabled_view
from .schemas import schema
from django.views.decorators.csrf import csrf_exempt
from strawberry.django.views import GraphQLView

urlpatterns = [
    path(
        "graphql/", csrf_exempt(auth_enabled_view(GraphQLView.as_view(schema=schema)))
    ),
]
