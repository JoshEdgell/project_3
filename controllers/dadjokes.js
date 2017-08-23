const express       = require('express');
const router        = express.Router();
const jokes         = require('../models/dadjokes.js');
const User          = require('../models/user.js');

//Count the number of dad jokes
router.get('/count', (req,res)=>{
  jokes.count(function(error, count) {
    res.send(count.toString());
  });
});

//List of all dad jokes
router.get('/listall', (req,res)=>{
  jokes.find({}, (error, jokes)=>{
    res.json(jokes);
  })
});

//Add joke to favorites
router.post('/favorite', (req,res)=>{
  console.log(req.body);
  if (req.session.logged) {
    User.findOne({'userName' : req.session.username}, (error,foundUser)=>{
      foundUser.favoriteJokes.push(req.body);
      foundUser.save((error,data)=>{
        res.send(true);
      })
    })
  } else {
    res.send(false);
  }
})

//Get single joke by id (have to check)
router.get('/:id', (req,res)=>{
  jokes.find({_id : req.params.id }, function(error,info){
      res.send(info);
  })
});

//New Joke
router.post('/', (req,res)=>{
  jokes.create(req.body, (error, newJoke)=>{
    User.findOne({'userName' : req.session.username} , (error, foundUser)=>{
      foundUser.createdJokes.push(newJoke);
      foundUser.save((error,data)=>{
        res.json(newJoke);
      })
      // console.log(foundUser.createdJokes, 'created jokes');
      // console.log(foundUser);
      // res.json(newJoke);
    })
  })
});

//Edit joke (have to check)
router.put('/:id', (req,res)=>{
  jokes.findByIdAndUpdate(req.params.id, req.body, { new : true }, (err,update)=>{
    res.json(update);
  })
})

//Delete joke
router.delete('/:id', (req,res)=>{
  jokes.findByIdAndRemove(req.params.id, (error, deletedJoke)=>{
    res.json(deletedJoke);
  })
});


module.exports = router;
