import { Schema, model } from "mongoose";
const classListModels = {};
export const StudentModel = (schoolId) => {
  const modelName = `${schoolId}.student`;

  // Check if the model has already been created
  if (classListModels[modelName]) {
    return classListModels[modelName];
  }
  const studentSchema = new Schema(
    {
      house: {
        type: String,
      },
      emailId: {
        type: String,
      },
      initialPassword: { type: String },
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
      classId: {
        type: String,
      },
      rollNo: {
        type: String,
      },
      schoolSiralNumber: {
        type: String,
      },
      contactNumber: {
        type: String,
      },
      guardianContactNumber: {
        type: String,
      },
      guardianEmail: {
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
        countryCode: {
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
        countryCode: {
          type: String,
        },
      },
      motherName: {
        type: String,
      },
      fatherName: {
        type: String,
      },
      skills: [
        {
          type: String,
        },
      ],
      hobbies: [
        {
          type: String,
        },
      ],
      isQuit: {
        default: false,
        type: Boolean,
      },
      modeOfTransport: {
        type: String,
      },
      medicalHistory: {
        type: String,
      },
      height: {
        type: String,
      },
      weight: {
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
  const StudentDBModel = model(modelName, studentSchema);
  classListModels[modelName] = StudentDBModel;

  return StudentDBModel;
};
