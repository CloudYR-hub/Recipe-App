const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {
  try {
    // step 1 - get the token from the header
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    
    const token = authHeader.split(' ')[1]

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    
    req.user = decoded

    next()

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = protect