const Recipe = require('../models/recipe')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
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
const importRecipe = async (req, res) => {
  try {
    const { text } = req.body

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
    const prompt = `You are a recipe extraction assistant. 
    Extract the recipe from the text provided and return ONLY a JSON object with no extra text, 
    no markdown, no backticks. 
    The JSON must have exactly these fields:
    {"title": "string", "description": "string", "ingredients": ["array"], "steps": ["array"]}
    If any field is missing, use empty string or empty array.

    Text: ${text}`

    const result = await model.generateContent(prompt)
    const aiResponse = result.response.text()
    const extracted = JSON.parse(aiResponse)
    const recipe = await Recipe.create({ ...extracted, user: req.user.id })
    res.status(201).json(recipe)
    

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

  toggleFavorite,

  importRecipe

}