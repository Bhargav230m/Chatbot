const {model, Schema} = require('mongoose');

let AI = new Schema({
    Guild: String,
    Channel: String,
    cooldown: String,
});

module.exports = model("AI", AI);