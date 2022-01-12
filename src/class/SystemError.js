'use strict';

class SystemError extends Error {
  constructor(message, HTTPErrorCode = 500) {
    super(message);
    this.HTTPErrorCode = HTTPErrorCode;
  }
}

module.exports = SystemError;
