# Restaurant API Documentation

## Home Route

- `GET /`  
  Returns restaurant's information.

---

## User Routes

### `POST /user/register`

- **Required Fields:**
  - `name`: User's name  
  - `email`: User's email  
  - `password`: User's password  
  - `role`: User's role (Admin/User)  

---

### `POST /user/login`

- **Required Fields:**
  - `email`: User's email  
  - `password`: User's password  
- **Response:**  
  - Returns a token and user information.

---

### `POST /user/logout`

- **Required Fields:**
  - `token`: from `req.headers.authorization`

---

### `GET /user/`

- **Access:** Protected — requires authentication.  
- **Response:**  
  - Returns the logged-in user's profile information.

---

## Menu Routes

### `GET /menu/`

- Returns all menu items.  
- **Query Parameters:**
  - `page`: Page number (e.g., `1`)  
  - `limit`: Number of items per page (e.g., `10`)  
  - `category`: Filter by category (e.g., `salad`)  
  - `minprice`: Minimum price (e.g., `20`)  
  - `maxprice`: Maximum price (e.g., `200`)  
  - `q`: Search query (e.g., `chapati`)

---

### `GET /menu/:id`

- Returns a single menu item by its ID.

---

## Admin Routes

> All admin routes require authentication and an `admin` role.

### `POST /admin/menu/reset`

- Resets the entire menu back to the default items from the seed file.

---

### `POST /admin/menu/`

- Adds a new menu item.  
- **Required Fields:**
  - `name`: Item name  
  - `description`: Item description  
  - `price`: Item price  
  - `category`: Item category  
  - `image`: Item image  

---

### `PATCH /admin/menu/:id`

- Updates an existing menu item.  
- **At least one of the following fields is required:**
  - `name`: Updated item name  
  - `description`: Updated item description  
  - `price`: Updated item price  
  - `category`: Updated item category  
  - `image`: Updated item image  

---

### `DELETE /admin/menu/:id`

- Removes a menu item from the database.

---

### `GET /admin/order`

- Returns all orders.  
- **Query Parameters:**
  - `status`: Filter orders by status (e.g., `Pending`, `Preparing`, `Delivered`)

---

### `PATCH /admin/order/:id`

- Updates the status of an order.  
- **Required Fields:**
  - `status`: `Pending`, `Preparing`, or `Delivered`
- **Response:**  
  - Returns a plain string `"order updated"`.

---

### `POST /admin/user`

- Returns user information.  
- **Optional Body Fields:**
  - `userid`: Filter by a specific user's ID. If omitted, returns all users.

---

## Wishlist Routes

### `GET /wishlist/`

- Returns the user's wishlisted items.

---

### `POST /wishlist/`

- Adds an item to the wishlist.  
- **Required Fields:**
  - `itemid`

---

### `DELETE /wishlist/:id`

- Removes a wishlisted item from the user's account.  
- **Required Fields:**
  - `id`: From URL parameter  

---

## Cart Routes

### `GET /cart/`

- Returns the user's cart with items and total price.

---

### `POST /cart/`

- Adds an item to the cart.  
- **Required Fields:**
  - `itemid`  
  - `quantity`

---

### `PATCH /cart/:id`

- Updates the quantity of an item in the cart.  
- **Required Fields:**
  - `id`: From URL parameter  
  - `quantity`

---

### `DELETE /cart/:id`

- Removes an item from the cart.  
- **Required Fields:**
  - `id`: From URL parameter  

---

## Order Routes

### `POST /order/`

- Returns the user's order list.  
- **Query Parameters:**
  - `status`: Filter orders by status (e.g., `Pending`)
- **Optional Body Fields:**
  - `userName`: Filter by user name (if not authenticated)
  - `userPhone`: Filter by user phone (if not authenticated)

---

### `POST /order/new`

- Creates a new order and sends a confirmation email if `userMail` is provided.  
- **Required Fields:**
  - `cart`: The cart object (containing `items` and `totalprice`)
  - `userName`: Customer's name
  - `userPhone`: Customer's phone number
  - `userAddress`: Delivery address
- **Optional Fields:**
  - `userMail`: Customer's email (triggers confirmation email)
  - `userMSG`: Custom message for the order
- **Response:**  
  - Returns the created order object and a `"Order placed"` message.
