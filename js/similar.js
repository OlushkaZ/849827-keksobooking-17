'use strict';
(function () {
  var appartments = [];
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var filerFunction = function (it) {
    if (appartmentsType === 'any') {
      return true;
    } else {
      return it.offer.type === appartmentsType;
    }
  };

  var appartmentsType = window.filterForm.typeSelect.value;
  var updateAppartments = function () {
    window.render(appartments
      .slice()
      .filter(filerFunction)
      .slice(0, 5));
  };

  window.filterForm.onHousingTypeChange = window.debounce(function (type) {
    appartmentsType = type;
    updateAppartments();
  });

  var successHandler = function (data) {
    appartments = data;
    updateAppartments();
  };

  var errorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', errorElement);
  };

  window.load(successHandler, errorHandler);
})();
