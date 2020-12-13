const sqlite = require('sqlite3').verbose();

var connection;
var db = new sqlite.Database('../db/to_do_list.db', sqlite.OPEN_READWRITE, (err)=>{

});


exports.connection = connection;
exports.make_connection = make_connection;

