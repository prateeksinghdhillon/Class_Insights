import { Schema, model } from "mongoose";
import { GLOBAL_CONSTANT } from "../../common/globalConstant";
const schema = new Schema(
  {
    tag: {
      type: String,
      enum: [
        GLOBAL_CONSTANT.OTP_TAG.FORGET_PASSWORD,
        GLOBAL_CONSTANT.OTP_TAG.REGISTER,
      ],
    },
    otp: {
      type: String,
    },
    emailId: {
      type: String,
    },
    userId: {
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
      default: Date.now() + GLOBAL_CONSTANT.OTP_EXPIRE_TIME,
      index: { expires: "0s" },
    },
  },
  {
    timestamps: true,
  }
);
export const OtpStore = model("otpstore", schema);
