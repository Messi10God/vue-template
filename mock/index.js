const loginMock = require('./login');
const tableMock = require('./table');

const mocks = [...loginMock, ...tableMock]

module.exports = {
  mocks
}