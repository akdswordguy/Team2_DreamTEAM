from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth_app/", include("auth_app.urls")),
    path("product/", include("product.urls")),
]
