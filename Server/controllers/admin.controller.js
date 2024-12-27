const adminModel = require('../model/admin_model'); 


module.exports.registerAdmin = async (req, res, next) => {
    try {
        const { email, password, phoneNo, shopName, image } = req.body;
        
        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists with this email' });
        }

        const hashPassword = await adminModel.hashPassword(password);
        const admin = await adminModel.create({ email, password:hashPassword, phoneNo, shopName, image });
        const token = admin.generateToken();
        res.status(201).json({ message: 'Admin registered successfully', token , admin});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = admin.generateToken();
        res.status(200).json({ message: 'Admin logged in successfully', token, admin });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.getProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const admin = await adminModel.findById(id);
        res.status(200).json({ admin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
