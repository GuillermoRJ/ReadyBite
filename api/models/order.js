import mongoose from "mongoose";

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
          sauce: {
            type: String,
            enum: ["mitad", "toda", "ninguna"],
            default: "ninguna",
          },

          complements: [
            {
              _id: false,
              complemento_id: {
                type: Schema.Types.ObjectId,
                ref: "Complemento",
                required: true,
              },
              name: { type: String, required: true },
            },
          ],
        },
      ],
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

const Order = mongoose.model("Order", orderSchema);

export default Order;
