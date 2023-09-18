require("express-async-errors");
require("dotenv/config");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/AppError");

const app = express();
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
