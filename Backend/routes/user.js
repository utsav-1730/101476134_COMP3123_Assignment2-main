const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user"); 
const routes = express.Router();

// User signup
routes.post('/signup', async (req, res) => {
    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // Create a new user with hashed password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = newUser.save();
        res.status(201).send({
            message: 'User created successfully',
            newUser
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

routes.post('/login', async (req, res) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // On successful login, return a success message
        res.status(200).send({ message: 'Login successful', user: { username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = routes;
