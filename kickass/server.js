const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose')
const userHolder = require('./app/models/user')
const db = "mongodb://admin:admin@ds123312.mlab.com:23312/promo7"
const port = process.env.port || 3000;

// DB Connection

mongoose.connect(db)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// API's route

app.use('/api', router)
router.use((req, res, next) => {
  console.log('something is happening');
  next();
})
app.use(express.static('build'));

// Routes

router.route('/users')
  .get((req, res) => {
    userHolder.find((err, user) => {
      if(err)
      res.send(err);

      res.json(user);
    })
  })
router.route('/api/user')
  .post((req, res) => {
    const user = new userHolder()
    user.name = req.body.name;
    user.age = req.body.age;
    user.type = req.body.type;

    user.save((err) => {
      res.sendFile(path.join(__dirname + 'added.html'))
    })
  })
router.route('/user/:user_id')
  .get((req, res) => {
    userHolder.findById(req.params.user_id, (err, user) => {
      if(err)
        res.send(err);

      res.json(user);
    })
  })
  .put((req, res) => {
    userHolder.findById(req.params.user_id, (err, user) => {
      if(err)
        res.send(err);

      user.name = req.body.name;
      user.age = req.body.age;
      user.type = req.body.type;

      user.save((err) => {
        if(err)
          res.send(err);

        res.sendFiles(path.join(__dirname + 'src/App.js'))
      })
    })
  })
  .delete((req, res) => {
    userHolder.remove({
      _id: req.params.user_id
    }, (err, user) => {
      if(err)
        res.send(err);

      res.sendFiles(path.join(__dirname + 'src/App.js'))
    })
  })

app.get('*', (req, res) =>{
  res.status(404).send("Je sais pas où vous allez, mais c'est pas par là...")
})

app.listen(port);
console.log('port 3000');
