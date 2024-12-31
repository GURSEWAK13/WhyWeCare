import express from "express";
import UserModel from "../models/auth.js";

const router = express.Router();

router.post('/register', async (req, res) => {
  const user = req.body;
  UserModel.register(
    user,
    (success) => res.status(200).json(success),
    (error) => res.status(error.status).json({ error: error.message })
  );
});

router.post('/verify-otp', async (req, res) => {
  const userData = {
    email: req.body.email,
    otp: req.body.otp,
    name: req.body.name,
    password: req.body.password
  };

  UserModel.verify_otp(
    userData,
    (success) => res.status(200).json(success),
    (error) => res.status(error.status).json({ error: error.message })
  );
});
router.post('/login', async (req, res) => {
  const user = req.body;

  UserModel.signin(
    user,
    (success) => res.status(200).json(success),
    (error) => res.status(error.status).json({ error: error.message })
  );
});

export default router;