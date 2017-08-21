const mongoose      = require('mongoose');

const jokeSchema = mongoose.Schema({
  api_id: String,
  joke: String
});

const jokes = mongoose.model('jokes', jokeSchema);

module.exports = jokes;
