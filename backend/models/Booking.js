const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pickup: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },

    startDateTime: {
      type: String,
      required: true,
    },

    endDateTime: {
      type: String,
      required: true,
    },

    tripType: {
     type: String,
     required: true,
    },

    vehicle: {
     type: String,
     required: true,
    },

    fuel: {
     type: String,
     required: true,
    },

    language: {
     type: String,
     default: "",
    },

    special: {
     type: String,
     default: "",
    },
     
    
    status: {
      type: String,
      enum: [
        "Searching Driver",
        "Driver Assigned",
        "On Trip",
        "Completed",
        "Cancelled",
      ],
      default: "Searching Driver",
    },

    fare: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);