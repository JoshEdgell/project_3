const express       = require('express');
const router        = express.Router();
const jokes         = require('../models/dadjokes.js');

//Count the number of dad jokes
router.get('/count', (req,res)=>{
  jokes.count(function(error, count) {
    res.send(count.toString());
  });
});

//List of all dad jokes (have to check)
router.get('/listall', (req,res)=>{
  jokes.find({}, (error, jokes)=>{
    res.json(jokes);
  })
});

//Get single joke by id (have to check)
router.get('/:id', (req,res)=>{
  jokes.find({_id : req.params.id }, function(error,info){
      res.send(info);
  })
});

//New Joke (have to check)
router.post('/', (req,res)=>{
  jokes.create(req.body, (error, newJoke)=>{
    res.json(newJoke);
  })
});

//Edit joke (have to check)
router.put('/:id', (req,res)=>{
  jokes.findByIdAndUpdate(req.params.id, req.body, { new : true }, (error,updateJoke)=>{
    res.json(updateJoke);
  })
});

//Delete joke (have to check)
router.delete(':/id', (req,res)=>{
  jokes.findByIdAndRemove(req.params.id, (error, deletedJoke)=>{
    res.json(deletedJoke);
  })
});


module.exports = router;
