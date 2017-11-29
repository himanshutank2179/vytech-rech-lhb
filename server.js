const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
var config = require('./config');

const api = require('./server/routes/api');
const branch = require('./server/routes/branch');
var service = require('./server/routes/service');
const category = require('./server/routes/category');
const promocode = require('./server/routes/promocode');
const cart = require('./server/routes/cart');
const order = require('./server/routes/order');



const port = config.port;

const app = express();
app.use(morgan('combined'))

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/api', api);
app.use('/api/branch', branch);
app.use('/api/service', service);
app.use('/api/category', category);
app.use('/api/promocode', promocode);
app.use('/api/cart', cart);
app.use('/api/order', order);




app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function (err) {
    if (err) {
        console.error('Error in connect to db make sure mongodb is running' + err);
    }
    console.log('server running on port: ' + port);
});
