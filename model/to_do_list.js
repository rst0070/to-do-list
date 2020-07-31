const connection = require('./db_connection.js');

async function get_last_task_num(group_id){
    var result;
    try{
         result = await connection.execute("select LAST_TASK_NUM "+
        "from GROUP_LIST where GROUP_NAME = :group_id",[group_id, task_num]);
    }catch(err){

    }finally{
        return result;
    }
    
    
}
async function get_task_by_num(group_id, task_num){
    var result;
    try{
        result =  await connection.execute("select TITLE "+
        "from TO_DO_LIST where GROUP_NAME = :group_id and TASK_NUM = :task_num and "+
        "COMPLETE = '"+'0'+"'",[group_id, task_num]);

    }catch(err){
        console.log(err);
        result = null;
    }finally{
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
async function get_tasks_by_scope(group_id, start_num, end_num){
    var result;
    try{
        if(start_num > end_num || start_num < 0) throw new Error("Invalid scope");
        result = await connection.execute("select TITLE from TO_DO_LIST where ");
    }catch(err){
        console.log(err);
        result = null;
    }finally{
        return result;
    }
}

exports.get_last_task_num = get_last_task_num;
exports.get_task_by_num = get_task_by_num;
exports.get_tasks_by_scope = get_tasks_by_scope;