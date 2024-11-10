async function fetchWithAuth(url, options = {}) {
	const token = localStorage.getItem('token')

	if (!token) {
		alert('Вы не авторизованы')
		return
	}

	options.headers = {
		...options.headers,
		Authorization: token,
	}

	const response = await fetch(url, options)

	return await response.json()
}

ws = new WebSocket('ws://localhost:3000')

async function sendMessage() {
	const answer = await fetchWithAuth('/protected/message', {})

	if (answer.status == 403 || answer.status == 400) {
		window.location.href = '../html/index.html'
		return
	}

	const input = document.getElementById('message_input')

	if (input.value && ws.readyState === WebSocket.OPEN) {
		ws.send(input.value)
		input.value = ''
	}
}

document.getElementById('message_button').onclick = sendMessage

ws.onmessage = async event => {
	const message_box = document.getElementById('message_box')
	const message_el = document.createElement('p')

	message_el.textContent = await event.data.text()
	message_box.appendChild(message_el)
}
