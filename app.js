const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');

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

//post middleware
app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved succesfully!'
            })
        }
    ).catch( error => {
        res.status(400).json({
            error
        })
    })
});

//get middleware

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(thing => {
        res.status(200).json(thing);
    }).catch(error => {
        res.status(404).json({
            error
        })
    })
})


app.get('/api/stuff', (req, res, next) => {
    Thing.find().then(
        things => {
            res.status(200).json(things);
        }
    ).catch(
        error => {
            res.status(400).json({
                error
            })
        }
    )
});


//put middlewares
app.put('/api/stuff/:id', (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    Thing.updateOne({
        _id: req.params.id
    }, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            })
        }
    ).catch(error => {
        res.status(400).json({
            error
        })
    })
});


//middleware to delete a thing

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id }).then(
        () => {
            res.status(200).json({
                message: `Item with id ${req.params.id} deleted successfully!`
            })
        }
    ).catch(error => {
        res.status(400).json({error})
    })
})


module.exports = app;