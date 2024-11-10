alert('hi')

ws = new WebSocket('ws://localhost:3000')

function sendMessage() {
	const input = document.getElementById('message_input')
  
	if (input.value && ws.readyState === WebSocket.OPEN) {
		ws.send(input.value)
		input.value = ''
	}
}
document.getElementById('message_button').onclick = sendMessage

ws.onmessage = (event) => {

  const message_box = document.getElementById('message_box')
  const message_el = document.createElement('p')

  message_el.textContent = event.data
  message_box.appendChild(message_el)
}