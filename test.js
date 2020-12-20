const sqlite = require('sqlite3').verbose();

var connection;
var db = new sqlite.Database('./db/chinook.db', sqlite.OPEN_READWRITE, (err)=>{
    if(err){console.log(err);}
    else{console.log("connected");}
});

db.all("select * from employees", [], (err, rows)=>{
    console.log(rows);
});
