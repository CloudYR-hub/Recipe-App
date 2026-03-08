const mongoose = require('mongoose')
require('dotenv').config()
console.log('URI:', process.env.MONGODB_URI)


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)  
  }
}
module.exports = connectDB