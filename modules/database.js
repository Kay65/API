const router = require('express').Router();
var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME,
    timezone: 'UTC'
  });

router.get('/:table', (req, res) => {
    pool.query(`SELECT * FROM zarodolgozat`, (err, results) => {
        sendResults(table, err, results, req, res, 'sent from');
    });

});