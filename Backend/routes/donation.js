import express from "express";
import Donation from "../controller/donationController.js";
import { verifyToken } from "../utils/helpers.js";

const router = express.Router();

// Route to create a donation
router.post("/",verifyToken, Donation.createDonation);

// Route to get all 
router.get("/",verifyToken, Donation.getAllDonations);

// Route to get a donation by ID
router.get("//:id", Donation.getDonationById);

// Route to update a donation
router.put("//:id", Donation.updateDonation);



export default router;
