import mongoose from "mongoose";

class ErrorHandler extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

const asyncErrorHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const errorHandler = (err, req, res, next) => {
    console.log(err);
  if (err instanceof ErrorHandler) {
    res.status(err.code).json({ message: err.message });
  } else if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((value) => value.message);
    res.status(400).json({ message: messages });
  } else {
    res.status(500).json({ message: err.message });
  }
};

export default ErrorHandler;
export { asyncErrorHandler, errorHandler };
