const db = require('../config/db');

exports.getAdminDashboard = (req, res) => {
    res.render('admin/dashboard', {message:null});
};

exports.getAddFood = (req, res) => {
    res.render('admin/addFood', {message: null});
}

exports.postAddFood = async (req, res) => {
    try {
        const {name,description,price,image_url} = req.body;

        // Validating data enquiry
        if (!name || !description || !price || !image_url) {
            return res.render('admin/addFood', {message: 'All fields are required'});
        }

        // Inserting food item into the database
        await db.none(
            'INSERT INTO food_items (name, description, price, image_url) VALUES ($1, $2, $3, $4)',
            [name, description, price, image_url]
        );
        res.render('admin/addFood', {message: 'Food item added successfully'});
    } catch (error) {
        console.error('Error adding food item:', error);
        res.status(500).render('admin/addFood', {message: 'An error occurred while adding the food item'});
    }
}
// get all food items
exports.getAllFood = async (req, res) => {
    try {
        const foods = await db.any('SELECT * FROM food_items ORDER BY created_at DESC');
        res.render('admin/foodList', { foods });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).send('Server error while fetching food items.');
    }
}

// get edit form 
exports.getEditFood = async (req, res) => {
    const { id } = req.params;

    try {
        const food = await db.oneOrNone('SELECT * FROM food_items WHERE id = $1', [id]);
        if (!food) {
            return res.status(404).send('Food item not found.');
        }
        res.render('admin/editFood', { food });
    } catch (error) {
        console.error('Error fetching food item for edit:', error);
        res.status(500).send('Server error while fetching food item for edit.');
    }
}

// post edit form
exports.postEditFood = async (req, res) => {
    const { id } = req.params;
    const { name, description, image_url, price } = req.body;

    try {
        await db.none(
            'UPDATE food_items SET name = $1, description = $2, image_url = $3, price = $4 WHERE id = $5',
            [name, description, image_url, price, id]);

        res.redirect('/admin/food');
    } catch (error) {
        console.error('Error updating food item:', error);
        res.status(500).send('Server error while updating food item.');
    }
}

// delete food item
exports.deleteFood = async (req, res) => {
    const { id } = req.params;

    try {
        await db.none('DELETE FROM food_items WHERE id = $1', [id]);
        res.redirect('/admin/food');
    } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).send('Server error while deleting food item.');
    }
}