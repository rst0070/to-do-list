const express = require('express');
const data = require('../model/login.js');
const router = express.Router();

/**
 * 로그인 요청 받아서 확인하는 부분
 */
router.post('/', async function(req, res){
    console.log(req.session.id);
    let check = await data.login_action(req.body.group_name 
        ,req.body.user_id, req.body.user_password);
    
    if(check){
        req.session.login = true;
        req.session.user_id = req.body.user_id;
        req.session.group_name = req.body.group_name;
        res.redirect('/');
    }else{
        req.session.login = false;
        res.redirect('/');
    }
});

/**
 * 로그인 페이지 전달
 */
router.get('/', function(req,res){
    console.log(req.session.id);
    res.render('',{layout: 'login'});
});

module.exports = router;