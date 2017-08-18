const express       = require('express');
const router        = express.Router();
const jokes         = require('../models/dadjokes.js');

//route that (should) return the number of dad jokes we have
router.get('/count', (req,res)=>{
  jokes.count(function(error, count) {
    res.send(count.toString());
  });
});


module.exports = router;
