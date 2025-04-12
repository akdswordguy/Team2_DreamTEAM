from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from strawberry.django.views import GraphQLView
from product.schema import schema as product_schema  # Correct path to your schema

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth_app/", include("auth_app.urls")),
    path("product/", include("product.urls")),
    path("graphql/", csrf_exempt(GraphQLView.as_view(schema=product_schema))),  # Exposing GraphQL
]
