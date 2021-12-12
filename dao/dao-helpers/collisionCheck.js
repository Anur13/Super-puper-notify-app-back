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
      collision = await model.findOne({
        searchParamField: { $regex: regex },
      });
  }

  return !!collision;
}

module.exports = checkIfTitleCollisionExists;
