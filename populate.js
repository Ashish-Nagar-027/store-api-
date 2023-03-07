// const mongoose = require('mongoose')

require("dotenv").config();

const Product = require("./models/products");

const products = require("./products.json");

const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    Product.deleteMany();
    Product.create(products);
    console.log("sucess true");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
