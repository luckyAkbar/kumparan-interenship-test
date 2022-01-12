'use strict';

class UserRequestError extends Error {
  constructor(message, HTTPErrorCode = 400) {
    super(message);
    this.HTTPErrorCode = HTTPErrorCode;
  }
};

module.exports = UserRequestError;
