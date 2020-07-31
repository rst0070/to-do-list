
module.exports = function(req, res, next){
    if(!req.session.login && req.path != '/login'){
        console.log('not logged');
        res.redirect('/login');
        return;
    }
    console.log('logged or going to login');
    next();
};