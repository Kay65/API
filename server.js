require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME,
    timezone: 'UTC'
  });

app.get('/', function (req, res) {
    res.send('Simpe NodeJS Backend API');
});

app.get('/:table', (req, res) => {
    pool.query(`SELECT * FROM zarodolgozat`, (err, results) => {
        sendResults(table, err, results, req, res, 'sent from');
    });
});

app.get('/:table/:id', (req, res) => {
    let id = req.params.id;
    
    pool.query(`SELECT * FROM zarodolgozat WHERE ID=${id}`, (err, results) => {
      sendResults(table, err, results, req, res, 'sent from');
    });
  });

  app.get('/:table/:field/:op/:value', (req, res)=>{
    let field = req.params.field;
    let value = req.params.value;
    let op = getOperator(req.params.op);
    
    if (op == ' like '){
      value = `%${value}%`;
    }
  
    pool.query(`SELECT * FROM zarodolgozat WHERE ${field}${op}'${value}'`, (err, results)=>{
      sendResults(table, err, results, req, res, 'sent from');
    });
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
