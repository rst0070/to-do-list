const connection = require('./db_connection');

async function completed_list(userId){
    if(typeof userId != 'string'){
        throw new Error(userId+' is not string for user id.. at getCompletedList.js');
        return;
    }

    var result  = await connection.execute('select subject, start_date, end_date, contents, item_num from item_list '+
    'where id = :id and complete = :comp ',[userId,'1']);
    return result;
}