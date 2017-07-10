var express = require('express');
var app = express();

app.get('/', function(request, response){
	res.send("HOLA");
});

app.listen(3000);