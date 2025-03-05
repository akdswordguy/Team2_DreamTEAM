# backend_store_online

To test registration and login using your Django application with Chokidar and Strawberry GraphQL, you can follow these steps. You can use a GraphQL client like Postman, Insomnia, or even a web interface like GraphiQL, which usually comes with Django projects set up for GraphQL.

### Step 1: Start Your Django Server

Before testing, make sure your Django server is running. You can start your server with:

```bash
python manage.py runserver
```

### Step 2: Testing Registration

1. **Open your GraphQL client** (for example, GraphiQL or Postman).

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
   If the registration is successful, you should receive a response similar to:

```json
{
  "data": {
    "register": "User testuser registered successfully!"
  }
}
```

4. **Check for errors:** If there are any validation errors (e.g., username already taken), they will be returned in the response.

### Step 3: Testing Login

1. **In the same GraphQL client, use the following mutation to log in**. Make sure to provide the correct username and password:

```graphql
mutation {
  login(username: "testuser", password: "securepassword")
}
```

2. **Expected Response:**
   If the login is successful, you should receive a response similar to:

```json
{
  "data": {
    "login": true
  }
}

query{
  protectedData
}



Product

++++++++++++++++++++++++





Fetch All Categories and Their Products

===================================

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



Fetch a Single Category by ID

====================================

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



 Fetch All Products

==============================



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



Fetch a Single Product by ID

===================================



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
