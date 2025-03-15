from django.contrib import admin

from django.contrib import admin
from .models import Product, Category, Order  # Import models

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
        return ", ".join([item.product.name for item in obj.orderitem_set.all()])
    get_products.short_description = "Products"

