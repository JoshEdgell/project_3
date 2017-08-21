const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName:       String,
  firstName:      String,
  lastName:       String,
  favoriteJokes:  Array,
  password:       String
});

const user = mongoose.model('user',userSchema);

module.exports = user;
