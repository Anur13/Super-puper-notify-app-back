const Folder = require("../models/folder-model");

const ContactServices = {
  //FIXME Is this right name?
  createFolder: function (object) {
    const currentDate = new Date().toISOString();

    const objectWithSys = {
      ...object,
      sys: { created: currentDate, lastUpdated: currentDate },
    };
    //TODO: check if folder with such title already exists
    return Folder.create(objectWithSys);
  },
  getFolder: function (id) {
    return Folder.findOne({ _id: id });
  },

  deleteFolder: function (id) {
    return Folder.findOneAndDelete({ _id: id });
  },

  updateFolder: function (object) {
    const currentDate = new Date().toISOString();

    const { id } = object;

    object.sys.lastUpdated = currentDate;
    return Folder.findOneAndUpdate({ _id: id }, object, { new: true });
  },
};

module.exports = ContactServices;
