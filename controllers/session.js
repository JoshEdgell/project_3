const express       = require('express');
const router        = express.Router();
const User          = require('../models/user.js');
const bcrypt        = require('bcrypt');

//Log in
router.get('/login', (req,res)=>{
  res.render('sessions/login.ejs', {
    passwordFail: false
  });
})

//Check Login information
router.post('/login', (req,res)=>{
  User.findOne({userName : req.body.userName }, (error,foundUser)=>{
    if(foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.username = req.body.username;
        req.session.logged = true;
        res.redirect('/');
      } else {
        res.render('sessions/login.ejs', {
          passwordFail: true
        })
      }
    } else {
      res.render('sessions/login.ejs', {
        passwordFail: true
      })
    }
  })
});

//Log out (have to check)
router.get('/logout',(req,res)=>{
  req.session.destroy((error)=>{
    if(error){
      console.log(error);
    } else {
      res.redirect('/');
    }
  })
});

module.exports = router;
