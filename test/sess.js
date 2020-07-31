const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
    secret: 'keyboard cat', cookie: { maxAge: 60000 }
}));

const r1 = require('./sess_r1.js');
const r2 = require('./sess_r2.js');

app.use('/1',r1);
app.use('/2',r2);

app.listen(80, function(){
    console.log('listenning..');
});