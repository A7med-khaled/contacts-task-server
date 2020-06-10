const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const Config = require('./config');
const { userAPI } = require('./components/user');
const { contactAPI } = require('./components/contact');

const PORT = process.env.PORT || 3000;

// database connection
mongoose.connect(Config.dbURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, () => {
    // seed the application with pre defined data
    console.log('DB Connected To ' + Config.dbURI)
});

// cors
app.use(cors());

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('tiny'));

// set port
app.set('port', PORT);

app.use('/api', userAPI);
app.use('/api', contactAPI);

const { User } = require('./components/user');




const server = require('http').createServer(app);
server.listen(app.get('port'), function() {
    console.log(`App Running on Port ${app.get('port')}`);
});