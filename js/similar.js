'use strict';
(function () {
  var appartments = [];
  var PriceBound = {
    LOW_BOUND: 10000,
    HIGH_BOUND: 50000
  };
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var checktType = function (it) {
    var appartmentsType = document.querySelector('#housing-type').value;
    if (appartmentsType === 'any') {
      return true;
    } else {
      return it.offer.type === appartmentsType;
    }
  };

  var checkPrice = function (it) {
    var appartmentsPrice = document.querySelector('#housing-price').value;
    switch (appartmentsPrice) {
      case 'any':
        return true;
      case 'middle':
        return it.offer.price >= PriceBound.LOW_BOUND && it.offer.price <= PriceBound.HIGH_BOUND;
      case 'low':
        return it.offer.price < PriceBound.LOW_BOUND;
      case 'high':
        return it.offer.price > PriceBound.HIGH_BOUND;
      default:
        throw new Error('Неизвестный диапазон цен' + appartmentsPrice);
    }
  };

  var checkRoomNumber = function (it) {
    var roomNumber = document.querySelector('#housing-rooms').value;
    if (roomNumber === 'any') {
      return true;
    } else {
      return parseInt(roomNumber, 10) === it.offer.rooms;
    }
  };

  var checkGuestNumber = function (it) {
    var guestNumber = document.querySelector('#housing-guests').value;
    if (guestNumber === 'any') {
      return true;
    } else {
      return parseInt(guestNumber, 10) === it.offer.guests;
    }
  };

  var checkWifi = function (it) {
    var wifi = document.querySelector('#filter-wifi').checked;
    if (!wifi) {
      return true;
    } else {
      return it.offer.features.indexOf('wifi') >= 0;
    }
  };
  var checkDishwasher = function (it) {
    var dishwasher = document.querySelector('#filter-dishwasher').checked;
    if (!dishwasher) {
      return true;
    } else {
      return it.offer.features.indexOf('dishwasher') >= 0;
    }
  };
  var checkParking = function (it) {
    var parking = document.querySelector('#filter-parking').checked;
    if (!parking) {
      return true;
    } else {
      return it.offer.features.indexOf('parking') >= 0;
    }
  };

  var filerFunction = function (it) {
    return checktType(it) && checkPrice(it) && checkRoomNumber(it) && checkGuestNumber(it)
    && checkWifi(it) && checkDishwasher(it) && checkParking(it);
  };

  var updateAppartments = function () {
    window.pin.renderPins(appartments
      .slice()
      .filter(filerFunction)
      .slice(0, 5));
  };

  var successHandler = function (data) {
    appartments = data;
    updateAppartments();
  };

  var errorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', errorElement);
  };

  window.similar = {
    successHandler: successHandler,
    errorHandler: errorHandler,
    updateAppartments: updateAppartments
  };
})();
