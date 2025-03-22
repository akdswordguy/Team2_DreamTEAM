from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from auth_app.models import CustomUser
from product.models import Order

class CustomUserAdmin(UserAdmin):
    list_display = ("email", "first_name", "last_name", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "first_name", "last_name", "password1", "password2", "is_staff", "is_superuser"),
        }),
    )

class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "total_amount", "status")
    
    def get_products(self, obj):
        return ", ".join([f"{item.product.name} ({item.quantity})" for item in obj.items.all()])

    get_products.short_description = "Products"

# ✅ Register models once
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Order, OrderAdmin)
