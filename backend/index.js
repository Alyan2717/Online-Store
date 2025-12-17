const express = require("express");
const connect = require("./config/db");
// const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

//Routes Initialization
const authRoute = require("./src/route/authRoute");
const productRoute = require("./src/route/productRoute");
const orderRoutes = require('./src/route/orderRoute');
const Order = require('./src/model/order');

const app = express();
const PORT = process.env.PORT || 3000;

// DB Connection
connect();

// Stripe Webhook Endpoint
app.post('/api/orders/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  let event;

  try {
    event = JSON.parse(req.body);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    await Order.findByIdAndUpdate(orderId, { status: "paid" });
  }

  res.json({ received: true });
});

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
// Use Routes
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});