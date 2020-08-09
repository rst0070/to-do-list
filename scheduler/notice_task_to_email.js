const db = require('../model/db_connection.js');
const query = "select TASK_NUM, GROUP_NAME from TO_DO_LIST where ALIM = :firedate";

module.exports = function(firedate){
    console.log(firedate);
    console.log(typeof firedate);
}