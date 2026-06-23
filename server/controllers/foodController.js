const Food = require('../models/Food');

//Get food items
//GET /api/food
const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find({ available: true });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Get single food
//GET /api/food/:id
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Create food item (admin only)
//POST /api/food
const createFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const food = await Food.create({ name, description, price, category, image });
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Update food item (admin only)
//PUT /api/food/:id
const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//Delete food item (admin only)
//DELETE /api/food/:id
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllFood, getFoodById, createFood, updateFood, deleteFood };