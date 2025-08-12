const foodService = 
require('../services/foodService');
exports.getAllFood = (req, res) => {
 const items = foodService.getAllFood();
 res.json({ data: ['Pizza', 'Burger', 'Sushi'] });
};
