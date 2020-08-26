const express = require('express');
const data = require( '../model/to_do_list.js');
const router = express.Router();

router.get('/', async function(req, res){
    try{
        let last_task_num = await data.get_last_task_num(req.session.group_name);
        let list;
        if(last_task_num > -1){
            list = await data.get_tasks_by_scope(req.session.group_name, 0, last_task_num);
        }
        res.render('to_do_list', {layout : "layouts/main", list : list, LAST_TASK_NUM : last_task_num});
        
    }catch(e){
        console.log(e.message);
    }
});

router.post('/get-list', async (req, res)=>{
    let result = await data.get_tasks(req.session.group_name, req.body.list_name, req.body.completed);
    res.json(result);
});


router.post('/func/add-task', function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);
    data.add_task_at_last(req.session.group_name, req.body.title, req.body.content);
    res.sendStatus(200).end();
});

router.post('/func/delete-task', (req, res)=>{
    data.delete_task_by_num(req.session.group_name, Number(req.body.task_num));
    res.sendStatus(200).end();
});

router.post('/func/trans-to-complete',(req, res)=>{
    data.trans_to_complete_by_num(req.session.group_name, Number(req.body.task_num));
    res.sendStatus(200).end();
});

router.post('/func/trans-to-uncompleted', (req, res)=>{
    data.trans_to_uncompleted(req.session.group_name, Number(req.body.task_num));
    res.sendStatus(200).end();
});

module.exports = router;