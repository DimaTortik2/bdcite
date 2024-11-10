const express = require('express')
const path = require('path')
const { registerUser, loginUser } = require('./authController')
const authenticateToken = require('./authMiddleware')
const http = require('http')
const WebSocket = require('ws')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'front')))

//
app.use((req, res, next) => {
	console.log('Request for:', req.url) // Логирование каждого запроса
	next()
})
//
app.get('/', (req, res) =>{
	res.sendFile(path.join(__dirname, '..', '..', 'front', 'html', 'index.html'))
})

app.post('/register', registerUser)
app.post('/login', loginUser)

app.get('/protected/message', authenticateToken, (req, res) => {

	res.json({bool : true})

})

const server = http.createServer(app)
const wss = new WebSocket.Server({server})

wss.on('connection', ws => {
	ws.on('message', message => {
		console.log(`Новое сообщение: ${message}`)

		// Отправляем сообщение всем подключенным клиентам
		wss.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message)
			}
		})
	})
})


server.listen(3000, () => {
	console.log('Сервер запущен на порту 3000')
})
