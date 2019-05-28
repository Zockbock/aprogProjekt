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

// Session initialisieren
const session = require('express-session');
app.use(session({
 secret: 'example',
 resave: false,
 saveUninitialized: true
}));


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
                  if(error){
                    console.log(error.message);
                  }
                });
              });
            }
        });
      }
    }
});
db.all(`SELECT * FROM coins`, (err, rows) => {
  if(err){
    if(rows == null){
      db.run(`CREATE TABLE coins (amount INTEGER)`, (error) => {
        if(error){
          console.log(error);
        } else {
          console.log("Initialized table coins");
        }
      })
    }
  }
});

// Checking User methode
function checkUser(username, password, req, res){
  db.get(`SELECT * FROM user WHERE name = "${username}"`,(err, user) => {
    bcrypt.compare(password, user.pw, (err, match) => {
      if (match){
        req.session['sessionValue'] = username;
        const sessionValue = req.session['sessionValue'];
        res.render(__dirname + '/views/run.ejs', {sessionValue});
      } else {
        console.log("Wrong password or username.");
        res.render('index.ejs');
        return;
      }  
    });
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
    checkUser(name, pw, req, res);
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
  bcrypt.hash(userpw, saltrounds, (err, hash) => {
    db.run(`INSERT INTO user (name,pw) VALUES('${username}', '${hash}')`, (error) => {
      if(error){
        console.log(error.message);
        alert("User already exists.");
        res.render('register.ejs', {registered}); 
      } else {
        console.log("User created");
        registered = true;
        res.render('register.ejs', {registered});
      }
    });
  
  });
});

// Logout 
app.post('/logout', (req, res) => {
  delete req.session['sessionValue'];
  res.render('index');
});

// Session auslesen
  // if (!req.session['sessionValue']){
  //   console.log("error")
  // } else {
  //   const sessionValue = req.session['sessionValue'];
  //   console.log(sessionValue);
  // }

app.post('/clientpost', (req, res) => {
  console.log(req.body);
});