const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')
  if(!token) return res.status(400).json({message : 'Токен отсутствует'})

  try{
    const verified = jwt.verify(token, 'lenovo')
    req.user = verified
    next()
  } catch(err){
    res.status(403).json({message : 'неверный токен'})
  }
}

module.exports = authenticateToken
