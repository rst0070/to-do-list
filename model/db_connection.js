const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const config = {
    user : "TO_DO_LIST",
    password : "rambin",
    connectionString : "localhost:1521/rst"
}

var connection;
try{
    connection  = await oracledb.getConnection(config);
}catch(err){
    console.log('!DB connection ERROR! must be restart', err);
}

module.exports = connection;