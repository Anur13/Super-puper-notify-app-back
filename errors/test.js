class BaseError extends Error {
  constructor(name, statusCode, description, isOperational) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.description = description;
    Error.captureStackTrace(this);
  }
}

//free to extend the BaseError
class APIError extends BaseError {
  constructor(name, httpCode, description, isOperational) {
    super(name, httpCode, description, isOperational);
  }
}

module.exports = APIError;
