const FolderServices = require("../services/folder-service");
const folderValidations = require("../models/schemas/folder-schema");
const { reformatResponse } = require("../helpers/controller-helper");

const FolderController = {
  create: async function (req, res, next) {
    const { error, value } = folderValidations.create.validate(req.body);
    if (error) return res.status(400).json({ message: error });
    let response;
    try {
      response = await FolderServices.createFolder(value);
    } catch (e) {
      next(e);
    }

    const object = reformatResponse(response);

    res.status(201).send(object);
  },

  get: async function (req, res, next) {
    const { error, value } = folderValidations.get.validate(req.body);
    if (error) return res.status(400).json({ message: error });

    const { id } = value;
    let response;
    try {
      response = await FolderServices.getFolder(id);
    } catch (e) {
      next(e);
    }

    const object = reformatResponse(response);

    res.status(200).send(object);
  },

  delete: async function (req, res, next) {
    const { error, value } = folderValidations.delete.validate(req.body);
    if (error) return res.status(400).json({ message: error });

    const { id } = value;

    try {
      await FolderServices.deleteFolder(id);
    } catch (e) {
      next(e);
    }

    res.status(200).send({});
  },

  update: async function (req, res, next) {
    const { error, value } = folderValidations.update.validate(req.body);
    if (error) return res.status(400).json({ message: error });

    let response;
    try {
      response = await FolderServices.updateFolder(value);
    } catch (e) {
      next(e);
    }

    const object = reformatResponse(response);

    res.status(200).send(object);
  },
};

module.exports = FolderController;
