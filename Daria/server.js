var express = require('express');
var app = express();

app.use(express.static('./'));

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/review', function(req, res) {
    res.render('review.html');
});

app.get('/projet1', function(req, res) {
    res.render('projet1.html');
});

app.get('/projet2', function(req, res) {
    res.render('projet2.html');
});

const server = app.listen(8080, () => {
    console.log(`Express is running on port ${server.address().port}`);
}); 