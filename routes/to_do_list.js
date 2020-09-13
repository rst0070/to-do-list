const express = require('express');
const data = require( '../model/to_do_list.js');
const router = express.Router();

router.get('/', async function(req, res){
    try{
        let names = await data.get_list_names(req.session.group_name);
        res.render('main', {list_names : names});
        
    }catch(e){
        console.log(e.message);
    }
});

router.post('/get-list', async (req, res)=>{
    let list = await data.get_tasks(req.session.group_name, req.body.list_name, req.body.completed == 'true');
    console.log(list);
    res.json(list);
});


router.post('/func/make-task', async function(req, res){
    console.log(req.body.title);
    console.log(req.body.content);
    let task_num = await data.make_task(req.session.group_name, req.body.list_name, req.body.title, req.body.content);
    res.status(200).send({task_num : task_num});
});

router.post('/func/delete-task', (req, res)=>{
    data.delete_task(req.session.group_name, req.body.list_name, Number(req.body.task_num));
    res.sendStatus(200).end();
});

router.post('/func/trans-to-complete',(req, res)=>{
    data.trans_task_to_complete(req.session.group_name, req.body.list_name, Number(req.body.task_num));
    res.sendStatus(200).end();
});

router.post('/func/trans-to-uncompleted', (req, res)=>{
    data.trans_task_to_uncompleted(req.session.group_name, req.body.list_name, Number(req.body.task_num));
    res.sendStatus(200).end();
});

router.post('/func/make-new-list', async (req, res)=>{
    let success = await data.make_new_list(req.session.group_name, req.body.list_name);
    if(success){
        res.sendStatus(200).end();
    }else{
        res.sendStatus(422).end();
    }
});

module.exports = router;