const http = require('http')
const express = require ('express')
const session = require('express-session');

const sql = require('mssql');
const mysql =require('mysql');
//const sql2 = require('msnodesqlv8') ;



const app =express()


app.use(session({
  secret: 'secret-key', // Clé secrète utilisée pour signer le cookie de session
  resave: false,
  saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => 
 {
  res.sendFile("/views/index.html" ,{root:'.'})
 }
)

app.post("/login", (req, res) => 
 {
  const username = req.body.username;
  const password = req.body.password;
      // make a request as
    
    con.connect(function(err) {
      if (err) throw err;
     // console.log("Connected!");
      var sql = "select * from users" ;
      con.query(sql, function (err, records) {
        if (err){ throw err;}
        else {
          const record= records.recordset;
          const found = record.some(row => row.username === username && row.password===password); 
          if (found){
            req.session.username = username;
            res.sendFile("/views/chat.html" ,{root:'.'})
          }else {
            res.send("User not found !")
          }
        }
  
      });


    });

    }) 
  

app.get('/username', (req, res) => {
  res.send(req.session.username);
});


app.post("/register", (req, res) => 
 {
    res.sendFile("/views/register.html" ,{root:'.'})

  }
)

app.post("/save-message", (req, res) => 
 {
  const name = req.session.username;
  const message = req.body.messageInput;
  const date=Date.now() ;
  //console.log("le message est :"+message)
  sql.connect(config,function(err){
    if(err){console.log(err) ; }
    
    // make a request as
    
    var request = new sql.Request();
    var query = "insert into messages VALUES ('"+name+"','"+message+"','"+date+"')" ;
    
    request.query(query, function(err, records) {
      if (err) {
          console.log(err);
      } else {
         // console.log(records);
          // Afficher les résultats de la requête
      }
    })
    })
  }
)

app.get("/import-messages", (req, res) => 

 {
 // console.log("here Im")

 

    con.connect(function(err) {
      if (err) throw err;
     // console.log("Connected!");
      var sql = "select * from messages" ;
      con.query(sql, function (err, records) {
        if (err) throw err;
  
      });
      console.log(records.recordset);
      res.json(records.recordset) ;
    });



  }
)

app.post("/submit-user", (req, res) => 
 {

  const username = req.body.username;
  const password = req.body.password;

  con.connect(function(err) {
    if (err) throw err;
   // console.log("Connected!");
    var sql = "insert into users VALUES ('"+username+"','"+password+"')" ;
    con.query(sql, function (err, result) {
      if (err) throw err;

    });
    res.sendFile("/views/index.html" ,{root:'.'})
  });



  }
)


var con = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  user: "sql11703981",
  password: "9I2pu1pYq4",
  database: "sql11703981"
});

http.createServer(app).listen(3000)
