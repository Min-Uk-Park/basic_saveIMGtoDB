const express = require('express');
const mysql = require('mysql');
const path = require('path');
const static = require('serve-static');
const dbconfig = require('./config/dbconfig.json');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
  debug: false,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', static(path.join(__dirname, 'public')));

// web에서 IMG를 읽어서 DB에 추출하여 제공하는 부분
app.post('/getIMGfromDB', (req, res) => {
  console.log('getIMGfromDB 호출됨');

  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log('DB Connection Error');
      res.status(500).send('DB Connection Error');
      return;
    }

    const selectQuery = 'SELECT * FROM `Animals` WHERE `name` = ?';
    const selectParam = [req.body.name];
    console.log(selectParam);
    connection.query(selectQuery, selectParam, (err, rows, fields) => {
      if (err) {
        connection.release();
        console.log('Select Query Error');
        res.status(401).json('Select Query Error');
        return;
      }

      const relpy = {
        result: rows,
      };
      res.status(200).json(reply);
      connection.release();
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
