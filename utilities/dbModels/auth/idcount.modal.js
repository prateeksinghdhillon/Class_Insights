import { Schema, model } from "mongoose";
const schema = new Schema({
  sequenceValue: {
    type: Number,
  },
  initialValue: {
    type: Number,
  },
});
export const IdCount = model("idcount", schema);
