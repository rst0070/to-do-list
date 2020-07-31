var con;
exports.set = function(connection){
    con = connection;
}
/**
 * @param user_id: 데이터 베이스에 저장된 유저
 * @param password: 저장된 유저의 암호
 * @param callback: @function(boolean check) check로 유저가 존재하고 패스워드가 맞는지 알려준다.
 * true 맞음/ false 틀림
 */
exports.func = function(user_id , password , callback){
    con.execute('select id from MEM_LIST where ID = :id and password = :pw',
    [user_id, password], function(err, result){
        if(!err && result)
            callback(true);
        else
            callback(false);
    });
}