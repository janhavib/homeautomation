var express = require('express');
var app = express();
var route = require('./server/main');
var bodyParser = require('body-parser');

//provide JSON body parsing which will populate req.body property with parsed body 
app.use(bodyParser.json());

app.listen(process.env.port||5000, function(){
	console.log("Magic happens on %d", process.env.port||5000);
});


route(app);

//to serve the static files
app.use(express.static('public'));



