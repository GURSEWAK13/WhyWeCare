import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constant.js";

const verifyToken = (req, res, next) => {
  const authToken = req.get("Authorization");
  let decodedAuthToken;
  try {
    decodedAuthToken = jwt.verify(authToken, JWT_SECRET_KEY);
    if(req.get("emailFromAuthToken") != decodedAuthToken.email){

      throw new Error('Email in request does not match email from token')
    }
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
  console.log("The decodedAuthToken email is: ", decodedAuthToken.email);
};

export { verifyToken };