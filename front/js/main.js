document.getElementById('registerForm').addEventListener('submit', async (e)=>{
  answer_p = document.getElementById('answer_register')

  e.preventDefault()


  const formData = new FormData(e.target)
  const data = Object.fromEntries(formData.entries())

  if (
      (data.password &&
      data.confirm_password) && (
      data.password === data.confirm_password )
	  ) 
  {
    // Обновим дату, чтобы было без confirm password
    delete data.confirm_password

    const require = await fetch('/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}) 

    const result = await require.json()  
    answer_p.textContent = result.message

	} else {
		answer_p.textContent = 'не совпадает пароль'
	}
})

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  answer_p = document.getElementById('answer_login')

	e.preventDefault()

	const formData = new FormData(e.target)
	const data = Object.fromEntries(formData.entries())

  const require = await fetch('/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}) 

  const result = await require.json()

  

  if(result.token){
    localStorage.setItem('token', result.token)
  }

  answer_p.textContent = result.message

})


async function fetchWithAuth(url, options = {}, responseType = 'json') {
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
  if(responseType === 'json'){
	  return await response.json()
  }
  else if ( responseType === 'text'){
    return await response.text()
  }
}


document.getElementById('test').addEventListener('click' ,async e => {
  e.preventDefault()
  const html = await fetchWithAuth('/protected/message', {}, 'text')
  document.documentElement.innerHTML = html
})