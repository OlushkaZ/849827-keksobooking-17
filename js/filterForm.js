
'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');

  var toggleActiveFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  filterForm.addEventListener('change', function () {
    window.debounce(function () {
      window.similar.updateApartments(window.map.apartments);
    })();
    window.card.remove();
  });

  var filterReset = function () {
    filterForm.reset();
  };

  window.filterForm = {
    toggleActiveFilterForm: toggleActiveFilterForm,
    filterReset: filterReset
  };

})();
