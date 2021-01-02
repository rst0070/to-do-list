//https://github.com/mapbox/node-sqlite3/wiki/API
const sqlite = require('sqlite3').verbose();
const path = require('path');
let dir = path.dirname(__dirname);

module.exports = new sqlite.Database(path.join(dir, '/db/to_do_list.db'), sqlite.OPEN_READWRITE, (err)=>{
    console.log(err);
});


