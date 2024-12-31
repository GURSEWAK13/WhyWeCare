import express from "express";
// import fileSystem from "fs";
import UserModel from "../models/user.js";
import { verifyToken } from "../utils/helpers.js";

const router = express.Router();

router.get("/all",verifyToken, (req, res) => {
  UserModel.allUser(
    req,
    (dbRes) => {
      if (dbRes && dbRes.length > 0) {
        res.status(200).json(dbRes);
      } else {
        res.status(204).json([]);
      }
    },
    (dbErr) => {
      console.error("Error fetching all users:", dbErr);
      res.status(dbErr.status || 500).json({
        error: dbErr.message || "Internal server error"
      });
    }
  );
});
// For Sign in--------------------------
router.post("/signin", (req, res) => {
  const user = req.body;
  
  UserModel.signIn(
    user,
    (success) => {
      res.status(200).json({
        token: success.token,
        user: {
          name: success.user.name,
          email: success.user.email,
          state: success.user.state,
          city: success.user.city
        }
      });
    },
    (error) => {
      res.status(error.status || 500).json({ message: error.message });
    }
  );
});
// For Register-------------------------
router.post("/", (req, res) => {
  const user = req.body;

  UserModel.register(
    user,
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(400);
        res.send(dbRes);
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      if (dbErr.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ error: dbErr.message });
    }
  );
});

router.post('/register', (req, res) => {
  const user = req.body;
  
  UserModel.register(
    user,
    (success) => {
      res.status(201).json({
        token: success.token,
        user: success.user,
        message: success.message
      });
    },
    (error) => {
      console.error('Registration route error:', error);
      res.status(error.status || 500).json({ message: error.message });
    }
  );
});

router.post('/signin', (req, res) => {
  const user = req.body;
  
  UserModel.signIn(
    user,
    (success) => {
      res.status(200).json(success);
    },
    (error) => {
      res.status(error.status || 500).json({ message: error.message });
    }
  );
});

router.get('/verify-email/:token', (req, res) => {
  const { token } = req.params;
  
  UserModel.verifyEmail(
    token,
    (success) => {
      res.status(200).json(success);
    },
    (error) => {
      res.status(error.status || 500).json({ message: error.message });
    }
  );
});

router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  UserModel.verifyOTP(
    email,
    otp,
    (success) => {
      res.status(200).json(success);
    },
    (error) => {
      res.status(error.status || 500).json({ message: error.message });
    }
  );
});

export default router;
