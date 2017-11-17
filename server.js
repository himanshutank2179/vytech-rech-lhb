const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./server/routes/api');
const port = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', api);

app.get('*', function (req, res0) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.error('Error in connect to db ' + err);
    }
    console.log('server running on port: ' + port);
});
