const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
      enum: ["HR", "IT", "Finance", "Marketing", "Sales", "Other"],
    },

    designation: {
      type: String,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0, // positive validation
    },

    dateOfJoining: {
      type: Date,
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);