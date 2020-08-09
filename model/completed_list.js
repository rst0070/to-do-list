const db = require('./db_connection');
const oracledb = require('oracledb');
async function get_last_task_num(group_name){
    var result;
    try{
         result = await db.connection.execute("select LAST_TASK_NUM "+
        "from GROUP_LIST where GROUP_NAME = :gn",{gn: group_name});
        result = result.rows[0].LAST_TASK_NUM;
    }catch(err){
        console.log(err);
    }finally{
        console.log("last_task_num of ", group_name, ': ', result);
        return result;
    }
}
/**
 * 범위안의 task들을 배열로 가져온다.
 * @param {string} group_id 
 * @param {int} start_num start number of scope
 * @param {int} end_num 
 * @returns {array} task배열
 */
async function get_tasks_by_scope(group_name, start_num, end_num){
    var result;
    try{
        if(start_num > end_num || start_num < 0) throw new Error("Invalid scope");

        result = await db.connection.execute("select TITLE, CONTENT, TASK_NUM from TO_DO_LIST where "+
        "COMPLETED = :cn and GROUP_NAME = :gname and :en >= TASK_NUM and TASK_NUM >= :sn order by TASK_NUM ASC",
        {cn:{val: 1, type: oracledb.NUMBER, dir: oracledb.BIND_IN}
        , gname: group_name, en: {val:end_num, type: oracledb.NUMBER, dir: oracledb.BIND_IN}
        , sn:{val: start_num, type: oracledb.NUMBER, dir: oracledb.BIND_IN}});


        result = result.rows;
    }catch(err){
        console.log(err);
        result = null;
    }finally{
        return result;
    }
}

exports.get_tasks_by_scope = get_tasks_by_scope;
exports.get_last_task_num = get_last_task_num;