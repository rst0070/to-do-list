const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var router = express.Router();
const app = express();

app.use(cookieParser());
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
 
// Access the session as req.session
app.get('/', function(req, res, next) {
  console.log(req.session.id);
  if (req.session.views) {
    req.session.views++
    /*
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
    */
   res.redirect('/d');
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
router.get('/d', function(req, res, next) {
    console.log(req.session.id);
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  });
app.use(router);
app.listen(80, function(){
    console.log('ddddd');
});