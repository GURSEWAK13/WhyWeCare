import mongoose from "mongoose";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constant.js";

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
  }
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

    console.log("SignIn | dbRes is: ", dbRes);
    const isPasswordMatch = brcypt.compareSync(user.password, dbRes.password);
    
    if (isPasswordMatch) {
      // create a token for the user
      const authToken = jwt.sign({ email: dbRes.email }, JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      
      // Remove password from response
      const userResponse = {
        name: dbRes.name,
        email: dbRes.email,
        state: dbRes.state,
        city: dbRes.city
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

UserModel.register = async (user, successCallback, errorCallback) => {
  // Validate required fields
  if (!user.name || !user.email || !user.password || !user.state || !user.city) {
    errorCallback({ status: 400, message: "All fields are required" });
    return;
  }

  let encryptedPassword = "";
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
      errorCallback({ status: 409, message: "Email already registered" });
      return;
    }

    // Encrypt password
    encryptedPassword = brcypt.hashSync(user.password, 10);
    
    // Create new user
    const newUser = await UserModel.create({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
      state: user.state,
      city: user.city
    });

    // Generate token
    const authToken = jwt.sign({ email: newUser.email }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Remove password from response
    const userResponse = {
      name: newUser.name,
      email: newUser.email,
      state: newUser.state,
      city: newUser.city
    };

    console.log("Register | New user created: ", userResponse);
    successCallback({ token: authToken, user: userResponse });
  } catch (dbErr) {
    console.error("Register | dbErr is: ", dbErr);
    errorCallback({ status: 500, message: "Internal server error" });
  }
};

export default UserModel;
