async function checkIfTitleCollisionExists(model, searchParam, searchParamField, object) {
  let collision;
  const regex = new RegExp("^" + searchParam + "$", "i");
  switch (model.modelName) {
    case "messageList":
      if (object.folderId) {
        collision = await model.findOne({
          title: { $regex: regex },
          folderId: object.folderId,
        });
        break;
      } else {
        collision = await model.findOne({
          title: { $regex: regex },
          folderId: null,
        });
        break;
      }
    default:
      // eslint-disable-next-line no-case-declarations
      const searchObject = {};
      searchObject[searchParamField] = regex;
      collision = await model.findOne(searchObject);
  }

  return collision;
}

module.exports = checkIfTitleCollisionExists;
