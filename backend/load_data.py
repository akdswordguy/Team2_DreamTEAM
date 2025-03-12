import os
import csv
import random
import ast
import django

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend_store_online.settings")  # Update to your project name
django.setup()

from product.models import Product, Category  # Import models

# Folder where CSV files are stored
CSV_FOLDER = "./data"


def clean_product_images(value):
    if not value or not isinstance(value, str) or value == "None":
        return ""

    try:
        if value.startswith("http"):
            return value.split(",")[0].strip()

        image_list = ast.literal_eval(value)
        if isinstance(image_list, list) and all(isinstance(item, dict) for item in image_list):
            urls = [list(item.keys())[0] for item in image_list]
            return urls[0].strip() if urls else ""

        return ""

    except Exception as e:
        print(f"Error processing product_images value: {value}, Error: {e}")
        return ""


def load_products_to_database():
    try:
        for filename in os.listdir(CSV_FOLDER):
            if filename.endswith(".csv"):
                category_name = os.path.splitext(filename)[0]
                
                # Get or create category
                category, created = Category.objects.get_or_create(name=category_name)

                with open(os.path.join(CSV_FOLDER, filename), "r") as csvfile:
                    reader = csv.DictReader(csvfile)
                    reader.fieldnames = [header.strip() for header in reader.fieldnames]
                    print(f"Cleaned CSV Headers: {reader.fieldnames}")  

                    for row in reader:
                        name = row.get("product_name", "").strip()
                        description = row.get("details", "")
                        price = float(row.get("price", "0").replace("₹", "").replace(",", "").strip())
                        raw_product_images = row.get("product_images", "").strip()
                        
                        if not raw_product_images:
                            print(f"Skipping row with blank product_images: {row}")
                            continue

                        image_url = clean_product_images(raw_product_images)
                        print(f"Processed image_url: {image_url}")

                        stock = random.randint(1, 100)  

                        # Insert data using Django ORM
                        Product.objects.create(
                            name=name,
                            description=description,
                            price=price,
                            stock=stock,
                            category=category,
                            image_url=image_url,
                        )

        print("Products successfully inserted into the database.")

    except Exception as e:
        print(f"Error: {e}")


# Main function
if __name__ == "__main__":
    load_products_to_database()
