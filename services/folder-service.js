const folderDao = require("../dao/folder-dao");
const Folder = require("../models/folder-model");
const checkIfTitleCollisionExists = require("../dao/dao-helpers/collisionCheck");
const folderErrors = require("../errors/folderErrors");
const Constant = require("../common/constants/constants");

const FolderServices = {
  createFolder: async function (object) {
    const currentDate = new Date().toISOString();

    const objectWithSys = {
      ...object,
      sys: { created: currentDate, lastUpdated: currentDate },
    };

    const collision = await checkIfTitleCollisionExists(
      Folder,
      objectWithSys.title,
      Constant.common.title,
      objectWithSys,
    );
    if (collision) {
      throw folderErrors.sameTitleCreate;
    }

    return folderDao.create(objectWithSys);
  },
  getFolder: async function (id) {
    const folder = await folderDao.get(id);
    if (!folder) throw folderErrors.notFound;

    return folder;
  },

  deleteFolder: async function (id) {
    const folder = await folderDao.delete(id);
    if (!folder) throw folderErrors.notFound;
    return folder;
  },

  updateFolder: async function (value) {
    const currentDate = new Date().toISOString();
    const { id } = value;
    let folder;

    if (value.title) {
      const folder = await checkIfTitleCollisionExists(
        Folder,
        value.title,
        Constant.common.title,
        value,
      );
      if (folder) {
        throw folderErrors.sameTitleCreate;
      }
    }
    folder = await FolderServices.getFolder(id);
    if (!folder) throw folderErrors.notFound;

    const object = { ...folder.toJSON(), ...value };
    delete object._id;

    object.sys.lastUpdated = currentDate;
    return folderDao.update(object);
  },
};

module.exports = FolderServices;
