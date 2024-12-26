const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    categoryImage: {
        type: String,
        // required: true
    }
}, {
    timestamps: true
});

const menuSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    itemPrice: {
        type: Number,
        required: true,
        min: 0
    },
    itemCategory: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    }
}, {
    timestamps: true
});

const orderSchema = new mongoose.Schema({
    orderDetails: {
        type: Object,
        required: true
    },
    orderPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['inprocess', 'completed'],
        default: 'inprocess'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Password should be at least 6 characters']
    },
    phoneNo: {
        type: String,
        required: [true, 'Please enter phone number'],
        trim: true
    },
    shopName: {
        type: String,
        required: [true, 'Please enter shop name'],
        trim: true
    },
    image: {
        type: String,
        required: [true, 'Please upload image'],
    },
    categories: {
        type:[categorySchema],
        default: []
    },
    menu: {
        type: [menuSchema],
        default: []
    },
    orders: {
        type: [orderSchema],
        default: []
    }
}, {
    timestamps: true
});

// Hash password before saving
adminSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

// Compare password method
adminSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
adminSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

// Verify JWT token
adminSchema.statics.verifyToken = function(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = mongoose.model('Admin', adminSchema);