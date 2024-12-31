import mongoose from "mongoose";

// Create schema for donations
const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'], // simple email validation
  },
  message: {
    type: String,
    required: false, // Optional field
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create donation model
const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
