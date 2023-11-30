const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PostSchema = new Schema ({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
        required: true,
    },
    
    hidden: {
        type: Boolean,
        default: false,
    },

   /*  user: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
    }, */
}, {tiemstamps: true});

module.exports = Mongoose.model("api-prueba", PostSchema);