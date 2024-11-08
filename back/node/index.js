const express = require('express')
const path = require('path')
const { registerUser, loginUser } = require('./authController')
const authenticateToken = require('./authMiddleware')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'front')))

app.get('/', (req, res) =>{
	res.sendFile(path.join(__dirname, '..', '..', 'front', 'html', 'index.html'))
})

app.post('/register', registerUser)
app.post('/login', loginUser)

app.get('/protected', authenticateToken, (req, res) => {
	res.json({
		message: `Доступ к защищенному ресурсу. userId : ${req.user.userId}`,
	})
})

app.listen(3000, () => {
	console.log('Сервер запущен на порту 3000')
})
