const sqlite = require('sqlite3').verbose();
//https://github.com/mapbox/node-sqlite3/wiki/API
var connection;
var db = new sqlite.Database('../db/to_do_list.db', sqlite.OPEN_READWRITE, (err)=>{

});


exports.db = db;
exports.make_connection = make_connection;

