// routes/FarmerDetails.js
const express = require("express");
const router = express.Router();
const FarmerDetails = require("../models/FarmerDetails");

router.post("/addFarmerDetails", async (req, res) => {
  try {
    const farmerDetails = new FarmerDetails(req.body);
    await farmerDetails.save();
    res.status(201).json({ message: "Farmer details added successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
