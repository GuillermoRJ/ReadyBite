import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  id: {
    type: String,
    alias: "phone",
    match: [/^\d{10}$/, "El número debe tener exactamente 10 dígitos"],
    required: [true, "El teléfono es obligatorio"],
    description: "El número (ID) debe de ser de 10 caracteres numéricos",
    unique: true,
  },
  name: {
    type: String,
    required: [true, "El nombre del cliente es obligatorio"],
    minLength: [6, "El nombre y apellidos están incompletos"],
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
