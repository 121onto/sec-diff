var express = require('express');
var exphbs  = require('express-handlebars');
var htmlToText = require('html-to-text');
var request = require('sync-request');
var path = require('path');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

// defaults
argv.l = argv.l || false;
argv.n = argv.n || "new.html";
argv.o = argv.o || "old.html";

function fetchData(origin, destination, callback) {
  var res = request('GET', origin);
  if (res.statusCode == 200) {
    callback(destination, res.body);
  } else {
    console.log('request failed');
    console.log(res.statusCode);
    console.dir(res.headers);
  }
}

function saveData(outFile, body) {
  var plainText = htmlToText.fromString(body, {
    wordwrap: false,
    ignoreImage: true
  });
  fs.writeFileSync(path.join(__dirname, outFile), plainText);
}

if (!argv.l) {
  fetchData(argv.n, "public/new.txt", saveData);
  fetchData(argv.o, "public/old.txt", saveData);
}

var app = express();
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('home.hbs');
});


var server = app.listen(3000, function(){
  //and... we're live
  var port = server.address().port;
  console.log('Server is running on port', port);
});
