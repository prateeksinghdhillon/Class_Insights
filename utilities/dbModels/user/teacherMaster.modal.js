import { Schema, model } from "mongoose";
const classListModels = {};
export const TeacherModel = (schoolId) => {
  const modelName = `${schoolId}.teacher`;

  // Check if the model has already been created
  if (classListModels[modelName]) {
    return classListModels[modelName];
  }
  const teacherSchema = new Schema(
    {
      house: {
        type: String,
      },
      subject: [
        {
          type: String,
        },
      ],
      designation: {
        type: String,
      },
      emailId: {
        type: String,
      },
      photo: { type: String },
      name: {
        type: String,
      },
      bloodGroup: {
        type: String,
      },
      dob: { type: String },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      classCoordinated: {
        type: String,
      },
      classIds: [
        {
          type: String,
        },
      ],
      contactNumber: {
        type: String,
      },
      emergencyContactNumber: {
        type: String,
      },
      currentAdressSameAsPermanent: {
        type: Boolean,
      },
      currentAddress: {
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
      },
      permanentAddress: {
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
      },
      // in years
      experience: {
        type: String,
      },
      medicalHistory: {
        type: String,
      },
      createdBy: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  const TeacherDBModel = model(modelName, teacherSchema);
  classListModels[modelName] = TeacherDBModel;

  return TeacherDBModel;
};
