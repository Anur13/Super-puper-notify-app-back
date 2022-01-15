function reformatResponse(object) {
  const response = object.toJSON();
  const { _id, ...rest } = response;
  const finalObject = { id: _id, ...rest };

  if (response.sys) finalObject.sys = response.sys;
  if (finalObject.password) delete finalObject.password;

  return finalObject;
}
module.exports = { reformatResponse };
