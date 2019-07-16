'use strict';
(function () {
  // var appartments = [];
  var PriceBound = {
    LOW_BOUND: 10000,
    HIGH_BOUND: 50000
  };

  var features = document.querySelector('.map__filters').querySelectorAll('input');
  var checkedFeatures = [];

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

  var checkNumber = function (it, item) {
    var itemNumber = document.querySelector('#housing-' + item).value;
    if (itemNumber === 'any') {
      return true;
    } else {
      return parseInt(itemNumber, 10) === it.offer[item];
    }
  };

  var checkFeatures = function (it) {
    var validity = true;
    checkedFeatures.forEach(function (feature) {
      if (it.offer.features.indexOf(feature) === -1) {
        validity = false;
      }
    });
    return validity;
  };

  var filerFunction = function (it) {
    return checktType(it) && checkPrice(it) && checkNumber(it, 'rooms') && checkNumber(it, 'guests')
    && checkFeatures(it);
  };

  var updateAppartments = function (appartments) {
    checkedFeatures = Array.from(features).map(function (it) {
      return it.checked ? it.value : false;
    }).filter(function (it) {
      return it;
    });
    window.pin.renderPins(appartments
      .slice()
      .filter(filerFunction)
      .slice(0, 5));
  };

  window.similar = {
    // successHandler: successHandler,
    // errorHandler: errorHandler,
    updateAppartments: updateAppartments
  };
})();
