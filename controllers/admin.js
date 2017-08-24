const express     = require('express');
const router      = express.Router();
const Joke        = require('../models/dadjokes.js');
const User        = require('../models/user.js');

router.get('/',(req,res)=>{
  User.find({},(error,foundUsers)=>{
    Joke.find({},(error,foundJokes)=>{
      res.render('admin/index.ejs', {
        users: foundUsers,
        jokes: foundJokes,
      })
    })
  })
})

router.delete('/joke/:id',(req,res)=>{
  Joke.findByIdAndRemove(req.params.id, (err,foundJoke)=>{
    res.redirect('/admin');
  })
})

router.delete('/user/:id',(req,res)=>{
  User.findByIdAndRemove(req.params.id, (err, foundUser)=>{
    res.redirect('/admin');
  })
})


module.exports = router;
