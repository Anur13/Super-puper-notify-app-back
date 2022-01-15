const Constants = {
  common: {
    title: "title",
  },
  routes: {
    folder: {
      main: "/folder",
      create: "/create",
      get: "/get",
      delete: "/delete",
      update: "/update",
    },
    user: {
      create: "/registration",
      login: "/login",
    },
    messageList: {
      main: "/messageList",
      create: "/create",
      get: "/get",
      delete: "/delete",
      update: "/update",
    },
    message: {
      main: "/message",
      create: "/create",
      get: "/get",
      delete: "/delete",
      update: "/update",
    },
  },
  errorStatusCodes: {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
  },
};

module.exports = Constants;
