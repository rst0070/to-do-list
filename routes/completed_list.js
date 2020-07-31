const express = require('express');
const router = express.Router();
const model = require('../model/index.js');

router.get('/', function(req, res){
    try{
        if(!req.session.login){
            res.send("you are not logged in.");
            throw new Error("not logged in user is requesting completed list"+
            " ..at routes/r_complete.js");
        }

        model.getCompletedList(req.session.userId, function(result){
            res.render('complete', {layout : "layouts/main", list : result});
        });
            
    }catch(e){

    }
});

module.exports = router;