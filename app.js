require("dotenv").config();
require("express-async-errors");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddlerware = require("./middlewares/error-handler");
const connectDB = require("./db/connect");

const express = require("express");
const productsRouter = require("./routes/products");
const app = express();

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store Api </h1><a href='/api/v1/products'>Products</a>");
});

app.use("/api/v1/products", productsRouter);

// products route
app.use(errorHandlerMiddlerware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
