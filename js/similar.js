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
    var appartmentsType = window.filterForm.typeSelect.value;
    if (appartmentsType === 'any') {
      return true;
    } else {
      return it.offer.type === appartmentsType;
    }
  };

  var checkPrice = function (it) {
    var appartmentsPrice = window.filterForm.priceSelect.value;
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

  var filerFunction = function (it) {
    return checktType(it) && checkPrice(it);
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
