//mkdir of the directory of the db if it's not already existing
let fs = require('fs');
if(!fs.existsSync('./db')){
  fs.mkdirSync('./db')
}

// ExpressJS initialisieren
const express = require('express');
const app = express();

// Body-Parser initialisieren
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// EJS initialisieren
app.engine('.ejs', require('ejs').__express);
app.set('view engine', 'ejs');

// Datenbank initialisieren
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/user.db', (error) => {
  if(error){
    console.log(error.message);

  } else {
    console.log('connected to the database');
  }
});

// Link folders
app.use(express.static(__dirname + "/game"));

// Server starten
const port = 3000;
app.listen(port, function(){
    console.log("listening on " + port);
});

// Index 
app.get('/', function(req, res){
    res.render(__dirname + '/views/index.ejs');
});

// Game
app.get('/game', function(req, res){
  res.render('game');
});

// Bcrypt
const bcrypt = require('bcrypt');
const saltrounds = 10;

// Auf CSS "hinweisen"
app.use(express.static(require('path').join(__dirname, "/")));

// Tabellen initialisieren
let sql = `SELECT * FROM user`;
db.all(sql, (error,rows) => {
    if(error){
      if(rows == null){
        db.run(`CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE, pw TEXT NOT NULL)`, (error) => {
            if(error){
                console.log(error.message);
            } else {
              bcrypt.hash("password", saltrounds, (err, hash) => {
                console.log("Initialized table user");
                db.run(`INSERT INTO user(name, pw) VALUES ("admin", "${hash}")`, (error) => {
              });
                if(error){
                  console.log(error.message);
                }
              });
            }
        });
      }
    }
});

// Checking User methode
async function checkUser(username, password, res){
  const user = db.all(`SELECT * FROM user WHERE name = "${username}"`);
  await bcrypt.compare(password, user.pw, (err, result) => {
    if (result == true){
      res.render(__dirname + '/views/run.ejs');
    } else {
      console.log("Wrong password or username.");
      res.render('index.ejs');
      return;
    }
  });
}

// Login versuch
app.post('/run', (req, res) => {
  const name = req.body.name;
  const pw = req.body.pw;
  if(name === "" && pw === ""){
    console.log("Please insert a username and password.");
    res.render('index.ejs');
  } else {
    checkUser(name, pw, res);
  }
});

// Register
var registered = false;
app.get('/registerLink', (req,res) => {
  registered = false;
  res.render('register.ejs', {registered});
});

// Register send
app.post('/register', (req, res) => {
  const username = req.body.name;
  const userpw = req.body.pw;
  let hashpw;
  bcrypt.hash(userpw, saltrounds, (err, hash) => {
    hashpw = hash;
  });
  db.run(`INSERT INTO user (name,pw) VALUES('${username}', '${hashpw}')`, (err) => {
    if(err){
      console.log(err.message);
      alert("User already exists.");
      res.render('register.ejs', {registered}); 
    } else {
      console.log("User created");
      registered = true;
      res.render('register.ejs', {registered});
    }
  });
});