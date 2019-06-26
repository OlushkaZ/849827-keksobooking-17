'use strict';

(function () {
  var Mock = {
    countElements: 8,
    minY: 130,
    maxY: 630,
    maxX: document.querySelector('.map').offsetWidth
  };
  var appartments = [];
  var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var APPARTMENT_PRICE = [10000, 1000, 5000, 0];

  var addMockElement = function (arr, count, type, x, y) {
    arr.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + count + '.png'
          },
          'offer': {
            'type': type
          },
          'location': {
            'x': x,
            'y': y
          }
        });
  };

  var createMock = function () {
    for (var i = 1; i <= Mock.countElements; i++) {
      addMockElement(appartments, i, APPARTMENT_TYPES[window.util.getRandomInt(0, APPARTMENT_TYPES.length - 1)], window.util.getRandomInt(0, Mock.maxX), window.util.getRandomInt(Mock.minY, Mock.maxY));
    }
  };

  window.data = {
    appartments: appartments,
    APPARTMENT_TYPES: APPARTMENT_TYPES,
    APPARTMENT_PRICE: APPARTMENT_PRICE,
    createMock: createMock
  };
})();
