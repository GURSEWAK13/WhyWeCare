import express from "express";
import userRoute from "./routes/user.js";
import userEvent from "./routes/events.js"
import adminAuth from "./routes/auth.js"
import Donation from "./routes/donation.js";
import userEvent_state from "./routes/events_state.js"
import "./config/dbconnection.js";
import { config } from './config/config.js';

const app = express();

// Generic Middlewares
app.use(express.json());
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// app.use("/", express.static("./../frontend/dist"))

// Routing middleware
// app.use("/products", productsRoute);
app.use("/user", userRoute);
app.use("/events", userEvent);
app.use("/auth", adminAuth);
app.use("/donation", Donation);
app.use("/events_state", userEvent_state);

app.get("/", (req, res) => {
  res.send("hello world again");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});
