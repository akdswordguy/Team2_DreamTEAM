from django.db import models


class Category(models.Model):
    """Represents product categories."""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    """Represents individual products."""
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="products"
    )
    stock = models.IntegerField(default=0)
    image_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    """Represents customer orders."""
    product = models.ForeignKey("product.Product", on_delete=models.CASCADE, related_name="product_orders")
    quantity = models.PositiveIntegerField(default=1)
    ordered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.product.name}"
