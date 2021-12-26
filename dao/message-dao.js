const Message = require("../models/message-model");

const messageDao = {
  create: async function(object) {
    return Message.create(object);
  },
  get: async function(id) {
    return Message.findOne({ _id: id });
  },
  delete: async function(id) {
    return Message.findOneAndDelete({ _id: id });
  },
  update: async function(object) {
    return Message.findOneAndUpdate({ _id: object.id }, object, { new: true });
  },
};
module.exports = messageDao;
