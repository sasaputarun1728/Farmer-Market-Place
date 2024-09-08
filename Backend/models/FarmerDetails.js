// models/FarmerDetails.js
const mongoose = require("mongoose");

const farmerDetailsSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  productDetails: { type: String, required: true },
  quantityOptions: { type: [Number], required: true },
  defaultQuantity: { type: Number, required: true },
  price: { type: Number, required: true },
  farmer: {
    name: { type: String, required: true },
    experience: { type: String, required: true },
    location: { type: String, required: true },
    age: { type: Number, required: true },
    contactNumber: { type: String, required: true },
  },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("farmerdetails", farmerDetailsSchema);
