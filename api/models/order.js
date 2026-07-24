import mongoose from "mongoose";
import { autoIncrementPlugin } from "../plugins/autoIncrement.js"; 

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Toda orden debe estar asociada a un cliente"]
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Se debe agregar al menos 1 producto"]
      },
      addons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product" 
        }
      ],
      quantity: { 
        type: Number, 
        default: 1,
        min: 1
      },
      subTotal: { 
        type: Number, 
        required: true
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pendiente","completada", "cancelada"],
    default: "pendiente"
  }
}, {
  timestamps: true 
});

autoIncrementPlugin(orderSchema, { inc_field: 'orderId' });

const Order = mongoose.model("Order", orderSchema);

export default Order;