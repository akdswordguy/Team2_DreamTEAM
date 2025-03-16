from django.test import TestCase
from strawberry.django.context import StrawberryDjangoContext
from django.test import RequestFactory
from django.http import HttpResponse
from product.models import Category, Product
from product.schema import schema


class ProductQueryTests(TestCase):
    def setUp(self):
        # Create a sample category
        self.category = Category.objects.create(
            name="Electronics",
            description="Electronic items",
        )
        # Create test products under the category
        self.product1 = Product.objects.create(
            name="Smartphone",
            description="A modern smartphone",
            price=599.99,
            stock=50,
            image_url="smartphone.png",
            category=self.category,
        )
        self.product2 = Product.objects.create(
            name="Laptop",
            description="A powerful laptop",
            price=999.99,
            stock=30,
            image_url="laptop.png",
            category=self.category,
        )

    def test_all_products(self):
        query = """
        query {
            allProducts {
                id
                name
                price
                category {
                    id
                    name
                }
            }
        }
        """
        request = RequestFactory().post("/graphql/")
        context = StrawberryDjangoContext(request=request, response=HttpResponse())
        result = schema.execute_sync(query, context_value=context)

        self.assertIsNone(result.errors)
        self.assertEqual(len(result.data["allProducts"]), 2)
        self.assertEqual(result.data["allProducts"][0]["name"], "Smartphone")

    def test_product(self):
        query = """
        query GetProduct($id: Int!) {
            product(id: $id) {
                id
                name
                description
                price
                stock
            }
        }
        """
        request = RequestFactory().post("/graphql/")
        context = StrawberryDjangoContext(request=request, response=HttpResponse())
        variables = {"id": self.product1.id}
        result = schema.execute_sync(
            query, variable_values=variables, context_value=context
        )

        self.assertIsNone(result.errors)
        self.assertEqual(result.data["product"]["name"], "Smartphone")
        self.assertEqual(float(result.data["product"]["price"]), 599.99)