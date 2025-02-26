# Backend Store Online

## Testing Registration and Login

To test registration and login using your Django application with Chokidar and Strawberry GraphQL, follow these steps. You can use a GraphQL client like **Postman, Insomnia, or GraphiQL**.

### Step 1: Start Your Django Server

Ensure your Django server is running before testing. Start the server with:

```bash
python manage.py runserver
```

### Step 2: Testing Registration

1. **Open your GraphQL client** (e.g., GraphiQL or Postman).
2. **Use the following mutation to register a new user**. Replace the values for `username`, `email`, and `password` with your desired inputs:

```graphql
mutation {
  register(
    username: "testuser"
    email: "testuser@example.com"
    password: "securepassword"
  )
}
```

3. **Expected Response:**

```json
{
  "data": {
    "register": "User testuser registered successfully!"
  }
}
```

4. **Check for errors:** If there are validation errors (e.g., username already taken), they will be returned in the response.

### Step 3: Testing Login

1. **Use the following mutation to log in**. Provide the correct username and password:

```graphql
mutation {
  login(username: "testuser", password: "securepassword")
}
```

2. **Expected Response:**

```json
{
  "data": {
    "login": true
  }
}
```

3. **Query protected data:**

```graphql
query {
  protectedData
}
```

## Product Queries

### Fetch All Categories and Their Products

```graphql
query {
  allCategories {
    id
    name
    description
    products {
      id
      name
      price
      stock
    }
  }
}
```

### Fetch a Single Category by ID

```graphql
query {
  category(id: 1) {
    id
    name
    description
    products {
      id
      name
    }
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

### Fetch a Single Product by ID

```graphql
query {
  product(id: 1) {
    id
    name
    description
    price
    stock
    category {
      id
      name
    }
  }
}
```

