import { Schema, model } from "mongoose";
const classListModels = {};

export const UserModel = (schoolId) => {
  const modelName = `${schoolId}.users`;

  // Check if the model has already been created
  if (classListModels[modelName]) {
    return classListModels[modelName];
  }
  const userSchema = new Schema(
    {
      schoolId: {
        type: Number,
      },
      userId: {
        type: String,
      },
      userType: {
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
  const UserModel = model(modelName, userSchema);
  classListModels[modelName] = UserModel;

  return UserModel;
};
