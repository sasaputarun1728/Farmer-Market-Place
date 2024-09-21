const express = require("express");
const mongoDB = require("./Db");
const cors = require("cors");
const User = require("./models/User");


const app = express();
const port = 5000;

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoDB();

app.use(express.json());

// Route to get user name by email
app.get("/api/getUser/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select("name");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ name: user.name });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Define other routes
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));
app.use("/api", require("./routes/FarmerDetails"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
