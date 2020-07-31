const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const config = {
    user : "TO_DO_LIST",
    password : "rambin",
    connectionString : "localhost:1521/rst"
}

var connection;
async function make_connection(){
    try{
        connection  = await oracledb.getConnection(config);
        console.log(connection);
    }catch(err){
        console.log('!DB connection ERROR! must be restart', err);
    }finally{
        exports.connection = connection;
        return new Promise(function(resolve, reject){
            resolve();
        });
    }
}
exports.connection = connection;
exports.make_connection = make_connection;

