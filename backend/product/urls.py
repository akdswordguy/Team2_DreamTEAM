from django.urls import path
from strawberry.django.views import GraphQLView
from .schema import schema
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("", csrf_exempt(GraphQLView.as_view(schema=schema))), 
]
