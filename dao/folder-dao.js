const Folder = require("../models/folder-model");

const folderDao = {
  create: async function (object) {
    return Folder.create(object);
  },
  get: async function (id) {
    return Folder.findOne({ _id: id });
  },
  delete: async function (id) {
    return Folder.findOneAndDelete({ _id: id });
  },
  update: async function (object) {
    const { id } = object;
    return Folder.findOneAndUpdate({ _id: id }, object, { new: true });
  },
};
module.exports = folderDao;
