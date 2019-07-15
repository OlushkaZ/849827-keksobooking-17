
'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  // var typeSelect = filterForm.querySelector('#housing-type');
  // var priceSelect = filterForm.querySelector('#housing-price');

  var setInactivFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  var setActivFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  var onHousingTypeChange = function () {};

  // typeSelect.addEventListener('change', function () {
  //   window.debounce(function () {
  //     window.similar.updateAppartments();
  //   })();
  //   window.card.remove();
  // });

  filterForm.addEventListener('change', function () {
    window.debounce(function () {
      window.similar.updateAppartments();
    })();
    window.card.remove();
  });

  // priceSelect.addEventListener('change', function () {
  //   window.debounce(function () {
  //     window.similar.updateAppartments();
  //   })();
  //   window.card.remove();
  // });

  var filterReset = function () {
    filterForm.reset();
  };

  window.filterForm = {
    setInactivFilterForm: setInactivFilterForm,
    setActivFilterForm: setActivFilterForm,
    onHousingTypeChange: onHousingTypeChange,
    // typeSelect: typeSelect,
    // priceSelect: priceSelect,
    filterReset: filterReset
  };

})();
