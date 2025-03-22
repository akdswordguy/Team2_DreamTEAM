import strawberry
from typing import List
from .models import Category, Product, Order, OrderItem
from .mutations import (
    ProductType,
    OrderType,
    OrderItemType,
)


@strawberry.type
class ProductType:
    id: int
    name: str
    description: str
    price: float
    stock: int
    image_url: str
    category: "CategoryType"


@strawberry.type
class CategoryType:
    id: int
    name: str
    description: str
    products: List[ProductType]

    @strawberry.field
    def products(self) -> List[ProductType]:
        return Product.objects.filter(category_id=self.id)


@strawberry.type
class Query:
    @strawberry.field
    def all_categories(self) -> List[CategoryType]:
        return Category.objects.all()

    @strawberry.field
    def category(self, id: int) -> CategoryType:
        return Category.objects.get(pk=id)

    @strawberry.field
    def all_products(self) -> List[ProductType]:
        return Product.objects.all()

    @strawberry.field
    def product(self, id: int) -> ProductType:
        return Product.objects.get(pk=id)

    # New Order Queries
    @strawberry.field
    def all_orders(self) -> List[OrderType]:
        return Order.objects.all()

    @strawberry.field
    def order(self, id: int) -> OrderType:
        return Order.objects.get(pk=id)

    # New OrderItem Queries
    @strawberry.field
    def all_order_items(self) -> List[OrderItemType]:
        return OrderItem.objects.all()

    @strawberry.field
    def order_items_by_order(self, order_id: int) -> List[OrderItemType]:
        return OrderItem.objects.filter(order_id=order_id)

    @strawberry.field
    def order_item(self, id: int) -> OrderItemType:
        return OrderItem.objects.get(pk=id)