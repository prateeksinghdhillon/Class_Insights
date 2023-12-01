import { Schema, model } from "mongoose";
const schema = new Schema(
  {
    schoolName: {
      type: String,
    },
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    establishedYear: {
      type: String,
    },
    enlister: {
      type: String,
    },
    enlisterEmail: {
      type: String,
    },
    enlisterPassword: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const Registered_Schools = model("registeredschool", schema);
