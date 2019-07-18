const express = require('express');
const app = express();
var path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function (req,res) {
    res.sendFile('index.html');
    
});

const port = process.env.PORT || 3000;
const ip = process.env.IP || "127.0.0.1";
app.listen(port,function(){
    console.log("Server has started .... at port "+ port+" ip: "+ip);
});