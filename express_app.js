var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));//flower.jpg /direname le dossier courant
app.use(express.static(__dirname + '/'));

app.set('views', __dirname +'/views');


exports.app=app;