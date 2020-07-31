const express = require('express');
const model = require( '../model/index.js');

const router = express.Router();

/**
 * 로그인 요청 받아서 확인하는 부분
 */
router.post('/', function(req, res){
    console.log(req.session.id);
    model.checkUser(req.body.userId, req.body.password, 
        function(check){
            if(check){
                req.session.userId = req.body.userId;
                req.session.login = true;
                res.redirect('/');
            }else{
                session.login = false;
                res.send('wrong pw or id');
            }
    });
});

/**
 * 로그인 페이지 전달
 */
router.get('/', function(req,res){
    console.log(req.session.id);
    res.render('',{layout: 'login'});
});

module.export = router;