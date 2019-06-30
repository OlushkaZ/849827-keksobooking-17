
'use strict';

(function () {

  var filterForm = document.querySelector('.map').querySelector('.map__filters');
  var typeSelect = filterForm.querySelector('#housing-type');


  var setInactivFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  var setActivFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  var onHousingTypeChange = function () {};

  typeSelect.addEventListener('change', function (evt) {
    window.filterForm.onHousingTypeChange(evt.target.value);
  });

  window.filterForm = {
    setInactivFilterForm: setInactivFilterForm,
    setActivFilterForm: setActivFilterForm,
    onHousingTypeChange: onHousingTypeChange,
    typeSelect: typeSelect
  };

})();
