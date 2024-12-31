import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // OTP expires in 5 minutes
  }
});

const OtpModel = mongoose.model("otp", userSchema);

OtpModel.storeOtp = async (user, successCallback, errorCallback) => {
  try {
    const newUser = await OtpModel.create({
      email: user.email,
      name: user.name,
      otp: user.otp
    });
    
    successCallback({ user: newUser });
  } catch (error) {
    console.error("StoreOTP Error:", error);
    errorCallback({ status: 500, message: "Failed to store OTP" });
  }
};

OtpModel.getOtp = async (email, successCallback, errorCallback) => {
  try {
    const user = await OtpModel.findOne({ email });
    if (!user) {
      return errorCallback({ status: 404, message: "User not found" });
    }
    successCallback({ otp: user.otp });
  } catch (error) {
    console.error("GetOTP Error:", error);
    errorCallback({ status: 500, message: "Failed to get OTP" });
  }
};

OtpModel.deleteOtp = async (email, successCallback, errorCallback) => {
  try {
    const result = await OtpModel.deleteOne({ email });
    if (result.deletedCount === 0) {
      return errorCallback({ status: 404, message: "User not found" });
    }
    successCallback({ message: "OTP deleted successfully" });
  } catch (error) {
    console.error("DeleteOTP Error:", error);
    errorCallback({ status: 500, message: "Failed to delete OTP" });
  }
};

export default OtpModel;