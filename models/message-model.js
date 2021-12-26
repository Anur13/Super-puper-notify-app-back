const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const message = new Schema(
    {
        messageListId: {
            type: ObjectId,
        },
        content : String,
        sys: {
            created: {
                type: Date,
            },
            lastUpdated: {
                type: Date,
            },
        },
    },
    { versionKey: false },
);

const Message = mongoose.model("message", message);

module.exports = Message;
