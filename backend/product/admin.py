from django.contrib import admin
from .models import Product, Category, Order


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock")

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "total_amount", "status", "get_products"]

    def get_products(self, obj):
        return ", ".join([item.product.name for item in obj.items.all()])  # Use 'items' instead of 'orderitem_set'
    get_products.short_description = "Products"

    