const messageDao = require("../dao/message-dao");
const messageErrors = require("../errors/messageErrors");

const MessageService = {
  create: async function(object) {
    return messageDao.create(object);
  },
  get: async function(id) {
    const result = await messageDao.get(id);
    if (!result) {
      throw messageErrors.notFound;
    }
    return result;
  },
  delete: async function(id) {
    return messageDao.delete(id);
  },
  update: async function(object) {
    return messageDao.update(object);
  },
};

module.exports = MessageService;
