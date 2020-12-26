const db = require('./db_connection.js').db;
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
    
    let obj = {
        id : user_id, gname : group_name, u_pw : user_pw
    };
    db.all("select mem_name from mems where mem_name = $mname and group_name = $gname and password = $pw",
            obj, (err, rows)=>{
                if(err) return false;
                if(rows.length < 1) return false;
                else    return true;
            });
}

async function login_check(){

}

exports.login_action = login_action;
exports.login_check = login_check;