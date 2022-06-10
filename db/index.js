const mysql = require('mysql')

const db = mysql.createPool({
    host: '152.136.246.142',
    port: 3306,
    user: 'note_user',
    password: 'sf692499',
    database: 'note_user',
})

module.exports = db
