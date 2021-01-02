const express = require('express');
const data = require('../model/login.js');
const router = express.Router();

/**
 * 로그인 요청 받아서 확인하는 부분
 */
router.post('/', function(req, res){
    console.log("ddddd");
    data.login_action(req.body.group_name, req.body.user_id, req.body.user_password,
        (err)=>{
            if(err){
                console.log(err);
                req.session.login = false;
                res.redirect('/');
            }else{
                console.log('correct user information')
                req.session.login = true;
                req.session.user_id = req.body.user_id;
                req.session.group_name = req.body.group_name;
                res.redirect('/');
            }
        });
});

/**
 * 로그인 페이지 전달
 */
router.get('/', function(req,res){
    console.log(req.session.id);
    res.render('login');
});

module.exports = router;