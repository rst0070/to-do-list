const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'design')));
    app.use(function(err, req, res, next){
    
        console.log(err.message);
    });
    
app.listen(3000, ()=>{
    console.log('listening on 3000');
});