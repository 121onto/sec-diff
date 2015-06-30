var express = require('express');
var exphbs  = require('express-handlebars');
var htmlToText = require('html-to-text');
var request = require('sync-request');
var path = require('path');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

console.dir(argv);

// defaults
argv.l = argv.l || false;
argv.n = argv.n || "new.html";
argv.o = argv.o || "old.html";

function fetchData(origin, destination, callback) {
  var res = request('GET', origin);
  if (res.statusCode == 200) {
    console.log('successfully fetched ' +  origin);
    callback(destination, res.body);
  } else {
    console.log('request failed');
    console.log(res.statusCode);
    console.dir(res.headers);
  }
}

function saveData(outFile, body) {
  console.log('converting to plaintext');
  var plainText = htmlToText.fromString(body, {
    wordwrap: false,
    ignoreImage: true
  });
  console.log('writing ' + outFile);
  fs.writeFileSync(path.join(__dirname, outFile), plainText);
}

if (!argv.l) {
  console.log('fetching new');
  fetchData(argv.n, "public/new.txt", saveData);
  console.log('fetching old');
  fetchData(argv.o, "public/old.txt", saveData);
}

console.log('launching express');

var app = express();
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('home.hbs');
});

app.listen(3000);
