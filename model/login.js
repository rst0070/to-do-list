const db = require('./db_connection.js');
/**
 * 
 * @param {string} group_name 
 * @param {string} user_id 
 * @param {string} user_pw 
 * @returns {boolean} true: login, false: login error
 */
exports.login_action = (group_name, user_id, user_pw, next)=>{
    db.all("select mem_name from mems where mem_name = $mname and group_name = $gname and password = $pw",
            {   $mname : user_id, $gname : group_name, $pw : user_pw}, 
            (err, rows)=>{
                console.log("dddddddddddddddddddddddddddddddddddddd");
                next(err);
            });
}