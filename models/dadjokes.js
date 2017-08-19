const mongoose      = require('mongoose');

const jokeSchema = mongoose.Schema({

});

const jokes = mongoose.model('jokes', jokeSchema);

module.exports = jokes;
