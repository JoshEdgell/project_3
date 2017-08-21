const express       = require('express');
const router        = express.Router();
const user          = require('../models/user.js');
const bcrypt        = require('bcrypt');

//Register New User
router.get('/register', (req,res)=>{
  res.render('sessions/register.ejs', {

  })
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
