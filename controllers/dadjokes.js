const express       = require('express');
const router        = express.Router();

router.get('/', (req,res)=>{
  res.send('trying to access dad jokes');
});


module.exports = router;
