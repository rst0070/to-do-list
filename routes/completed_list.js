const express = require('express');
const router = express.Router();
const data = require('../model/completed_list.js');

router.get('/', async function(req, res){
    try{
        let last_task_num = await data.get_last_task_num(req.session.group_name);

        let list = await data.get_tasks_by_scope(req.session.group_name, 0, last_task_num);
        
        res.render('complete', {layout : "layouts/main", list : list});
            
    }catch(e){

    }
});

module.exports = router;