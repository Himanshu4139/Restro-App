const adminModel = require('../model/admin_model');

module.exports.addCategory = async (req, res, next) => {
    try{
        const { name, image, value } = req.body;
        const Admin = await adminModel.findOne({_id: value});
        if(!Admin){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const newCategory = {
            categoryName: name,
            categoryImage: image
        }
        Admin.categories.push(newCategory);
        await Admin.save();
        res.status(201).json({ message: 'Category added successfully', Admin });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.addMenu = async (req, res, next) => {
    try{
        const { name, price, category, image, value } = req.body;
        const Admin = await adminModel.findOne({_id: value});
        if(!Admin){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const newMenu = {
            itemName: name,
            itemPrice: price,
            itemCategory: category,
            image: image
        }
        Admin.menu.push(newMenu);
        await Admin.save();
        res.status(201).json({ message: 'Menu added successfully', Admin });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.updateMenu = async (req, res, next) => {
    try{
        const id = req.params.id;
        const { name, price, category, image, value } = req.body;
        const Admin = await adminModel.findOne({_id: value});
        if(!Admin){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const index = Admin.menu.findIndex(menu => menu._id == id);
        Admin.menu[index].itemName = name;
        Admin.menu[index].itemPrice = price;
        Admin.menu[index].itemCategory = category;
        Admin.menu[index].image = image;
        await Admin.save();
        res.status(201).json({ message: 'Menu updated successfully', Admin });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.deleteMenu = async (req, res, next) => {
    try{
        const id = req.params.id;
        const value = req.query.value;
        const Admin = await adminModel.findOne({_id: value});
        if(!Admin){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        Admin.menu = Admin.menu.filter(menu => menu._id != id);
        await Admin.save();
        res.status(201).json({ message: 'Menu deleted successfully', Admin });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports.deleteCategory = async (req, res, next) => {
    try{
        const id = req.params.id;
        const value = req.query.value;
        const Admin = await adminModel.findOne({_id: value});
        if(!Admin){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        Admin.categories = Admin.categories.filter(category => category._id != id);
        await Admin.save();
        res.status(201).json({ message: 'Category deleted successfully', Admin });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}