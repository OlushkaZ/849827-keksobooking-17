'use strict';
(function () {
  var PriceBound = {
    LOW_BOUND: 10000,
    HIGH_BOUND: 50000
  };
  var MAX_OFFER_COUNT = 5;
  var features = document.querySelector('.map__filters').querySelectorAll('input');
  var checkedFeatures = [];

  var checktType = function (it) {
    var apartmentsType = document.querySelector('#housing-type').value;
    if (apartmentsType === 'any') {
      return true;
    } else {
      return it.offer.type === apartmentsType;
    }
  };

  var checkPrice = function (it) {
    var apartmentsPrice = document.querySelector('#housing-price').value;
    switch (apartmentsPrice) {
      case 'any':
        return true;
      case 'middle':
        return it.offer.price >= PriceBound.LOW_BOUND && it.offer.price <= PriceBound.HIGH_BOUND;
      case 'low':
        return it.offer.price < PriceBound.LOW_BOUND;
      case 'high':
        return it.offer.price > PriceBound.HIGH_BOUND;
      default:
        return false;
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

  var filerFunction = function (offer) {
    return checktType(offer) && checkPrice(offer) && checkNumber(offer, 'rooms') && checkNumber(offer, 'guests')
    && checkFeatures(offer);
  };

  var updateApartments = function (apartments) {
    checkedFeatures = Array.from(features).map(function (item) {
      return item.checked ? item.value : false;
    }).filter(function (item) {
      return item;
    });
    window.pin.render(apartments
      .slice()
      .filter(filerFunction)
      .slice(0, MAX_OFFER_COUNT));
  };

  window.similar = {
    updateApartments: updateApartments
  };
})();
