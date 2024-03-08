const mysql = require('mysql2')
const sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs_api'
})

sql.connect()

// sql.query('SELECT * FROM users', (err, rows, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', rows)
// })

// sql.end()
module.exports = sql
