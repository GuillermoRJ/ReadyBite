import mongoose from "mongoose";
import Client from "../models/client.js";
import Product from "../models/product.js";

const seedClients = async () => {
  const count = await Client.countDocuments();
  if (count === 0) {
    await Client.insertMany([
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
        name: "Ramen Tradicional",
        price: 140,
      },
      {
        name: "Ramen Gyoza",
        price: 170,
      },
      {
        name: "Ramen Sin Prote",
        price: 115,
      },
      {
        name: "Ramen Base",
        price: 95,
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
    await seedClients();
    await seedProducts();
    console.log("Default menu and clients created");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
};

export default dbConnection;
