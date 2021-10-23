const mysql = require('mysql2');

const startup = () => {
    console.log('===============================')
    console.log('|                              |')
    console.log('|       Employee Tracker       |')
    console.log('|                              |')
    console.log('===============================')

}

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'jrkffmndd12',
        database: 'employee_tracker_db'
    }, startup()
);

module.exports = db;