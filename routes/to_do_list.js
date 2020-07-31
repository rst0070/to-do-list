const express = require('express');
const data = require( '../model/to_do_list.js');
const router = express.Router();

router.get('/', async function(req, res){
    try{
        console.log(req.session);
        let last_task_num = await data.get_last_task_num(req.session.group_id);
        let list;
        if(last_task_num > -1){
            list = await data.get_tasks_by_scope(req.session.group_id, 0, last_task_num);
        }
        
        res.render('to_do_list', {layout : "layouts/main", list : list});
        
    }catch(e){
        console.log(e.message);
    }
});

module.exports = router;