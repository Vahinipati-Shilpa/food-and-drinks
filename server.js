const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/food-and-drinks'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/food-and-drinks/index.html'));
});

app.listen(process.env.PORT || 4200); 

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);