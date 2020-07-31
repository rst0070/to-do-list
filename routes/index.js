var express = require('express');
var router = express.Router();
var model = require('../model/index.js');


router.get('/', function(req, res){
    //console.log(req.hostname+' is request /');
    //console.log(typeof req.session.login);
/*
    if(!req.session.login){
        res.redirect('/login');
        return;
    }*/
    console.log('this is index');
    console.log(req.sessionID);
    res.render('index', {layout : 'layouts/main'});
});

module.exports = router;