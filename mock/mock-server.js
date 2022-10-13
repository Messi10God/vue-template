const chokidar = require('chokidar');
const express = require('express');
const path = require('path');
const Mock = require('mockjs');

const mockDir = path.join(process.cwd(), 'mock');

function registerRoutes(app) {
  let mockLastIndex;
  const { mocks } = require('./index.js');
  const mocksForServer = mocks.map((route) => {
    return responseFake(route);
  });
  
  for (const mock of mocksForServer) {
    app[mock.type](
      mock.url,
      [express.json(), express.urlencoded({ extended: true })],
      mock.response,
    );
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach((i) => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

const responseFake = ({ url, type, response, timeout = 100 }) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_MOCK_API}${url}`.replace(/\/{2,}/g, '/')),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path);
      setTimeout(
        () => res.json(Mock.mock(response instanceof Function ? response(req, res) : response)),
        timeout,
      );
    },
  };
};

module.exports = function(middlewares, devServer) {
  if (!devServer) {
    throw new Error('webpack-dev-server is not defined');
  }
  const app = devServer.app;

  const mockRoutes = registerRoutes(app);
  let mockRoutesLength = mockRoutes.mockRoutesLength;
  let mockStartIndex = mockRoutes.mockStartIndex;

  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          console.log(`\n > Mock Server hot reload success! changed  ${path}`);
        } catch (error) {
          console.log(error);
        }
      }
    });
  return middlewares;
}