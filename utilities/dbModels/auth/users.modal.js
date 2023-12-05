import { Schema, model } from "mongoose";

export const UserModel = (schoolId) => {
  const residenceSchema = new Schema(
    {
      schoolId: {
        type: Number,
      },
      // schoolName: {
      //   type: String,
      // },
      // addressLine1: {
      //   type: String,
      // },
      // addressLine2: {
      //   type: String,
      // },
      // city: {
      //   type: String,
      // },
      // pinCode: {
      //   type: Number,
      // },
      // state: {
      //   type: String,
      // },
      // country: {
      //   type: String,
      // },
      // countryCode: {
      //   type: String,
      // },
      userId: {
        type: Number,
      },
      contactNumber: {
        type: String,
      },
      role: {
        type: String,
        enum: ["admin", "superAdmin", "student", "teacher", "parent"],
      },
      emailId: {
        type: String,
      },
      password: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  return model(`${schoolId}.users`, residenceSchema);
};
