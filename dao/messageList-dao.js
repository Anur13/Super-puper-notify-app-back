const MessageList = require("../models/messageList-model");

const messageListDao = {
  create: async function (object) {
    return MessageList.create(object);
  },
  get: async function (id) {
    return MessageList.findOne({ _id: id });
  },
  delete: async function (id) {
    return MessageList.findOneAndDelete({ _id: id });
  },
  update: async function (id, object) {
    return MessageList.findOneAndUpdate({ _id: id }, object, { new: true });
  },
};
module.exports = messageListDao;
