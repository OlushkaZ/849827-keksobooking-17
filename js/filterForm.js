
'use strict';

(function () {

  var filterForm = document.querySelector('.map').querySelector('.map__filters');
  var typeSelect = filterForm.querySelector('#housing-type');
  var priceSelect = filterForm.querySelector('#housing-price');

  var setInactivFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  var setActivFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  var onHousingTypeChange = function () {};

  typeSelect.addEventListener('change', function () {
    window.debounce(function () {
      window.similar.updateAppartments();
    })();
    window.card.removeCard();
  });

  // priceSelect.addEventListener('change', function (evt) {
  //   window.filterForm.onHousingTypeChange(evt.target.value);
  //   window.card.removeCard();
  // });

  priceSelect.addEventListener('change', function () {
    window.debounce(function () {
      window.similar.updateAppartments();
    })();
    window.card.removeCard();
  });

  window.filterForm = {
    setInactivFilterForm: setInactivFilterForm,
    setActivFilterForm: setActivFilterForm,
    onHousingTypeChange: onHousingTypeChange,
    typeSelect: typeSelect,
    priceSelect: priceSelect
  };

})();
