const db = require('./db_connection.js');
console.log("----------------------------------------------------");
console.log(db);
/**
 * 
 * @param {string} group_name 
 * @param {string} user_id 
 * @param {string} user_pw 
 * @returns {boolean} true: login, false: login error
 */
async function login_action(group_name, user_id, user_pw){
    var result;
    var value = true;
    try{
        let obj = {
            id : user_id, gname : group_name, u_pw : user_pw
        };
        result = await db.connection.execute("select USER_NAME from USER_LIST where"+
        " USER_NAME = :id and GROUP_NAME = :gname and USER_PASSWORD = :u_pw",
        obj);
    }catch(err){
        value = false;
        console.log(err);
    }finally{
        return value;
    }
    
}

async function login_check(){

}

exports.login_action = login_action;
exports.login_check = login_check;