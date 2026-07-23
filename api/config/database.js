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
    const InitProducts = [
      {
        name: "Ramen Tradicional",
        price: 140,
        type: "producto",
      },
      {
        name: "Ramen Gyoza",
        price: 170,
        type: "producto",
      },
      {
        name: "Ramen Sin Prote",
        price: 115,
        type: "producto",
      },
      {
        name: "Ramen Base",
        price: 95,
        type: "producto",
      },
      {
        name: "Pork belly",
        price: 20,
        type: "complemento",
      },
      {
        name: "Gyoza",
        price: 20,
        type: "complemento",
      },
      {
        name: "Huevo",
        price: 15,
        type: "complemento",
      },
      {
        name: "Queso",
        price: 15,
        type: "complemento",
      },
      {
        name: "Cebollin",
        price: 5,
        type: "complemento",
      },
      {
        name: "Espinaca",
        price: 5,
        type: "complemento",
      },
    ];

    for (const product of InitProducts) {
      try {
        await Product.create(product);
        console.log(`✅ ${product.name} guardado con éxito.`);
      } catch (error) {
        console.error(`❌ Falló al guardar ${product.name}:`, error.message);
      }
    }
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
