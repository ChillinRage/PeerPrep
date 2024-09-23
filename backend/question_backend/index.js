const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MONGO_URL, QUESTION_PORT } = process.env;
const questionRoutes = require("./routes/question-route");

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Question Backend: MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(QUESTION_PORT, () => {
  console.log(`Question server is listening on port ${QUESTION_PORT}`);
});

// Middleware
app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/questions", questionRoutes);