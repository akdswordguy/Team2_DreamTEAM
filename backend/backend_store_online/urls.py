from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('jet/', include('jet_reboot.urls', 'jet_reboot')),
    path("admin/", admin.site.urls),
    path("auth_app/", include("auth_app.urls")),
    path("product/", include("product.urls")),
]

