'use strict';
(function () {
  var appartments = [];
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
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      case 'low':
        return it.offer.price < 10000;
      case 'high':
        return it.offer.price > 50000;
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

  // window.filterForm.onHousingTypeChange = window.debounce(function (type) {
  //   // appartmentsType = type;
  //   updateAppartments();
  // });

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
