import mongoose from "mongoose";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constant.js";
import crypto from "crypto";
import { sendVerificationEmail, sendLoginNotification, generateOTP } from "../utils/emailService.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  otp: String,
  otpExpires: Date
});

const UserModel = mongoose.model("user", userSchema);

UserModel.getUser = async (req, successCallback, errorCallback) => {
  const emailFromReq = req?.params?.email;
  const emailFromAuthToken = req?.emailFromAuthToken;

  console.log("The req.emailFromAuthToken is: ", req.emailFromAuthToken);

  if (emailFromReq !== emailFromAuthToken) {
    errorCallback({ status: 401, message: "Invalid credentials" });
  }

  try {
    const dbRes = await UserModel.find({ email: emailFromReq });
    console.log("GET | dbRes is: ", dbRes);
    successCallback(dbRes);
  } catch (dbErr) {
    console.error("GET | dbErr is: ", dbErr.Error);
    errorCallback(dbErr);
  }
};

UserModel.signIn = async (user, successCallback, errorCallback) => {
  try {
    const dbRes = await UserModel.findOne({ email: user.email });
    if (!dbRes) {
      errorCallback({ status: 404, message: "User does not exist" });
      return;
    }

    if (!dbRes.isVerified) {
      errorCallback({ status: 403, message: "Please verify your email first" });
      return;
    }

    const isPasswordMatch = await brcypt.compare(user.password, dbRes.password);
    
    if (isPasswordMatch) {
      const token = jwt.sign({
        email: dbRes.email,
        name: dbRes.name,
        state: dbRes.state,
        city: dbRes.city
      }, JWT_SECRET_KEY, { expiresIn: '24h' });

      // Send login notification
      const deviceInfo = {
        device: user.deviceInfo?.device || 'Unknown',
        browser: user.deviceInfo?.browser || 'Unknown',
        location: user.deviceInfo?.location || 'Unknown'
      };
      
      await sendLoginNotification(dbRes.email, new Date().toISOString(), deviceInfo);
      
      successCallback({
        token: token,
        user: {
          name: dbRes.name,
          email: dbRes.email,
          state: dbRes.state,
          city: dbRes.city
        }
      });
    } else {
      errorCallback({ status: 401, message: "Invalid email or password" });
    }
  } catch (error) {
    errorCallback({ status: 500, message: "Internal server error" });
  }
};

UserModel.register = async (user, successCallback, errorCallback) => {
  // Validate required fields
  if (!user.name || !user.email || !user.password || !user.state || !user.city) {
    errorCallback({ status: 400, message: "All fields are required" });
    return;
  }

  try {
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = await UserModel.create({
      name: user.name,
      email: user.email,
      password: brcypt.hashSync(user.password, 10),
      state: user.state,
      city: user.city,
      otp,
      otpExpires
    });

    const emailSent = await sendVerificationEmail(user.email, otp);
    if (!emailSent) {
      await UserModel.deleteOne({ _id: newUser._id });
      errorCallback({ status: 500, message: "Error sending verification email" });
      return;
    }

    const token = jwt.sign({
      email: newUser.email,
      name: newUser.name,
      state: newUser.state,
      city: newUser.city
    }, JWT_SECRET_KEY, { expiresIn: '24h' });

    successCallback({
      email: newUser.email,
      message: "Please check your email for OTP verification"
    });
  } catch (error) {
    errorCallback({ status: 500, message: "Error registering user" });
  }
};

UserModel.verifyEmail = async (token, successCallback, errorCallback) => {
  try {
    const user = await UserModel.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      errorCallback({ status: 400, message: "Invalid or expired verification token" });
      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    successCallback({ message: "Email verified successfully" });
  } catch (error) {
    errorCallback({ status: 500, message: "Error verifying email" });
  }
};

UserModel.verifyOTP = async (email, otp, successCallback, errorCallback) => {
  try {
    const user = await UserModel.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user) {
      errorCallback({ status: 400, message: "Invalid or expired OTP" });
      return;
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const authToken = jwt.sign({ email: user.email }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    successCallback({
      token: authToken,
      user: {
        name: user.name,
        email: user.email,
        state: user.state,
        city: user.city
      }
    });
  } catch (error) {
    errorCallback({ status: 500, message: "Error verifying OTP" });
  }
};

export default UserModel;
