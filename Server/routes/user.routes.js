const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


// 🔹 Google Signup Route
router.post("/google-signup", userController.googleSignup);
// 🔹 Google Login Route
router.post("/google-login", userController.googleLogin);

router.post('/register', userController.registerUser); 
router.post('/login', userController.loginUser);
router.get('/profile/:id', userController.getProfile);


module.exports = router