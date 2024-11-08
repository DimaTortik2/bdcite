const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const user = await pool.query('SELECT * FROM users WHERE username = $1', [username])
  if(user.rows.length > 0) {
    return res.status(400).json({message : 'Пользователь уже существует'})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await pool.query('INSERT INTO users (username, password) VALUES($1, $2)', [username, hashedPassword])
  res.status(201).json({message : 'Регистрация прошла успешно'})

}

const loginUser = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const user = await pool.query('SELECT * FROM users WHERE username = $1', [username])
  if(user.rows.length === 0) {
    return res.status(400).json({message : 'неверное имя пользователя или пароль'})
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password)
  if(!validPassword) {
    return res.status(400).json({ message: 'неверное имя пользователя или пароль' })
  }

  const token = jwt.sign({userId: user.rows[0].id}, 'lenovo', {expiresIn:'1h'})
  res.json({message: 'Вход выполнен', token : token})
}

module.exports = {registerUser , loginUser}  
