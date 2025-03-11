import strawberry
from .models import Product


@strawberry.type
class ProductType:
    id: int
    name: str
    description: str
    price: float
    stock: int
    image: str


@strawberry.type
class ProductMutations:
    @strawberry.mutation
    def add_product(
        self, name: str, description: str, price: float, stock: int, image: str = None
    ) -> str:
        Product.objects.create(
            name=name, description=description, price=price, stock=stock, image=image
        )
        return "Product added successfully!"

    @strawberry.mutation
    def update_stock(self, id: int, stock: int) -> str:
        try:
            product = Product.objects.get(id=id)
            product.stock = stock
            product.save()
            return f"Stock updated for Product ID {id}."
        except Product.DoesNotExist:
            return "Product not found."

    @strawberry.mutation
    def delete_product(self, id: int) -> str:
        try:
            product = Product.objects.get(id=id)
            product.delete()
            return f"Product ID {id} deleted."
        except Product.DoesNotExist:
            return "Product not found."
