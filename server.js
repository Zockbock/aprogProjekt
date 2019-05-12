//mkdir of the directory of the db if it's not already existing
var fs = require('fs');
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

// Server starten
const port = 3000;
app.listen(port, function(){
    console.log("listening on " + port);
});

// Index 
app.get('/', function(req, res){
    res.render(__dirname + '/views/index.ejs');
});

// Auf CSS "hinweisen"
app.use(express.static(require('path').join(__dirname, "/")));

// Tabellen initialisieren
let sql = `SELECT * FROM user`;
db.all(sql, (error,rows) => {
    if(error){
        if(rows == null){
            db.run(`CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, pw TEXT NOT NULL)`, (error) => {
                if(error){
                    console.log(error.message);
                } else {
                    console.log("Initialized table user");
                }
            });
        }
    }
});