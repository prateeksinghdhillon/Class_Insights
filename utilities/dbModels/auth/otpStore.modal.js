import { Schema, model } from "mongoose";
import { GLOBAL_CONSTANT } from "../../common/globalConstant";
const schema = new Schema(
  {
    otp: {
      type: String,
    },
    emailId: {
      type: String,
    },
    password: {
      type: String,
    },
    schoolId: {
      type: Number,
    },
    userType: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now() + 5 * 60 * 1000,
      index: { expires: "0s" },
    },
  },
  {
    timestamps: true,
  }
);
export const OtpStore = model("otpstore", schema);
