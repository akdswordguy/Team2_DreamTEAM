import strawberry
from typing import List
from .models import Category, Product
from .mutations import ProductType


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
