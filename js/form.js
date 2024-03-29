'use strict';

(function () {
  var apartmentsConditions = {
    APARTMENT_TYPES: ['palace', 'flat', 'house', 'bungalo'],
    APARTMENT_PRICE: [10000, 1000, 5000, 0]
  };
  var ValidText = {
    GUEST0: 'Количество мест \'не для гостей\' соответствует количеству комнат \'' + exclusiveCondition + '\'',
    GUEST1: 'В одной комнате может разместиться только один гость',
    GUEST2: 'В двух комнатах может разместиться один или два гостя',
    GUEST_LIMIT: 'Количество гостей превышает количество комнат',
    GUEST_ERROR: 'Неизвестное колиество комнат: '
  };
  var adForm = document.querySelector('.ad-form');
  var typeSelect = adForm.querySelector('#type');
  var timeSelect = adForm.querySelector('.ad-form__element--time');
  var priceInput = adForm.querySelector('#price');
  var adrInput = adForm.querySelector('#address');
  var capacitySelect = adForm.querySelector('#capacity');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var avatarArea = adForm.querySelector('.ad-form-header__upload');
  var fileChooser = avatarArea.querySelector('input[type=file]');
  var preview = avatarArea.querySelector('img');
  var photoArea = adForm.querySelector('.ad-form__upload');
  var filePhotoChooser = photoArea.querySelector('input[type=file]');
  var filePhotoContainer = adForm.querySelector('.ad-form__photo');
  var defaultAvatar = preview.src;
  var photoWidth = '70';
  var exclusiveCondition = '100';

  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var successMessage = successTemplate.cloneNode(true);

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var errorMessage = errorTemplate.cloneNode(true);
  var errorButton = errorTemplate.querySelector('.error__button');
  var main = document.querySelector('main');

  var CustomValidation = function () { };
  CustomValidation.prototype = {
    invalidities: [],
    checkValidityCapacity: function (capacity, roomNumber) {
      if ((roomNumber.value === exclusiveCondition && capacity.value !== '0') || (roomNumber.value !== exclusiveCondition && capacity.value === '0')) {
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
            return;
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
    inputCustomValidation.checkValidityCapacity(capacitySelect, roomNumberSelect);
    var customValidityMessage = inputCustomValidation.getInvalidities();
    if (customValidityMessage) {
      capacitySelect.setCustomValidity(customValidityMessage);
    }
  };

  capacitySelect.addEventListener('change', capacityHandler);
  roomNumberSelect.addEventListener('change', capacityHandler);

  typeSelect.addEventListener('change', function (evt) {
    var index = apartmentsConditions.APARTMENT_TYPES.indexOf(evt.target.value);
    priceInput.min = apartmentsConditions.APARTMENT_PRICE[index];
    priceInput.placeholder = apartmentsConditions.APARTMENT_PRICE[index];
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
    adrInput.value = (parseInt(window.map.mapPinMain.style.left, 10) + Math.round(window.map.mapPinMain.offsetWidth / 2)) + ', ' + (parseInt(window.map.mapPinMain.style.top, 10) + window.map.pinHeightWithTale);
  };

  var setStartAddress = function (element) {
    adrInput.value = (parseInt(element.style.left, 10) + Math.round(element.offsetWidth / 2)) + ', ' + (parseInt(element.style.top, 10));
  };

  fileChooser.addEventListener('change', function (evt) {
    window.loadPhoto(evt.target, preview);
  });
  avatarArea.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });
  avatarArea.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });
  avatarArea.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    window.loadPhoto(evt.dataTransfer, preview);
  });

  filePhotoChooser.addEventListener('change', function (evt) {
    var img = document.createElement('img');
    img.width = photoWidth;
    filePhotoContainer.appendChild(img);
    window.loadPhoto(evt.target, img);
  });

  photoArea.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });
  photoArea.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });
  photoArea.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var img = document.createElement('img');
    img.width = photoWidth;
    filePhotoContainer.appendChild(img);
    window.loadPhoto(evt.dataTransfer, img);
  });

  var cleanFilePhotoContainer = function () {
    while (filePhotoContainer.firstElementChild) {
      filePhotoContainer.removeChild(filePhotoContainer.firstElementChild);
    }
  };

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    preview.src = defaultAvatar;
    cleanFilePhotoContainer();
    window.pin.refreshMain();
    window.pin.clear();
    window.map.setInactivState();
    window.card.remove();
    typeSelect.dispatchEvent(new Event('change'));
    window.filterForm.filterReset();
    setStartAddress(window.map.mapPinMain);
  });

  var successMessageHandler = function (evt) {
    if (evt.type === 'click' || evt.keyCode === window.util.escapeCode) {
      main.removeChild(successMessage);
      document.removeEventListener('keydown', successMessageHandler);
      document.removeEventListener('click', successMessageHandler);
    }
  };

  var successHandler = function () {
    resetButton.dispatchEvent(new Event('click'));

    main.appendChild(successMessage);
    document.addEventListener('click', successMessageHandler);
    document.addEventListener('keydown', successMessageHandler);
  };

  var errorMessageHandler = function (evt) {
    if (evt.type === 'click' || evt.keyCode === window.util.escapeCode) {
      main.removeChild(errorMessage);
      document.removeEventListener('keydown', errorMessageHandler);
      errorButton.removeEventListener('click', errorMessageHandler);
      document.removeEventListener('click', errorMessageHandler);
    }
  };

  var errorHandler = function () {
    main.appendChild(errorMessage);
    document.addEventListener('click', errorMessageHandler);
    errorButton.addEventListener('click', errorMessageHandler);
    document.addEventListener('keydown', errorMessageHandler);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(successHandler, errorHandler, new FormData(adForm));
    evt.preventDefault();
  });

  window.form = {
    setInactivAdForm: setInactivAdForm,
    setActivAdForm: setActivAdForm,
    setAddress: setAddress,
    setStartAddress: setStartAddress
  };
})();
