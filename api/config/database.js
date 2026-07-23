import mongoose from "mongoose";
import Customer from "../models/customer.js";
import Product from "../models/product.js";

const seedCustomers = async () => {
  const count = await Customer.countDocuments();
  if (count === 0) {
    await Customer.insertMany([
      {
        id: "4493914627",
        name: "Guillermo Jáuregui",
      },
      {
        id: "3341014327",
        name: "Jorge Ruiz",
      },
      {
        id: "4491643736",
        name: "Ximena Ballin",
      },
    ]);
  }
};

const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      {
        productId: 1,
        name: "Ramen Tradicional",
        price: 140,
        type: "producto"
      },
      {
        productId: 2,
        name: "Ramen Gyoza",
        price: 170,
        type: "producto"
      },
      {
        productId: 3,
        name: "Ramen Sin Prote",
        price: 115,
        type: "producto"
      },
      {
        productId: 4,
        name: "Ramen Base",
        price: 95,
        type: "producto"
      },
      {
        productId: 5,
        name: "Pork belly",
        price: 20,
        type: "complemento"
      },
      {
        productId: 6,
        name: "Gyoza",
        price: 20,
        type: "complemento"
      },
      {
        productId: 7,
        name: "Huevo",
        price: 15,
        type: "complemento"
      },
      {
        productId: 8,
        name: "Queso",
        price: 15,
        type: "complemento"
      },
      {
        productId: 9,
        name: "Cebollin",
        price: 5,
        type: "complemento"
      },
      {
        productId: 10,
        name: "Espinaca",
        price: 5,
        type: "complemento"
      },
    ]);
  }
};

const dbConnection = async () => {
  try {
    const dbURI = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;
    await mongoose.connect(`${dbURI}/${dbName}`);
    console.log(`MongoDB is connected`);
    await seedCustomers();
    await seedProducts();
    console.log("Default menu and clients created");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

export default dbConnection;
