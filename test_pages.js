import express from 'express';
import path from 'path';

const app = express();

app.set('views', path.join(path.dirname("../"),"views"));
app.set('view engine', 'ejs');

app.use('/', (req, res) => {
    res.render('login', {layout : 'main'});
});

app.listen(80, () =>{
    console.log('listening..');
});

