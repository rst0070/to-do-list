const db = require('./db_connection.js');

/**
 * @param {function} next : function(err)
 */
exports.make_new_list = (group_name, list_name, next)=>{
    let ft = this;
    db.all("insert into lists(list_name, group_name, last_task_num) values($lname, $gname, 0)",
        {$lname : list_name, $gname: group_name}, (err, rows)=>{
            next(err);
        });
}

exports.make_new_task = (group_name, list_name, content, next)=>{
    exports.get_last_task_num(group_name, list_name, (err, num)=>{
        if(err){next(err); return;}
        db.all("insert into tasks(group_name, list_name, content, task_num) "+
            "values($gname, $lname, $content, $tnum)", 
            {
                $gname: group_name,
                $lname: list_name,
                $content: content,
                $num: num+1
             },(err, rows)=>{
                 if(err){next(err); return;}
                 db.all("update lists set last_task_num = $num where group_name = $gname and list_name = $lname",
                    {$gname:group_name, $lname:list_name, $num: num+1});
                next(err);
             })
    });
}
/**
 * list가 한개도 없는 경우는 아직 구현 안함.
 * @param {function} next : function(err, result) result: string 배열
 */
exports.get_list_names = (group_name, next)=>{
    db.all("select list_name from lists where group_name = $gname", {$gname:group_name},(err, rows)=>{
        if(err) next(err,rows);
        else{
            let result = new Array(rows.length);
            for(let i=0; i < rows.length; i++) result[i] = rows[i].list_name;
            next(null, result);
        }
    });
}

exports.get_last_task_num = (group_name, list_name, next)=>{
    db.all("select last_task_num from lists where group_name = $gname and list_name = $lname", {$gname:group_name, $lname : list_name}, 
            (err, rows)=>{
                if(!err) next(null, rows[0]);
                else next(err, null);
            });
}

/**
 * 
 * @param {string} group_name 
 * @param {string} list_name 
 * @param {boolean} completed
 * @param {function} next : function(err, rows)
 */
exports.get_tasks = (group_name, list_name, completed, next)=>{
    db.all("select * from tasks where group_name = $gname and list_name = $lname and completed = $cp",
            {$gname:group_name, $lname:list_name, $cp : completed ? 1 : 0},next);
}
/**
 * @param {function} next: function(err)
 */
exports.trans_task_to_complete = (group_name, list_name, task_num, next)=>{
    db.all("update tasks set completed = 1 where group_name = $gname and list_name = $lname and task_num = $tnum",
            {$gname : group_name, $lname : list_name, $tnum : task_num}, 
            (err, rows)=>{
                next(err);
            })
}
/**
 * @param {function} next: function(err)
 */
exports.trans_task_to_uncompleted = (group_name, list_name, task_num, next)=>{
     db.all("update tasks set completed = 0 where group_name = $gname and list_name = $lname and task_num = $tnum",
            {$gname : group_name, $lname : list_name, $tnum : task_num}, 
            (err, rows)=>{
                next(err);
            });
}
