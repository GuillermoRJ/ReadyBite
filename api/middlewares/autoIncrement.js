import Counter from "../models/counter.js";

export const autoIncrementPlugin = (schema, options) => {
  const incField = options.inc_field || 'id';

  schema.add({
    [incField]: { type: Number, unique: true }
  });


  schema.pre("save", async function () {
    if (this.isNew) {
      const counter = await Counter.findOneAndUpdate(
        { id: incField },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true }
      );
      
      this[incField] = counter.seq;
    }
  });
};