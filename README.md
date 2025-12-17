# 🛒 Online Store – Full Stack Web Application

## 📝 Project Overview
This is a full-stack online store web application developed using **Vue.js** for the frontend and **Node.js** with **Express** for the backend. The application supports a seamless shopping experience including product browsing, cart management, secure checkout with Stripe, and a dedicated admin dashboard for inventory and order management.

---

## ✨ Features

### 👤 User Features
* **Authentication:** Secure user registration and login.
* **Product Discovery:** Product listing with integrated search and pagination.
* **Cart Management:** Easily add or remove items from the shopping cart.
* **Secure Checkout:** Professional payment processing using the **Stripe API**.
* **Order History:** Real-time order creation and status tracking.

### 🔑 Admin Features
* **Admin Dashboard:** Role-based access control for security.
* **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for the store catalog.
* **Order Management:** View all customer orders grouped by user.
* **Status Updates:** Update order fulfillment and shipping statuses.

---

## 🛠 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vue.js 3, Vue Router, Pinia, Axios, Custom CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JSON Web Tokens (JWT) & Password Hashing |
| **Payments** | Stripe API |

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
### 2. Backend Setup
* cd backend
* npm install
* Create a .env file in the /backend directory and add your credentials:
* PORT=3000
* MONGO_URI=your_mongodb_connection_string
* JWT_SECRET=your_secret_key
* STRIPE_SECRET_KEY=your_stripe_secret_key
* FRONTEND_URL=http://localhost:5173

* npm run dev

### 3. Frontend Setup
* cd ../frontend
* npm install
* npm run dev

🚀 API Overview
## 🚀 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/signup` | Register a new user |
| **POST** | `/api/auth/login` | Authenticate user and return token |
| **GET** | `/api/products` | Retrieve products (supports search & pagination) |
| **POST** | `/api/orders` | Create a new order |
| **POST** | `/api/orders/stripe-session` | Create Stripe checkout session |
| **GET** | `/api/orders` | View all orders (Admin Only) |

## 🔒 Security
* **Password Hashing:** Uses industry-standard algorithms (Bcrypt) to protect user credentials.
* **JWT Authentication:** Secure token-based access for all protected routes.
* **Role-Based Protection:** Backend middleware ensures only admins can access management tools.
* **Stripe Integration:** Professional, PCI-compliant payment handling.
