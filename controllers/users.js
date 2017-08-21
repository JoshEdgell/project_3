const express       = require('express');
const router        = express.Router();
const User          = require('../models/user.js');
const bcrypt        = require('bcrypt');

//Register New User
router.get('/register', (req,res)=>{
  res.render('sessions/register.ejs', {
    firstInput: '',
    lastInput: '',
    usernameInput: '',
    passwordFail: false
  });
});

router.post('/register', (req,res)=>{
  if (req.body.password != req.body.password2){
    res.render('sessions/register.ejs', {
      passwordFail: true,
      firstInput: req.body.firstName,
      lastInput: req.body.lastName,
      usernameInput: req.body.username
    });
  } else {
    const password = req.body.password
//Going with level 8 because I know this isn't top-secret enough to require level 10 security.
const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const userDbEntry = {};
userDbEntry.firstName = req.body.firstName;
userDbEntry.lastName = req.body.lastName;
userDbEntry.username = req.body.username;
userDbEntry.password = passwordHash;
console.log(userDbEntry);
User.create(userDbEntry, (err,user)=>{
  req.session.username = user.username;
  req.session.logged = true;
  res.redirect('/');
})
  }
})

//Log out
router.get('/logout',(req,res)=>{
  req.session.destroy((error)=>{
    if(error){
      console.log(error);
    } else {
      res.redirect('/');
    }
  })
})
module.exports = router;
