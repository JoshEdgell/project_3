const express         = require('express');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const app             = express();
const router          = express.Router();
const session         = require('express-session');
const bcrypt          = require('bcrypt');
const ejs             = require('ejs');

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: "That's what she said",
  resave: false,
  saveUninitialized: false
}))

//Routers
const dadJokeController = require('./controllers/dadjokes.js');
app.use('/jokes', dadJokeController);
const userController = require('./controllers/users.js');
app.use('/users', userController);

app.get('/', (req,res)=>{
  res.render(index.html);
});

mongoose.connect('mongodb://localhost:27017/dadjokes', {useMongoClient : true });

mongoose.connection.once('open', ()=>{
  console.log('I walked into a zoo that only had one animal, a dog.  It was a shitzu.');
});

app.listen(3000, ()=>{
  console.log("What was a more important invention than the telephone?  The second one.")
  console.log('==================PORT 3000=============================')
})
