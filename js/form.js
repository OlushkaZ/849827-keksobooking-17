'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var timeSelect = adForm.querySelector('.ad-form__element--time');
  var priceInput = adForm.querySelector('#price');
  var adr = adForm.querySelector('#address');
  var capacitySelect = adForm.querySelector('#capacity');
  var roomNumberSelect = adForm.querySelector('#room_number');

  var CustomValidation = function () { };
  CustomValidation.prototype = {
    invalidities: [],
    checkValidityCapacity: function (capacity, roomNumber) {
      if ((roomNumber.value === '100' && capacity.value !== '0') || (roomNumber.value !== '100' && capacity.value === '0')) {
        this.addInvalidity('Количество мест \'не для гостей\' соответствует количеству комнат \'100\'');
      } else if (capacity.value > roomNumber.value) {
        this.addInvalidity('Количество гостей превышает количество комнат');

        switch (roomNumber.value) {
          case '1':
            this.addInvalidity('В одной комнате может разметиться только один гость');
            return;
          case '2':
            this.addInvalidity('В двух комнатах может разместить один или два гостя');
            return;
          default:
            throw new Error('Неизвестное колиество комнат: «' + roomNumber + '»');
        }
      }
    },
    addInvalidity: function (message) {
      this.invalidities.push(message);
    },
    getInvalidities: function () {
      return this.invalidities.join('. \n');
    }
  };

  var capacityHendler = function () {
    var inputCustomValidation = new CustomValidation();
    inputCustomValidation.invalidities = [];
    capacitySelect.setCustomValidity('');
    inputCustomValidation.checkValidityCapacity(capacitySelect, roomNumberSelect); // Выявим ошибки
    var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
    if (customValidityMessage) {
      capacitySelect.setCustomValidity(customValidityMessage);
    }
  };

  capacitySelect.addEventListener('change', capacityHendler);
  roomNumberSelect.addEventListener('change', capacityHendler);

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
