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
  },
  {
    timestamps: true,
  }
);
export const OtpStore = model("otpstore", schema);
