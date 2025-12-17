Online Store – Full Stack Web Application

Project Overview
This is a full-stack online store web application developed using Vue.js for the frontend and Node.js with Express for the backend. The application supports product browsing, cart management, secure checkout with Stripe, and an admin dashboard for managing products and orders.

Features

User Features
•	User registration and login
•	Product listing with search and pagination
•	Add/remove items from cart
•	Secure checkout using Stripe
•	Order creation and tracking

Admin Features
•	Admin login and role-based access
•	Product management (add, update, delete)
•	View all orders grouped by users
•	Update order status

Technology Stack

Frontend
•	Vue.js 3
•	Vue Router
•	Pinia
•	Axios
•	CSS (custom styling)

Backend
•	Node.js
•	Express.js
•	MongoDB + Mongoose
•	JWT Authentication
•	Stripe API

Installation & Setup

Backend Setup
cd backend
npm install
npm run dev
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key
FRONTEND_URL=http://localhost:5173

Frontend Setup
cd frontend
npm install
npm run dev

API Overview
•	POST /api/auth/signup
•	POST /api/auth/login
•	GET /api/products (search + pagination)
•	POST /api/orders
•	POST /api/orders/stripe-session
•	GET /api/orders (admin only)

Security
•	Password hashing
•	JWT-based authentication
•	Role-based route protection
•	Secure Stripe integration
