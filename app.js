const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const PORT = process.env.PORT || 3000;


// cors
app.use(cors());

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('tiny'));

// set port
app.set('port', PORT);

app.use('/api', userAPI);


const server = require('http').createServer(app);
server.listen(app.get('port'), function() {
    console.log(`App Running on Port ${app.get('port')}`);
});