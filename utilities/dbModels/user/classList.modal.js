import { Schema, model } from "mongoose";
const classListModels = {};

export const ClassList = (schoolId) => {
  const modelName = `${schoolId}.classe`;

  // Check if the model has already been created
  if (classListModels[modelName]) {
    return classListModels[modelName];
  }
  const classSchema = new Schema(
    {
      className: {
        type: String,
      },
      classCoordinater: {
        type: String,
      },
      teacherIds: [
        {
          type: String,
        },
      ], // Reference to the teacher teaching this class
      studentIds: [
        {
          type: String,
        },
      ], // References to students in this class
      createdBy: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  // Create and cache the model
  const ClassModel = model(modelName, classSchema);
  classListModels[modelName] = ClassModel;

  return ClassModel;
};
