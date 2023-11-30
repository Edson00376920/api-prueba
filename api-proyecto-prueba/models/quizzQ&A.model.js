const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const QuizzqaSchema = new Schema ({

    Quizz_question:{
        type: String,
        trim: true,
        required: true,
    },

    Quizz_answer:{
        type: [String],
        trim: true,
        required: true,
    },

    Quizz_answer_correct:{
        type: String,
        trim: true,
        required: true,
    },

});

module.exports = Mongoose.model("Quizzqa", QuizzqaSchema);