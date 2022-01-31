class BaseError extends Error {
  constructor(name, statusCode, description, route) {
    super(description);
    // Object.setPrototypeOf(this, new.target.prototype)
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
    this.route = route;
    Error.captureStackTrace(this);
  }
}

class APIError extends BaseError {
  constructor(name, httpCode, description, route) {
    super(name, httpCode, description, route);
  }
}

module.exports = APIError;
