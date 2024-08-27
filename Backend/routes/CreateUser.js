const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create User Route
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            location: req.body.location
        }).then(() => res.json({ success: true }));
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

// Login User Route
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Incorrect Email or Password" });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
            return res.status(400).json({ errors: "Incorrect Email or Password" });
        }

        return res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;
