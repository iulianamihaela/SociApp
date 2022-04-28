const express = require('express')
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const userRoutes = require('./routes/user.js');

const app = express();

app.use(bodyParser.urlencoded({ 
    extended: false
})); 

app.use(bodyParser.json());
app.use(cors());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', async (req, res) => {
    res.send('SociApp server...');
});

app.use('/api/user', userRoutes);

app.listen(8080, () => {
    console.log('Server started...');
});