var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId, 
        ref: "Headline"
    },
    date: String,
    noteText: String
});

var Note = mongoose. model("note", noteSchema);

module.exports = Note;