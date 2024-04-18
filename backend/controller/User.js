const ToDoModel = require("../models/ToDoModel");
const bcrypt = require("bcrypt");

const SignUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await ToDoModel.find({ email });
        if (existingUser?.length > 0) {
            return res.status(400).json({ status: 'duplicate' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        var user = await ToDoModel.create({ email, password: hashedPassword });
        res.status(201).json({ status: 'true', token: JSON.stringify(user._id) });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ status: 'Internal server error' });
    }
};
const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await ToDoModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 'nouser' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ status: 'wrong' });
        }
        res.status(201).json({ status: 'true', token: JSON.stringify(user._id) });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ status: 'Internal server error' });
    }
};

module.exports = { SignIn, SignUp }