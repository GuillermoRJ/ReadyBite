import Counter from "../models/counter.js";

export const autoIncrementPlugin = (schema, options) => {
  const i = options.inc_field || "id";

  schema.add({
    [i]: { type: Number, unique: true },
  });

  schema.pre("save", async function (next) {
    if (this.isNew) {
      try {
        const counter = await Counter.findOneAndUpdate(
          { id: i },
          { $inc: { seq: 1 } },
          { new: true, upsert: true },
        );

        this[i] = counter.seq;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
};
