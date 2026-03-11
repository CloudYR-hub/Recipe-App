const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  sourceURL: { type: String },
  ingredients: { type: [String] },
  steps: { type: [String] },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Recipe', RecipeSchema)