
const mongoose  = require('mongoose');
const Joke      = require('./dadjokes.js');


const userSchema = mongoose.Schema({
  userName:       String,
  firstName:      String,
  lastName:       String,
  favoriteJokes:  [Joke.schema],
  password:       String
});

const user = mongoose.model('user',userSchema);

module.exports = user;
