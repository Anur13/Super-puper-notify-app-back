function reformatResponse(response) {
  const { _id, title, sys, ...rest } = response.toJSON();
  return { id: _id, title, ...rest, sys };
}
module.exports = reformatResponse;
