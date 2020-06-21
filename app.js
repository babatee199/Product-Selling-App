const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const stuffRouters = require('./routes/stuff');

const app = express();

// Username: babatope
// Password: 53zH6blCfRaW8813
// Connection Link: mongodb+srv://babatope:<password>@cluster0-kps2s.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://babatope:53zH6blCfRaW8813@cluster0-kps2s.mongodb.net/<dbname>?retryWrites=true&w=majority')
.then(()=> {
    console.log('Successfully connected to MongoDB Atlas!');
})
.catch(error => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.log(error);
})
//global middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());

app.use('/api/stuff', stuffRouters);


module.exports = app;