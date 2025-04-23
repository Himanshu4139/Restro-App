const userModel = require('../model/user_model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const hashPassword = await userModel.hashPassword(password);
        const user = await userModel.create({ name, email, password:hashPassword });
        const token = user.generateToken();
        res.status(201).json({ message: 'User registered successfully', token , user});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = user.generateToken();
        res.status(200).json({ message: 'User logged in successfully', token, user });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports.getProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



// Google User SignUp
module.exports.googleSignup = async (req, res) => {
    try {
        const { email, name } = req.body;
        if (!email || !name) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // 🔹 Check if user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists. Please login." });
        }

        // 🔹 Create a new user (no firebaseUid)
        user = await userModel.create({ name, email });

        // 🔹 Generate JWT token
        const token = user.generateToken();

        res.status(201).json({ message: "User signed up successfully", token, user });
    } catch (error) {
        console.error("Google signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// Google User Login
module.exports.googleLogin = async (req, res) => {
    try {
        const { email } = req.body;

        // 🔹 Check if user exists
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please sign up first." });
        }

        // 🔹 Generate JWT token
        const token = user.generateToken();

        res.status(200).json({ message: "User logged in successfully", token, user });
    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

