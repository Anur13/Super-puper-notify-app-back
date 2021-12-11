const FolderServices = require("../services/folder-service");
const {
  folderCreateType,
  folderGetType,
  folderDeleteType,
  folderUpdateType,
} = require("../models/schemas/folder-schema");
const { reformatResponse } = require("../helpers/controller-helper");

const FolderController = {
  create: async function (req, res) {
    const { error, value } = folderCreateType.validate(req.body);
    if (error) return res.status(400).json({ message: error });

    // TODO: add implementation regarding unique folder title in lowerCase
    let response;
    try {
      response = await FolderServices.createFolder(value);
    } catch (e) {
      return res.status(400).send(e);
    }

    const object = reformatResponse(response);

    res.status(201).send(object);
  },

  get: async function (req, res) {
    const { error, value } = folderGetType.validate(req.body);
    if (error) return res.status(400).json({ message: error });

    const { id } = value;
    const response = await FolderServices.getFolder(id);
    if (!response) return res.status(404).send();

    const object = reformatResponse(response);

    res.status(200).send(object);
  },

  delete: async function (req, res) {
    const { error, value } = folderDeleteType.validate(req.body);
    if (error) return res.status(400).json({ message: error });

    const { id } = value;
    const folder = await FolderServices.getFolder(id);
    if (!folder) return res.status(404).json({ message: "Missing such folder" });

    try {
      await FolderServices.deleteFolder(id);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }

    res.status(200).send({});
  },

  update: async function (req, res) {
    const { error, value } = folderUpdateType.validate(req.body);
    if (error) return res.status(400).json({ message: error });

    const { id } = value;
    const folder = await FolderServices.getFolder(id);
    if (!folder) return res.status(404).json({ message: "Missing such folder" });
    // TODO: add implementation regarding unique folder title in lowerCase
    let response;
    try {
      const object = { ...folder.toJSON(), ...value };
      delete object._id;

      response = await FolderServices.updateFolder(object);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }

    const object = reformatResponse(response);

    res.status(200).send(object);
  },
};

module.exports = FolderController;
