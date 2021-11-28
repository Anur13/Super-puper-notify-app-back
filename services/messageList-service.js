const MessageList = require("../models/messageList-model");

const MessageListService = {
  create: async function (object) {
    // TODO: Transfer to get
    const currentDate = new Date().toISOString();
    const objectWithSys = {
      ...object,
      sys: { created: currentDate, lastUpdated: currentDate },
    };
    objectWithSys.folderId = objectWithSys.folderId || null;

    let duplicateCheck;
    if (objectWithSys.folderId) {
      duplicateCheck = await MessageList.findOne({
        folderId: objectWithSys.folderId,
        title: objectWithSys.title,
      });
    } else {
      duplicateCheck = await MessageList.findOne({
        title: objectWithSys.title,
        folderId: null,
      });
    }

    if (duplicateCheck) {
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
  update: function (object) {
    const currentDate = new Date().toISOString();

    const { id } = object;

    object.sys.lastUpdated = currentDate;
    return MessageList.findOneAndUpdate({ _id: id }, object, { new: true });
  },
};

module.exports = MessageListService;
