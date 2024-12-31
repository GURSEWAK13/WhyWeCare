import mongoose from "mongoose";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constant.js";
import nodemailer from "nodemailer";
import OtpModel from "./otp.js";
// import {email,pass} from "../config/constant.js"
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "gursewaksingh3789@gmail.com",
    pass: "qdry mlfr ayav xfww"
  }
});

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
});

const UserModel = mongoose.model("admin_user", userSchema);

UserModel.register = async (user, successCallback, errorCallback) => {
  if (!user.email) {
    return errorCallback({ status: 400, message: "Email is required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
        console.log(existingUser);
      return errorCallback({ status: 409, message: "Email already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await OtpModel.storeOtp({
      email: user.email,
      name: user.name,
      otp: otp
    }, 
    async () => {
      const mailOptions = {
        from: 'gursewaksingh3789@gmail.com',
        to: user.email,
        subject: 'Registration OTP',
        text: `Your OTP for registration is: ${otp}`
      };
      
      await transporter.sendMail(mailOptions);
      successCallback({ message: 'OTP sent successfully' });
    }, 
    (error) => errorCallback(error));

  } catch (error) {
    console.error('Registration error:', error);
    errorCallback({ status: 500, message: "Registration failed" });
  }
};

UserModel.verify_otp = async (user, successCallback, errorCallback) => {
  if (!user.email || !user.otp || !user.password || !user.name) {
    return errorCallback({ status: 400, message: "All fields are required" });
  }

  try {
    const otpRecord = await OtpModel.getOtp(user.email, 
      async (data) => {
        if (data.otp !== user.otp) {
          return errorCallback({ status: 400, message: "Invalid OTP" });
        }

        const encryptedPassword = await brcypt.hash(user.password, 10);
        const newUser = await UserModel.create({
          name: user.name,
          email: user.email,
          password: encryptedPassword,
        });

        const authToken = jwt.sign({ email: newUser.email }, JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        await OtpModel.deleteOtp(user.email, 
          () => successCallback({ token: authToken, user: newUser }),
          (error) => errorCallback(error)
        );
      },
      (error) => errorCallback(error)
    );

  } catch (error) {
    console.error('Verification error:', error);
    errorCallback({ status: 500, message: "Verification failed" });
  }
};

UserModel.signin = async (user, successCallback, errorCallback) =>{
    try {
        const dbRes = await UserModel.findOne({ email: user.email });
        if (!dbRes) {
          errorCallback({ status: 404, message: "User does not exist" });
          return;
        }
    
        console.log("SignIn | dbRes is: ", dbRes);
        const isPasswordMatch = brcypt.compareSync(user.password, dbRes.password);
        
        if (isPasswordMatch) {
          // create a token for the user
          const authToken = jwt.sign({ email: dbRes.email }, JWT_SECRET_KEY, {
            expiresIn: "1h",
          });
          
          // Remove password from response
          const userResponse = {
            email: dbRes.email,
            name: dbRes.name,
          };
          
          successCallback({ token: authToken, user: userResponse });
        } else {
          errorCallback({ status: 401, message: "Invalid email or password" });
        }
      } catch (dbErr) {
        console.error("SignIn | dbErr is: ", dbErr);
        errorCallback({ status: 500, message: "Internal server error" });
      }
      
};
export default UserModel;