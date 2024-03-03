import { Schema, model } from "mongoose";
const AttendanceListModels = {};

export const Attendance = (schoolId) => {
  const modelName = `${schoolId}.attendance`;

  // Check if the model has already been created
  if (AttendanceListModels[modelName]) {
    return AttendanceListModels[modelName];
  }
  const schema = new Schema(
    {
      classId: {
        type: String,
      }, // Reference to the class
      date: {
        type: String,
      },
      session: {
        type: String,
      }, // Academic session
      teacherId: { type: String },
      attendanceRecords: [
        {
          studentId: {
            type: String,
          }, // Reference to the student
          status: {
            type: String,
          }, // or "Absent" or other relevant statuses
        },
        // ... records for other students
      ],
    },
    {
      timestamps: true,
    }
  );
  // Create and cache the model
  const AttendanceModel = model(modelName, schema);
  AttendanceListModels[modelName] = AttendanceModel;

  return AttendanceModel;
};
