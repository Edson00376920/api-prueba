const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const QuizzSchema = new Schema({
    description: {
        type: String,
        trim: true,
        required: true,
    },

    quizzQA: {
        type: [Schema.Types.ObjectId],
        ref: "Quizzqa",
        default: [],
    },

    time_limit: {
        type: Number,
    },

}, { timestamps: true });

module.exports = Mongoose.model("Quizz", QuizzSchema);