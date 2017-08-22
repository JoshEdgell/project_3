const express       = require('express');
const router        = express.Router();
const User          = require('../models/user.js');
const bcrypt        = require('bcrypt');


//Register New User (have to check)
router.get('/register', (req,res)=>{
  res.render('sessions/register.ejs', {
    firstInput: '',
    lastInput: '',
    usernameInput: '',
    passwordFail: false
  });
});
//Create new user (have to check)
router.post('/register',(req,res)=>{
  if (req.body.password != req.body.password2){
    res.render('sessions/register.ejs', {
      passwordFail: true,
      firstInput: req.body.firstName,
      lastInput: req.body.lastName,
      usernameInput: req.body.username
    })
  } else {
      const userDbEntry = {}
        userDbEntry.firstName = req.body.firstName;
        userDbEntry.lastName = req.body.lastName;
        userDbEntry.userName = req.body.username;
        userDbEntry.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      User.create(userDbEntry, (error,user)=>{
        req.session.username = user.username;
        req.session.logged = true;
        res.redirect('/');
      })
  }
});

//View individual user page (have to check)
router.get('/:id', (req,res)=>{
  User.findById(req.params.id, (error,foundUser)=>{
    res.render('users/index.ejs', {
      user: foundUser
    })
  })
});

module.exports = router;
