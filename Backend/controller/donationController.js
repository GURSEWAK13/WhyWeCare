import Donation from "../models/donation.js";

// Function to create a new donation
Donation.createDonation = async (req, res) => {
  const { amount, name, email, message } = req.body;
  try {
    const newDonation = new Donation({
      amount,
      name,
      email,
      message,
    });
  console.log(amount,name);


    const savedDonation = await newDonation.save();
    res.status(201).json({
      success: true,
      data: savedDonation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create donation",
      error: err.message,
    });
  }
};

// Function to get all donations
Donation.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({
      success: true,
      data: donations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve donations",
      error: err.message,
    });
  }
};

// Function to get a donation by ID
Donation.getDonationById = async (req, res) => {
  const { id } = req.params;

  try {
    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve donation",
      error: err.message,
    });
  }
};

// Function to update a donation
Donation.updateDonation = async (req, res) => {
  const { id } = req.params;
  const { amount, name, email, message } = req.body;

  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      id,
      { amount, name, email, message },
      { new: true } // return updated donation
    );

    if (!updatedDonation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedDonation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update donation",
      error: err.message,
    });
  }
};

// Function to delete a donation
Donation.deleteDonation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDonation = await Donation.findByIdAndDelete(id);

    if (!deletedDonation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Donation deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete donation",
      error: err.message,
    });
  }
};

export default Donation;
