import express from "express";
import productsRoute from "./routes/products.js";
import userRoute from "./routes/user.js";
import userEvent from "./routes/events.js"
import "./config/dbconnection.js";
import cors from 'cors';

const app = express();
const port = "8081";

// Generic Middlewares
app.use(express.json());
app.use(cors());

app.use("/", express.static("./../frontend/dist"))

// Routing middleware - no auth middleware here
app.use("/products", productsRoute);
app.use("/user", userRoute);
app.use("/events", userEvent);

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

app.listen(port, () => {
  console.log("The server is running on port: ", port);
});
