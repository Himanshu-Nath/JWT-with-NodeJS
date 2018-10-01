const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/node_modules', express.static(__dirname + '/node_modules'));

encode();
var authToken;
var cert;
function encode() {
    console.log("Inside Encode");
    cert = fs.readFileSync('./private.key', 'utf8');

    // basic encryption
    // authToken = jwt.sign({ foo: 'bar', name: 'Himanshu Nath', password: '1234' }, 'shhhhh');

    // //RSA SHA384
    // var authToken = jwt.sign({ username: 'amt6327', password: '987881238' }, cert, { algorithm: 'RS384', expiresIn: '1h'});
    // console.log(authToken);

    //RSA SHA384
    jwt.sign({ username: 'amit6327', password: '987881238' }, cert, { algorithm: 'RS384', expiresIn: '1h'}, function(err, token) {
        authToken = token;
        console.log(token);
        verify();
    });
}

function verify() {
    console.log("Inside Verify");
    let publicKey = fs.readFileSync('./public.key', 'utf8');
    try {
        // var decoded = jwt.verify(authToken, publicKey);
        // console.log(decoded)
        jwt.verify(authToken, publicKey, function(err, decoded) {
            console.log(decoded);
            decode();
        });
    } catch(err) {
        console.log(err);
    }
}

function decode() {
    console.log("Inside Decode");
    // var decoded = jwt.decode(authToken);
    var decoded = jwt.decode(authToken, {complete: true});
    console.log(decoded);
}

app.listen(port, function () {
    console.log("Server is running at port: " + port);
})