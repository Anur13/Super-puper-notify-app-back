const MessageList = require("../models/messageList-model");

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
      return null;
    }

    return MessageList.create(objectWithSys);
  },
  get: function (id) {
    return MessageList.findOne({ _id: id });
  },
  delete: function (id) {
    return MessageList.findOneAndDelete({ _id: id });
  },
  update: async function (object) {
    const collision = await checkIfTitleCollisionExists(object);
    if (collision) {
      return null;
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
