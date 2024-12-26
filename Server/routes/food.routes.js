const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');

router.post('/addCategory', foodController.addCategory);
router.post('/addMenu', foodController.addMenu);
router.put('/updateMenu/:id', foodController.updateMenu);
router.delete('/deleteMenu/:id', foodController.deleteMenu);
router.delete('/deleteCategory/:id', foodController.deleteCategory);


module.exports = router;