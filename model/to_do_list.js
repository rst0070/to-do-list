const db = require('./db_connection.js');
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
        {cn:{val: 0, type: oracledb.NUMBER, dir: oracledb.BIND_IN}
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

/**
 * 
 * @param {string} group_name 
 * @param {string} title 
 * @param {string} content 
 */
async function add_task_at_last(group_name, title, content){
    let num = await get_last_task_num(group_name);
    num++;
    try{
        await db.connection.execute("insert into TO_DO_LIST (GROUP_NAME, TASK_NUM, TITLE, CONTENT)"+
        " values ( :gn , :tn , :tt , :ct )", {gn:group_name, tn:{dir: oracledb.BIND_IN,type: oracledb.NUMBER, val:num}, tt:title, ct:content});
        await db.connection.execute("update GROUP_LIST set LAST_TASK_NUM = :num where GROUP_NAME = :name", 
        {num:{dir: oracledb.BIND_IN,type: oracledb.NUMBER, val: num}, name:group_name});

    }catch(err){
        console.log(err);
    }
}


/**
 * 
 * @param {string} group_name 
 * @param {int} task_num 
 * @returns {boolean} true: no error, false: error
 */
async function delete_task_by_num(group_name, task_num){
    try{
        await db.connection.execute("delete from TO_DO_LIST where TASK_NUM = :tn and GROUP_NAME = :gn",
        {tn : {type: oracledb.NUMBER, val: task_num, dir: oracledb.BIND_IN},
        gn: group_name});
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

async function trans_to_complete_by_num(group_name, task_num){
    try{
        await db.connection.execute("update TO_DO_LIST set COMPLETED = :c where TASK_NUM = :tn and GROUP_NAME = :gn"
        ,{c: {type: oracledb.NUMBER, val: 1, dir: oracledb.BIND_IN},
        tn: {type: oracledb.NUMBER, val: task_num, dir: oracledb.BIND_IN},
        gn: group_name});
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

async function trans_to_uncompleted(group_name, task_num){
    try{
        await db.connection.execute("update TO_DO_LIST set COMPLETED = :c where TASK_NUM = :tn and GROUP_NAME = :gn"
        ,{c: {type: oracledb.NUMBER, val: 0, dir: oracledb.BIND_IN},
        tn: {type: oracledb.NUMBER, val: task_num, dir: oracledb.BIND_IN},
        gn: group_name});
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

exports.get_last_task_num = get_last_task_num;
exports.get_tasks_by_scope = get_tasks_by_scope;

exports.add_task_at_last = add_task_at_last;

exports.delete_task_by_num = delete_task_by_num;

exports.trans_to_complete_by_num = trans_to_complete_by_num;
exports.trans_to_uncompleted = trans_to_uncompleted;