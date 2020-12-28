var express = require('express');
var app = express();

app.use(express.static('./'));

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/projet/:id', function(req, res) {
    let projectId = req.params.id;
    res.render('projet', {projectId: projectId});
});

const server = app.listen(8080, () => {
    console.log(`Express is running on port ${server.address().port}`);
}); 