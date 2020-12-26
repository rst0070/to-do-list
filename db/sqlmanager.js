const sqlite = require('sqlite3').verbose();
//const prompt = require('prompt-sync')({sigint: true});
const path = require( 'path');

var db = new sqlite.Database(path.join(__dirname, 'to_do_list.db'), sqlite.OPEN_READWRITE, (err)=>{
    //if(err){console.log(err);}
});
console.log("11111");
/*
//db.run("create table groups(group_name text primary key)");
db.run("create table lists(group_name text, list_name text, last_task_num integer default 0,"+
        "foreign key(group_name) references groups(group_name), primary key(group_name, list_name))");
console.log("2");
db.run("create table mems(group_name text, mem_name text, password text, foreign key(group_name) references groups(group_name),"+
        " primary key(group_name, mem_name))");
console.log("3");
db.run("create table tasks(group_name text, list_name text, content text, task_num integer,"+
        "foreign key(group_name, list_name) references lists(group_name, list_name),"+
        "primary key(group_name, list_name, task_num))");
console.log("4");
db.close();
*/
//db.all("SELECT * FROM sqlite_master WHERE type='table'",(err, rows)=>{console.log(rows)})
//db.all("insert into groups(group_name) values('RamBin')",(err, rows)=>{console.log(rows)});
//db.all("insert into mems(mem_name, group_name, password) values('wonbin', 'RamBin', 'rambin')",(err, rows)=>{console.log(rows)});
db.all("select * from mems", (err, rows)=>{
    console.log(rows);
})
//db.commit();