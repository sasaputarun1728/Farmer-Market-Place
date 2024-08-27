const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
  id: String,
  name: String,
  price: Number,
  qty: Number,
});

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: [
    {
      Order_date: {
        type: Date,
        required: true,
        default: Date.now, // Automatically sets the current date and time
      },
      items: [OrderItemSchema],
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
