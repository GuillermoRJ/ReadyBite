import mongoose from "mongoose";
import { autoIncrementPlugin } from "../middlewares/autoIncrement.js";

const orderSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },

    products: {
      type: [
        {
          _id: false,
          producto_id: {
            type: Schema.Types.ObjectId,
            ref: "Producto",
            required: true,
          },
          name: { type: String, required: true },
          price: { type: Number, required: true },

          description: {
            required: true,
          },
        },
      ],
      complements: {
        type: [
          {
            _id: false,
            producto_id: {
              type: Schema.Types.ObjectId,
              ref: "Producto",
              required: true,
            },
            name: { type: String, required: true },
            price: { type: Number, required: true },

            description: {
              required: true,
            },
          },
        ],
      },
      salsa: {
        type: String,
        enum: ["mitad", "toda", "ninguna"],
        default: "toda",
      },
      validate: [
        (v) => v.length > 0,
        "La orden debe tener al menos un producto",
      ],
    },

    total_order: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: { createdAt: "hora_creacion", updatedAt: "hora_actualizacion" },
  },
);
orderSchema.plugin(autoIncrementPlugin, { inc_field: "orderId" });

const Order = mongoose.model("Order", orderSchema);

export default Order;
