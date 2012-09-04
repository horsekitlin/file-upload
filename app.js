
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , store = require('./routes/store');
//var app = module.exports = express.createServer();
var app  = express.createServer();
// Configuration

app.configure(function(){
    //set html template dir
  app.set('views', __dirname + '/views');
  //set html engine
  app.set('view engine', 'jade');
  //set bodyPaser
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.post('/file_upload',store.home );
//app.get('/',store.home);
//console.log(store);
app.listen(3000, function(){
    //console.log(routes.index());
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
