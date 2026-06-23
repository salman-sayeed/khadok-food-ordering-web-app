const mongoose = require('mongoose');
const Food = require('./models/Food');
require('dotenv').config();

const foods = [
  { name: 'Beef Pizza', category: 'Pizza', price: 450, description: 'Loaded with seasoned beef and mozzarella', image: 'https://images.unsplash.com/photo-1621070766841-a7bf1ee96df0?q=80&w=800' },
  { name: 'Chicken Pizza', category: 'Pizza', price: 420, description: 'Grilled chicken with fresh herbs and cheese', image: 'https://plus.unsplash.com/premium_photo-1733306588881-0411931d4fed?q=80&w=800' },
  { name: 'Beef Burger', category: 'Burger', price: 320, description: 'Juicy beef patty with lettuce and tomato', image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?q=80&w=800' },
  { name: 'Chicken Burger', category: 'Burger', price: 280, description: 'Crispy fried chicken burger with sauce', image: 'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=800' },
  { name: 'Veggie Burger', category: 'Burger', price: 250, description: 'Fresh veggie patty with garden greens', image: 'https://plus.unsplash.com/premium_photo-1684534125391-9e01a39570d2?q=80&w=800' },
  { name: 'Fries', category: 'Sides', price: 120, description: 'Golden crispy french fries with dipping sauce', image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?q=80&w=800' },
  { name: 'Chicken Wings', category: 'Sides', price: 280, description: 'Spicy glazed chicken wings', image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?q=80&w=800' },
  { name: 'Chicken Drumstick', category: 'Sides', price: 260, description: 'Tender drumsticks with smoky seasoning', image: 'https://plus.unsplash.com/premium_photo-1701109142322-22b8a71f5b7a?q=80&w=800' },
  { name: 'Pasta', category: 'Pasta', price: 300, description: 'Classic pasta in rich tomato sauce', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?q=80&w=800' },
  { name: 'Baked Pasta', category: 'Pasta', price: 350, description: 'Oven baked pasta with melted cheese', image: 'https://images.unsplash.com/photo-1767065583952-e932c354bca6?q=80&w=800' },
  { name: 'Mango Lassi', category: 'Drinks', price: 150, description: 'Refreshing mango blended with creamy yogurt', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?q=80&w=800' },
  { name: 'Lassi', category: 'Drinks', price: 120, description: 'Classic chilled yogurt drink', image: 'https://images.unsplash.com/photo-1630409346699-79481a79db52?q=80&w=800' },
  { name: 'Chocolate Shake', category: 'Drinks', price: 180, description: 'Thick and creamy chocolate milkshake', image: 'https://images.unsplash.com/photo-1594488506255-a8bbfdeedbaf?q=80&w=800' },
  { name: 'Cold Coffee', category: 'Drinks', price: 160, description: 'Chilled coffee with milk and ice', image: 'https://images.unsplash.com/photo-1530373239216-42518e6b4063?q=80&w=800' },
  { name: 'Cappuccino', category: 'Drinks', price: 140, description: 'Frothy espresso with steamed milk', image: 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?q=80&w=800' },
  { name: 'Espresso', category: 'Drinks', price: 100, description: 'Strong and bold single shot espresso', image: 'https://images.unsplash.com/photo-1596952954288-16862d37405b?q=80&w=800' },
  { name: 'Lemonade', category: 'Drinks', price: 100, description: 'Freshly squeezed lemon with mint', image: 'https://images.unsplash.com/photo-1507281549113-040fcfef650e?q=80&w=800' },
  { name: 'Chocolate Cupcake', category: 'Desserts', price: 120, description: 'Moist chocolate cupcake with frosting', image: 'https://plus.unsplash.com/premium_photo-1669931367700-e4e1e0387d40?q=80&w=800' },
  { name: 'Strawberry Cupcake', category: 'Desserts', price: 120, description: 'Light vanilla cupcake with strawberry cream', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800' },
  { name: 'Black Forest Cake', category: 'Desserts', price: 350, description: 'Classic black forest with cherries and cream', image: 'https://images.unsplash.com/photo-1620492129802-2955e00f161e?q=80&w=800' },
  { name: 'Biriyani', category: 'Rice', price: 380, description: 'Aromatic spiced rice with tender meat', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800' },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Food.deleteMany();
  await Food.insertMany(foods);
  console.log('Food items seeded successfully');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});