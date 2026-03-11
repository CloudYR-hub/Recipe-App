const Recipe = require('../models/Recipe')

const createRecipe = async (req, res) => {
  try {
    const { title, description, image, sourceURL, ingredients, steps } = req.body
    const recipe = await Recipe.create({
    title,
    description,
    image,
    sourceURL,
    ingredients,
    steps,
    user: req.user.id
    })
    res.status(201).json(recipe)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const getRecipes = async (req, res) => {
    try{
        const recipes = await Recipe.find({ user: req.user.id });
        res.status(200).json(recipes);
    }
    catch (error){
        res.status(500).json({ message: error.message})
    }
    
    
}
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    res.json(recipe)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true})
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    res.json(recipe)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id)
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    res.json(recipe)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    
    recipe.isFavorite = !recipe.isFavorite
    await recipe.save()

    res.json(recipe)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { 

  createRecipe, 

  getRecipes, 

  getRecipe, 

  updateRecipe, 

  deleteRecipe, 

  toggleFavorite 

}