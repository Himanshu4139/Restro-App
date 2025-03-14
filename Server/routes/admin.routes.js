const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.post('/register', adminController.registerAdmin); 
router.post('/login', adminController.loginAdmin);
router.get('/profile/:id', adminController.getProfile);

module.exports = router;