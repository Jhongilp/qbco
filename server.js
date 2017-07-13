var express = require("express");

var app = express();
var port = process.env.PORT || 3000 || 8080;

app.use(express.static('dist'));

app.listen(port, function() {
    console.log('Express server is up in port ' + port);
});