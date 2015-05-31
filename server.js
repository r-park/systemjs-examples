var express = require('express');
var app = express();


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('.'));


app.get('/bundled', function(req, res){
  res.render('bundled');
});

app.get('/executable', function(req, res){
  res.render('executable');
});

app.get('/runtime', function(req, res){
  res.render('runtime');
});

app.get('/transpiled', function(req, res){
  res.render('transpiled');
});


var server = app.listen(7000, 'localhost', function(){
  console.info('Express listening on port ' + server.address().port);
});
