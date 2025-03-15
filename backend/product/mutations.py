import strawberry
from .models import Product, Order, OrderItem


@strawberry.type
class ProductType:
    id: int
    name: str
    description: str
    price: float
    stock: int
    image: str


@strawberry.type
class OrderType:
    id: int
    user_id: int
    total_amount: float
    order_date: str
    status: str


@strawberry.type
class OrderItemType:
    id: int
    order_id: int
    product_id: int
    quantity: int
    price: float


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


@strawberry.type
class OrderMutations:
    @strawberry.mutation
    def create_order(
        self, user_id: int, total_amount: float, status: str = "Pending"
    ) -> str:
        Order.objects.create(user_id=user_id, total_amount=total_amount, status=status)
        return "Order created successfully!"

    @strawberry.mutation
    def update_order_status(self, id: int, status: str) -> str:
        try:
            order = Order.objects.get(id=id)
            order.status = status
            order.save()
            return f"Order ID {id} updated to status '{status}'."
        except Order.DoesNotExist:
            return "Order not found."

    @strawberry.mutation
    def delete_order(self, id: int) -> str:
        try:
            order = Order.objects.get(id=id)
            order.delete()
            return f"Order ID {id} deleted."
        except Order.DoesNotExist:
            return "Order not found."


@strawberry.type
class OrderItemMutations:
    @strawberry.mutation
    def add_order_item(
        self, order_id: int, product_id: int, quantity: int, price: float
    ) -> str:
        OrderItem.objects.create(
            order_id=order_id, product_id=product_id, quantity=quantity, price=price
        )
        return "Order item added successfully!"

    @strawberry.mutation
    def update_order_item(self, id: int, quantity: int, price: float) -> str:
        try:
            order_item = OrderItem.objects.get(id=id)
            order_item.quantity = quantity
            order_item.price = price
            order_item.save()
            return f"Order item ID {id} updated."
        except OrderItem.DoesNotExist:
            return "Order item not found."

    @strawberry.mutation
    def delete_order_item(self, id: int) -> str:
        try:
            order_item = OrderItem.objects.get(id=id)
            order_item.delete()
            return f"Order item ID {id} deleted."
        except OrderItem.DoesNotExist:
            return "Order item not found."