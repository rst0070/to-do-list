const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;
const config = {
    user : "TO_DO_LIST",
    password : "rambin",
    connectionString : "localhost:1521/rst"
}

var connection;
async function make_connection(){
    try{
        connection  = await oracledb.getConnection(config);
        var result = await connection.execute("select TITLE from TO_DO_LIST where "+
        "GROUP_NAME = :gname and :en >= TASK_NUM and TASK_NUM >= :sn order by TASK_NUM ASC",
        {gname: "rambin", en: {val:0, type: oracledb.NUMBER, dir: oracledb.BIND_IN}
        , sn:{val: 0, type: oracledb.NUMBER, dir: oracledb.BIND_IN}});

        console.log(result);
        //console.log(result.rows[0].LAST_TASK_NUM);
    }catch(err){
        console.log(err);
    }
}
make_connection();