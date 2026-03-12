const express = require("express");
const dotenv = require("dotenv");

// LOAD ENV FIRST
dotenv.config();

const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const errorHandler = require("./middleware/errorMiddleware");

// DEBUG LINE (temporary)
console.log("MONGO URI:", process.env.MONGO_URI);

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee API Running 🚀");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));