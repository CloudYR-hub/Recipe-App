const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { 
  getRecipes, 
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  importRecipe
} = require('../controllers/recipeController')

router.get('/', protect, getRecipes)
router.get('/:id', protect, getRecipe)
router.post('/', protect, createRecipe)
router.put('/:id', protect, updateRecipe)
router.delete('/:id', protect, deleteRecipe)
router.patch('/:id/favorite', protect, toggleFavorite)
router.post('/import', protect, importRecipe)

module.exports = router