const db = require('./db_connection.js');
const oracledb = require('oracledb');

/**
 * 
 * @return {boolean} true : 오류없음, false : 오류발생
 */
async function make_new_list(group_name, list_name){
    try{
        await db.connection.execute(
            'insert into LIST_NAMES(GROUP_NAME, LIST_NAME, LAST_TASK_NUM) values(:gn, :ln, :zero)',
            {
                gn : group_name,
                ln : list_name,
                zero : {val:0, type: oracledb.NUMBER, dir: oracledb.BIND_IN}
            });

        return true;
    }catch(err){
        console.log(err.message);
        return false;
    }
}

async function get_list_names(group_name){
    let result;
    try{
        result = await db.connection.execute("select LIST_NAME from LIST_NAMES where GROUP_NAME = :gn",
        {
            gn : group_name
        });
        result = result.rows;
        console.log(result);
    }catch(err){
        console.log(err);
    }finally{
        return result;
    }
}

async function get_last_task_num(group_name, list_name){
    var result;
    try{
         result = await db.connection.execute("select LAST_TASK_NUM "+
        "from LIST_NAMES where GROUP_NAME = :gn and LIST_NAME = :ln",
        {
            gn: group_name,
            ln : list_name
        });
        result = result.rows[0].LAST_TASK_NUM;
    }catch(err){
        console.log(err);
    }finally{
        console.log("last_task_num of ", group_name, ': ', result);
        return result;
    }
}

/**
 * 
 * @param {string} group_name 
 * @param {string} list_name 
 * @param {boolean} completed 
 */
async function get_tasks(group_name, list_name, completed){
    var result;
    try{
        let end_num = await get_last_task_num(group_name, list_name);

        result = await db.connection.execute("select TITLE, CONTENT, TASK_NUM from TO_DO_LIST where "+
        "COMPLETED = :ic and LIST_NAME = :lname and GROUP_NAME = :gname and :en >= TASK_NUM and TASK_NUM >= :sn order by TASK_NUM ASC",
        {
            ic : {val : completed ? 1 : 0, type: oracledb.NUMBER, dir: oracledb.BIND_IN},
            gname : group_name,
            lname : list_name,
            en : {val: end_num, type: oracledb.NUMBER, dir: oracledb.BIND_IN},
            sn : {val:0, type: oracledb.NUMBER, dir: oracledb.BIND_IN}
        });
        result = result.rows;
    }catch(err){
        console.log(err);
        result = null;
    }finally{
        return result;
    }
}

async function make_task(group_name, list_name, title, content){
    let num = await get_last_task_num(group_name, list_name);
    num++;
    try{
        await db.connection.execute("insert into TO_DO_LIST (GROUP_NAME, LIST_NAME, TASK_NUM, TITLE, CONTENT)"+
        " values ( :gn, :ln, :tn , :tt , :ct )", 
        {
            gn:group_name,
            ln : list_name,
            tn:{dir: oracledb.BIND_IN,type: oracledb.NUMBER, val:num},
            tt:title,
            ct:content
        });

        await db.connection.execute("update LIST_NAMES set LAST_TASK_NUM = :num where GROUP_NAME = :gname and LIST_NAME = :lname", 
        {
            num : {dir: oracledb.BIND_IN,type: oracledb.NUMBER, val: num},
            gname : group_name,
            lname : list_name
        });
        return num;
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
async function delete_task(group_name, list_name, task_num){
    try{
        await db.connection.execute("delete from TO_DO_LIST where TASK_NUM = :tn and GROUP_NAME = :gn and LIST_NAME = :ln",
        {
            tn : {type: oracledb.NUMBER, val: task_num, dir: oracledb.BIND_IN},
            gn: group_name,
            ln : list_name
        });
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

async function trans_task_to_complete(group_name, list_name, task_num){
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

async function trans_task_to_uncompleted(group_name, list_name, task_num){
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

exports.make_new_list = make_new_list;

exports.get_list_names = get_list_names;

exports.get_last_task_num = get_last_task_num;

exports.get_tasks = get_tasks;

exports.make_task = make_task;

exports.delete_task = delete_task;

exports.trans_task_to_complete = trans_task_to_complete;

exports.trans_task_to_uncompleted = trans_task_to_uncompleted;