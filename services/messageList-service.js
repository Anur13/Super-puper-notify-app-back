const MessageList = require("../models/messageList-model");
const messageListErrors = require("../errors/messageListErrors");
const messageListDao = require("../dao/messageList-dao");
const checkIfTitleCollisionExists = require("../dao/dao-helpers/collisionCheck");

const MessageListService = {
  create: async function (object) {
    const currentDate = new Date().toISOString();
    const objectWithSys = {
      ...object,
      sys: { created: currentDate, lastUpdated: currentDate },
    };
    objectWithSys.folderId = objectWithSys.folderId || null;

    const collision = await checkIfTitleCollisionExists(
      MessageList,
      objectWithSys.title,
      "title",
      objectWithSys,
    );
    if (collision) {
      throw messageListErrors.sameTitleCreate;
    }
    return messageListDao.create(objectWithSys);
  },
  get: async function (id) {
    const result = await messageListDao.get(id);
    if (result) {
      return result;
    }
    throw messageListErrors.notFound;
  },
  delete: async function (id) {
    const result = await messageListDao.delete(id);
    if (result) {
      return result;
    }
    throw messageListErrors.notFound;
  },
  update: async function (object) {
    const collision = await checkIfTitleCollisionExists(
      MessageList,
      object.title,
      "title",
      object,
    );
    if (collision) {
      throw messageListErrors.sameTitleUpdate;
    }

    const currentDate = new Date().toISOString();
    const { id } = object;
    object.sys.lastUpdated = currentDate;
    return messageListDao.update(id, object);
  },
};

module.exports = MessageListService;
