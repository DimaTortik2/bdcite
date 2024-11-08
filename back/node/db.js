const { Pool } = require('pg')

const pool = new Pool({
	database: 'dimadb',
	user: 'dima',
	password: 't3dima',
	host: 'localhost',
	port: 5432,
})

module.exports = pool