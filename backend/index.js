const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000
const connectDB = require('./db')
connectDB();
app.use(cors())
app.use(express.json())
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello!' })
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
