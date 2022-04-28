const express = require('express')
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/user.js');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ 
    extended: false
})); 

app.use(bodyParser.json());
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/api/user', userRoutes);

app.listen(8080, () => {
    console.log('Server started...');
});