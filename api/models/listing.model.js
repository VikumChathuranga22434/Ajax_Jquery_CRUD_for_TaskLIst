import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

const List = mongoose.model("List", listSchema);

export default List;