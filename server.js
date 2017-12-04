const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var config = require('./config');

//connecting to the database
// mongoose.Promise = global.Promise;
mongoose.connect(config.database);

const app = express();


//Routes
const user = require('./server/routes/user');
const branch = require('./server/routes/branch');
const category = require('./server/routes/category');
var service = require('./server/routes/service');
var cart = require('./server/routes/cart');
const promocode = require('./server/routes/promocode');
/*const cart = require('./server/routes/cart');
const order = require('./server/routes/order');*/

//Middleware
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//Making Use of Routes
app.use('/api', user);
app.use('/api', branch);
app.use('/api', category);
app.use('/api', service);
app.use('/api', cart);
app.use('/api', promocode);
/*app.use('/api/order', order);*/


//Catch 404 Errors and forword then to error handler function
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error Handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    //Respond to client
    res.status(status).json({
        error: {
            status:status,
            message: error.message
        }
    });

    //Respond to ourselves
    console.error(err);
});


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Start the server
const port = config.port || 3000;
app.listen(port, () => console.log('server is listening on port', port));


