from faker import Faker
import random

# Initialize the Faker instance
fake = Faker()

# Predefined categories to mimic Amazon-like categories
categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Health & Beauty",
    "Home & Kitchen",
    "Sports & Outdoors",
    "Automotive",
    "Toys & Games",
    "Grocery",
    "Furniture",
]


# Function to generate a single product
def generate_product():
    return {
        "id": fake.uuid4(),
        "name": fake.catch_phrase(),  # Generates a realistic sounding product name
        "category": random.choice(categories),  # Randomly select a category
        "price": round(random.uniform(5, 1000), 2),  # Random price between $5 and $1000
        "description": fake.text(max_nb_chars=200),  # Random product description
        "stock_quantity": random.randint(1, 500),  # Random stock quantity
        "rating": round(random.uniform(1, 5), 1),  # Random rating between 1 and 5
        "image_url": fake.image_url(),  # Generates a fake URL for a product image
    }


# Generate a list of products
def generate_products(num_products=100):
    return [generate_product() for _ in range(num_products)]


# Function to generate category data
def generate_categories():
    return [{"id": fake.uuid4(), "name": category} for category in categories]


# Generate data
if __name__ == "__main__":
    num_products = 50  # Specify how many products you want to generate
    products = generate_products(num_products)
    categories_data = generate_categories()

    # Print categories
    print("Categories:")
    for category in categories_data:
        print(category)

    # Print a preview of products
    print("\nProducts:")
    for product in products[:5]:  # Display the first 5 products
        print(product)
