'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var timeSelect = adForm.querySelector('.ad-form__element--time');
  var priceInput = adForm.querySelector('#price');
  var adr = adForm.querySelector('#address');

  typeSelect.addEventListener('change', function (evt) {
    var index = window.data.APPARTMENT_TYPES.indexOf(evt.target.value);
    priceInput.min = window.data.APPARTMENT_PRICE[index];
    priceInput.placeholder = window.data.APPARTMENT_PRICE[index];
  });

  timeSelect.addEventListener('change', function (evt) {
    if (evt.target === timeSelect.elements[0]) {
      timeSelect.elements[1].value = timeSelect.elements[0].value;
    } else {
      timeSelect.elements[0].value = timeSelect.elements[1].value;
    }
  });

  var setInactivAdForm = function () {
    adForm.classList.add('ad-form--disabled');
    window.util.toggleActiveForm(adForm.children);
  };

  var setActivAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.toggleActiveForm(adForm.children);
  };

  var setAddress = function () {
    adr.value = (parseInt(window.map.mapPinMain.style.left, 10) + Math.round(window.map.mapPinMain.offsetWidth / 2)) + ', ' + (parseInt(window.map.mapPinMain.style.top, 10) + window.map.pinHeightWithTale);
  };

  var setStartAddress = function () {
    adr.value = (parseInt(window.map.mapPinMain.style.left, 10) + Math.round(window.map.mapPinMain.offsetWidth / 2)) + ', ' + (parseInt(window.map.mapPinMain.style.top, 10));
  };

  window.form = {
    setInactivAdForm: setInactivAdForm,
    setActivAdForm: setActivAdForm,
    setAddress: setAddress,
    setStartAddress: setStartAddress
  };
})();
