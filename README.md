# Product API

This is a baclend for an online store. You can add products, see them, change them, and delete them. You can also search for products by category or prrice, sort them, and se them a few at a time

I built it with Node.js, Express, MongoDB, and Mongoose.

# Overview

## How to Run It
 
1. Download the project and open the folder.
2. Install everything it needs:
```bash
npm install
```
 
3. Make a file called `.env` and put this in it:
```
MONGO_URI=your-mongodb-link
PORT=3006
```
 
4. Start the server:
```bash
node server.js
```
 
If it worked, the terminal will say it connected to MongoDB and that the server is running.
 
## What a Product Looks Like
 
```json
{
  "name": "Renaissance Tour Hoodie",
  "description": "Silver chrome logo hoodie",
  "price": 85,
  "category": "apparel",
  "tags": ["renaissance", "tour"]
}
```
 
- A product has to have a name, description, price, and category.
- The price has to be more than 0.
- `inStock` is set to true if you don't add it.
- The date it was made gets added by itself.
## Routes
 
All routes start with `http://localhost:3006/api/products`
 
| What it does | Method | Route |
|---|---|---|
| Add a product | POST | `/api/products` |
| See all products | GET | `/api/products` |
| See one product | GET | `/api/products/:id` |
| Change a product | PUT | `/api/products/:id` |
| Delete a product | DELETE | `/api/products/:id` |
 
Replace `:id` with the product's `_id`.
 
## Searching and Sorting
 
You can add these to the end of `/api/products`:
 
- `?category=apparel` shows only apparel
- `?minPrice=30` shows products $30 and up
- `?maxPrice=90` shows products $90 and under
- `?sortBy=price_asc` shows cheapest first
- `?sortBy=price_desc` shows most expensive first
- `?page=2&limit=5` shows page 2, with 5 products per page
You can use more than one at a time by putting `&` between them:
 
```
/api/products?category=apparel&maxPrice=90&sortBy=price_asc
```
 
## How I Tested It
 
I tested the routes with curl in the terminal and in the browser. I checked that I could add, see, change, and delete products, and that I got an error when I left out a name or put the price at 0.