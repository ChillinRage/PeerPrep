const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    topic: {type: [String], required: true},
    difficulty: {type: String, required: true},
});

module.exports = mongoose.model("Question", questionSchema);