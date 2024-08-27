const express = require("express");
const router = express.Router();
const Order = require("../models/Orders"); // Ensure this path is correct

// Route to handle storing order data
router.post("/orderData", async (req, res) => {
  const currentOrderDate = new Date();
  const data = req.body.order_data;
  data.unshift({ Order_date: currentOrderDate });

  try {
    let existingOrder = await Order.findOne({ email: req.body.email });

    if (!existingOrder) {
      // Create a new order record if one doesn't exist
      await Order.create({
        email: req.body.email,
        order_data: [{ Order_date: currentOrderDate, items: data.slice(1) }],
      });
    } else {
      // Update the existing order record
      await Order.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: {
            order_data: { Order_date: currentOrderDate, items: data.slice(1) },
          },
        }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error: " + error.message);
  }
});

// Route to fetch the order data
router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });

    if (!myData) {
      return res.json({ orderData: { order_data: [] } });
    }

    res.json({ orderData: myData });
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
});

module.exports = router;
