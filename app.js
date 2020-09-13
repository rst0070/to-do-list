const express  = require('express');
//const expressLayout = require('express-ejs-layouts');
const logger = require( 'morgan');
const cookieParser = require( 'cookie-parser');
const bodyParser = require( 'body-parser');
const session = require( 'express-session');
const path = require( 'path');

const app = express();



/*
setup
*/
app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'ejs');

/*
middle ware
*/
const sc = '123dwwef@#!ss';//secret
app.use(session({secret: sc, cookie: { maxAge: 3600000}}));
//app.use(expressLayout);
app.use(logger('dev'));

app.use(cookieParser(sc));//()하나 안해서 프로그램 안돌아갔음
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'resources')));


const db_con = require('./model/db_connection.js');
db_con.make_connection().then(()=>{
    const route = {
        login_check: require('./routes/login_check.js'),
        login: require('./routes/login.js'),
        to_do_list: require('./routes/to_do_list.js')
    };
    
    app.use(route.login_check);
    app.use('/', route.to_do_list);
    app.use('/login', route.login);

    
    //error handling
    app.use(function(err, req, res, next){
    
        console.log(err.message);
    });
    
    /*
    const scheduler = require('./scheduler/index.js');
    scheduler.start();*/
    const port = 80;
    app.listen(port, function(){
        console.log('listening.. port: ',port);
    });

});
