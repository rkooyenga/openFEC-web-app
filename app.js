var express = require('express'),
    handlebars = require('express-handlebars');

var app = express();

var tmpls = handlebars.create({
    defaultLayout: 'main',
    partialsDir: ['views/partials']
});

app.engine('handlebars', tmpls.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res, next) {
    res.render('search', {thing: 'yup'});
});

app.listen(8000, "0.0.0.0");
