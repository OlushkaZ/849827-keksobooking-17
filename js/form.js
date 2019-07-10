'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var timeSelect = adForm.querySelector('.ad-form__element--time');
  var priceInput = adForm.querySelector('#price');
  var adr = adForm.querySelector('#address');
  var capacitySelect = adForm.querySelector('#capacity');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var APPARTMENT_PRICE = [10000, 1000, 5000, 0];
  var ValidText = {
    GUEST0: 'Количество мест \'не для гостей\' соответствует количеству комнат \'100\'',
    GUEST1: 'В одной комнате может разместиться только один гость',
    GUEST2: 'В двух комнатах может разместиться один или два гостя',
    GUEST_LIMIT: 'Количество гостей превышает количество комнат',
    GUEST_ERROR: 'Неизвестное колиество комнат: '
  };

  var CustomValidation = function () { };
  CustomValidation.prototype = {
    invalidities: [],
    checkValidityCapacity: function (capacity, roomNumber) {
      if ((roomNumber.value === '100' && capacity.value !== '0') || (roomNumber.value !== '100' && capacity.value === '0')) {
        this.addInvalidity(ValidText.GUEST0);
      } else if (capacity.value > roomNumber.value) {
        this.addInvalidity(ValidText.GUEST_LIMIT);

        switch (roomNumber.value) {
          case '1':
            this.addInvalidity(ValidText.GUEST1);
            return;
          case '2':
            this.addInvalidity(ValidText.GUEST2);
            return;
          default:
            throw new Error(ValidText.GUEST_ERROR + roomNumber);
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

  var capacityHandler = function () {
    var inputCustomValidation = new CustomValidation();
    inputCustomValidation.invalidities = [];
    capacitySelect.setCustomValidity('');
    inputCustomValidation.checkValidityCapacity(capacitySelect, roomNumberSelect); // Выявим ошибки
    var customValidityMessage = inputCustomValidation.getInvalidities(); // Получим все сообщения об ошибках
    if (customValidityMessage) {
      capacitySelect.setCustomValidity(customValidityMessage);
    }
  };

  capacitySelect.addEventListener('change', capacityHandler);
  roomNumberSelect.addEventListener('change', capacityHandler);

  typeSelect.addEventListener('change', function (evt) {
    var index = APPARTMENT_TYPES.indexOf(evt.target.value);
    priceInput.min = APPARTMENT_PRICE[index];
    priceInput.placeholder = APPARTMENT_PRICE[index];
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
