# LUXORA

## Overview
Luxora is an e-commerce platform built using **Next.js, Django, GraphQL (Strawberry), and Chokidar**. The platform supports user authentication, product management, and a shopping cart. Admins can manage products via the Django admin panel, and users can browse products, add them to their cart, and receive order confirmation emails upon checkout.

## Features
- **User Authentication**: Register and log in using GraphQL mutations.
- **Admin Panel**: Add, update, and delete products via Django Admin.
- **Product Selection**: Browse products in the shop section.
- **Add to Cart**: Only logged-in users can add products to their cart.
- **Checkout with Email Notification**: Users receive an email upon successful checkout.
- **GraphQL API**: Efficient querying with Strawberry GraphQL.
- **Real-time File Watching**: Chokidar monitors changes in the backend.
- **Testing**: The application is tested using **Vitest, Cypress, and Django’s Unittest framework**.

## Tech Stack
- **Frontend**: Next.js
- **Backend**: Django, Strawberry GraphQL
- **Database**: PostgreSQL (or SQLite for development)
- **File Watching**: Chokidar
- **Testing**: Vitest (Frontend), Cypress (End-to-End), Django Unittest (Backend)

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Python 3.8+
- Node.js 16+
- PostgreSQL (optional, SQLite can be used for development)

### Backend Setup

1. Clone the repository:
   ```bash
   git https://github.com/akdswordguy/Team2_DreamTEAM.git
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd shoppingapp/
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

## Testing

### Backend Testing
- **Django Unittest**:
  ```bash
  python manage.py test
  ```

### Frontend Testing
- **Vitest**:
  ```bash
  npm run test
  ```
- **Cypress (E2E Testing)**:
  ```bash
  npx run cypress
  ```


### User Registration
```graphql
mutation {
  register(
    username: "testuser"
    email: "testuser@example.com"
    password: "securepassword"
  )
}
```
**Response:**
```json
{
  "data": {
    "register": "User testuser registered successfully!"
  }
}
```

### User Login
```graphql
mutation {
  login(username: "testuser", password: "securepassword")
}
```
**Response:**
```json
{
  "data": {
    "login": true
  }
}
```

### Fetch All Products
```graphql
query {
  allProducts {
    id
    name
    price
    stock
    category {
      id
      name
    }
  }
}
```

### Checkout (Email Confirmation Sent)
Once the user clicks checkout, an email will be sent confirming their purchase.

## Admin Panel
To manage products, navigate to:
```
http://127.0.0.1:8000/admin/
```
Log in using the superuser credentials created earlier.

## License
This project is licensed under the Apache License.



---


