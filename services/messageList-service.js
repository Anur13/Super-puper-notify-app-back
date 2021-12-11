const MessageList = require("../models/messageList-model");
const messageListErrors = require("../errors/messageListErrors");

const MessageListService = {
  create: async function (object) {
    const currentDate = new Date().toISOString();
    const objectWithSys = {
      ...object,
      sys: { created: currentDate, lastUpdated: currentDate },
    };
    objectWithSys.folderId = objectWithSys.folderId || null;

    const collision = await checkIfTitleCollisionExists(objectWithSys);
    if (collision) {
      throw messageListErrors.sameTitleCreate;
    }

    return MessageList.create(objectWithSys);
  },
  get: async function (id) {
    const result = await MessageList.findOne({ _id: id });
    if (result) {
      return result;
    }
    throw messageListErrors.notFound;
  },
  delete: async function (id) {
    const result = await MessageList.findOneAndDelete({ _id: id });
    if (result) {
      return result;
    }
    throw messageListErrors.notFound;
  },
  update: async function (object) {
    const collision = await checkIfTitleCollisionExists(object);
    if (collision) {
      throw messageListErrors.sameTitleUpdate;
    }

    const currentDate = new Date().toISOString();
    const { id } = object;
    object.sys.lastUpdated = currentDate;
    return MessageList.findOneAndUpdate({ _id: id }, object, { new: true });
  },
};

async function checkIfTitleCollisionExists(object) {
  let collision;
  const regex = new RegExp("^" + object.title + "$", "i");
  if (object.folderId) {
    collision = await MessageList.findOne({
      title: { $regex: regex },
      folderId: object.folderId,
    });
  } else {
    collision = await MessageList.findOne({
      title: { $regex: regex },
      folderId: null,
    });
  }
  return !!collision;
}

module.exports = MessageListService;
