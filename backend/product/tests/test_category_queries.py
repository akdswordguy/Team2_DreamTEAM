from django.test import TestCase
from typing import List
from strawberry.django.context import StrawberryDjangoContext
from django.test import RequestFactory
from django.http import HttpResponse
from product.schema import schema
from product.models import Category, Product


class CategoryQueryTests(TestCase):
    def setUp(self):
        # Create sample categories
        self.category1 = Category.objects.create(
            name="Linen",
            description="Linen products",
        )
        self.category2 = Category.objects.create(
            name="Cotton",
            description="Cotton-based clothing",
        )

        # Add Products to categories
        Product.objects.create(
            name="Linen Shirt",
            description="Premium linen shirt",
            price=49.99,
            stock=10,
            image_url="shirt.png",
            category=self.category1,
        )

        Product.objects.create(
            name="Cotton Polo",
            description="Smooth cotton polo",
            price=39.99,
            stock=20,
            image_url="cotton_polo.png",
            category=self.category2,
        )

    def test_all_categories(self):
        query = """
        query {
            allCategories {
                id
                name
                description
                products {
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
        self.assertEqual(len(result.data["allCategories"]), 2)
        self.assertEqual(result.data["allCategories"][0]["name"], "Linen")

    def test_category(self):
        query = """
        query GetCategory($id: Int!) {
            category(id: $id) {
                id
                name
                description
                products {
                    id
                    name
                }
            }
        }
        """
        request = RequestFactory().post("/graphql/")
        context = StrawberryDjangoContext(request=request, response=HttpResponse())
        variables = {"id": self.category1.id}
        result = schema.execute_sync(
            query, variable_values=variables, context_value=context
        )

        self.assertIsNone(result.errors)
        self.assertEqual(result.data["category"]["name"], "Linen")
        self.assertEqual(len(result.data["category"]["products"]), 1)
        self.assertEqual(result.data["category"]["products"][0]["name"], "Linen Shirt")