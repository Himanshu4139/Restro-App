const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food.controller');

router.post('/addCategory', foodController.addCategory);
router.post('/addMenu', foodController.addMenu);
router.post('/addOrder', foodController.addOrder);
router.put('/updateMenu/:id', foodController.updateMenu);
router.put('/updateOrder/:id', foodController.updateOrder);
router.delete('/deleteMenu/:id', foodController.deleteMenu);
router.delete('/deleteCategory/:id', foodController.deleteCategory);


module.exports = router;