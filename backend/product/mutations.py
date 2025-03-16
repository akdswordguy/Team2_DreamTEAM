import strawberry
from typing import List, Optional
from decimal import Decimal
from .models import Product, Order, OrderItem


@strawberry.type
class ProductType:
    id: int
    name: str
    description: str
    price: float
    stock: int
    image: Optional[str]


@strawberry.input
class OrderItemInput:
    product_id: strawberry.ID
    quantity: int


@strawberry.type
class OrderItemType:
    id: int
    order_id: int
    product_id: int
    quantity: int
    price: Decimal


@strawberry.type
class OrderType:
    id: strawberry.ID
    userId: strawberry.ID  # camelCase
    totalPrice: Decimal  # camelCase
    status: str
    items: List[OrderItemType]


@strawberry.type
class OrderResponse:
    success: bool
    message: str
    order: Optional[OrderType] = None


@strawberry.type
class ProductMutations:
    @strawberry.mutation
    def add_product(
        self,
        name: str,
        description: str,
        price: float,
        stock: int,
        image: Optional[str] = None,
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
        self, userId: int, totalAmount: float, status: str = "Pending"
    ) -> OrderResponse:
        try:
            total_amount_decimal = Decimal(str(totalAmount))
            order = Order.objects.create(
                user_id=userId,  # Database field
                total_amount=total_amount_decimal,  # Database field
                status=status,
            )
            return OrderResponse(
                success=True,
                message="Order created successfully!",
                order=OrderType(
                    id=order.id,
                    userId=order.user_id,  # Map to camelCase
                    totalPrice=order.total_amount,  # Map to camelCase
                    status=order.status,
                    items=[],
                ),
            )
        except Exception as e:
            return OrderResponse(
                success=False, message=f"Failed to create order: {str(e)}", order=None
            )


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