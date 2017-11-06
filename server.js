

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const mongoose = require('mongoose');
const app            = express();
const port = 8000;
const path =require('path');





app.use(bodyParser.urlencoded({ extended: true }));
app.use("/img",express.static("img"));
app.use("/css",express.static("css"));
app.use("/js",express.static("js"));
app.use("/app",express.static("app"));

app.use("/pages",express.static("pages"));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/add.html'));
});






MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})