var express = require('express');
var app = express();

app.use(express.static('./'));

app.get('/', function(req, res) {
    res.render('index.html');
});

const server = app.listen(8080, () => {
    console.log(`Express is running on port ${server.address().port}`);
});