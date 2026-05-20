import mongoose from "mongoose";

const complementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del complemento es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
);

const Complement = mongoose.model("Complement", complementSchema);

export default Complement;
