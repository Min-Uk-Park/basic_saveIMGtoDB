const mysql = require('mysql');
const fs = require('fs');
const dbconfig = require('./config/dbconfig.json');

const connection = mysql.createConnection({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
  debug: false,
});

// local에서 IMG읽어서 DB에 저장
const dog = {
  name: 'dog',
  img: fs.readFileSync('./IMG_DB/dog.jpg'),
};

const cats = {
  name: 'cats',
  img: fs.readFileSync('./IMG_DB/cats.jpg'),
};

const query = connection.query(
  'INSERT INTO `Animals` SET ?',
  cats,
  (err, res) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('이미지 추가 성공');
      console.log(res);
    }
  }
);
connection.end();
