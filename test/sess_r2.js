const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    if(req.session.wonbin){
        req.session.wonbin++;
        res.setHeader('Content-Type', 'text/html');
        res.write('log:'+req.session.wonbin);
        res.end();
    }else{
        req.session.wonbin=1;
        res.send('reset');
    }
});
module.exports = router;
