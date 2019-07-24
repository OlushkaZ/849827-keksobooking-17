'use strict';

(function () {
  var ESCAPE_CODE = 27;
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;
  var map = document.querySelector('.map');
  var flagInactivState;
  var mapPinMain = map.querySelector('.map__pin--main');
  var appartments = [];
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var errorMessage = errorTemplate.cloneNode(true);
  var resetButton = document.querySelector('.ad-form__reset');
  var taleSize = parseInt(window.getComputedStyle(
      document.querySelector('.map__pin--main'), ':after'
  ).getPropertyValue('border-top-width'), 10);
  var pinHeightWithTale = mapPinMain.offsetHeight + taleSize;
  var mapBounders = {
    left: map.offsetLeft,
    right: map.offsetLeft + map.offsetWidth,
    top: MIN_HEIGHT - pinHeightWithTale,
    bottom: MAX_HEIGHT
  };

  var setInactivState = function () {
    flagInactivState = true;
    map.classList.add('map--faded');
    window.form.setInactivAdForm();
    window.filterForm.toggleActiveFilterForm();
  };

  var setActiveState = function () {
    map.classList.remove('map--faded');
    window.form.setActivAdForm();
    window.filterForm.toggleActiveFilterForm();
    flagInactivState = false;
  };

  var correctCoordinates = function () {
    var halfPinWidth = mapPinMain.offsetWidth / 2;
    var x = parseInt(mapPinMain.style.left, 10) + halfPinWidth;
    var y = parseInt(mapPinMain.style.top, 10);
    if (x < 0) {
      mapPinMain.style.left = -halfPinWidth + 'px';
    } else if (x >= map.clientWidth) {
      mapPinMain.style.left = map.clientWidth - halfPinWidth + 'px';
    }
    if (y <= mapBounders.top) {
      mapPinMain.style.top = mapBounders.top + 'px';
    } else if (y >= mapBounders.bottom - pinHeightWithTale) {
      mapPinMain.style.top = mapBounders.bottom - pinHeightWithTale + 'px';
    }
  };

  var successHandler = function (data) {
    window.map.appartments = data;
    window.similar.updateAppartments(data);
  };

  var errorMessageHandler = function (evt) {
    if (evt.type === 'click' || evt.keyCode === ESCAPE_CODE) {
      main.removeChild(errorMessage);
      resetButton.dispatchEvent(new Event('click'));
      document.removeEventListener('keydown', errorMessageHandler);
      document.removeEventListener('click', errorMessageHandler);
    }
  };

  var errorHandler = function () {
    errorMessage.firstElementChild.textContent = 'Ошибка загрузки данных';
    errorMessage.lastElementChild.classList.add('visually-hidden');
    main.appendChild(errorMessage);
    document.addEventListener('click', errorMessageHandler);
    document.addEventListener('keydown', errorMessageHandler);
  };

  setInactivState();
  window.form.setStartAddress(mapPinMain);

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var setNewCoordinates = function (element) {
      var shift = {
        x: startCoords.x - element.clientX,
        y: startCoords.y - element.clientY
      };

      startCoords = {
        x: element.clientX,
        y: element.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      if ((moveEvt.pageX > mapBounders.left) && (moveEvt.pageX < mapBounders.right) && (moveEvt.pageY > mapBounders.top) && (moveEvt.pageY < mapBounders.bottom)) {
        setNewCoordinates(moveEvt);
        correctCoordinates();
        window.form.setAddress();
      }
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      if (flagInactivState) {
        setActiveState();
        window.backend.load(successHandler, errorHandler);
      }
      correctCoordinates();
      window.form.setAddress();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  mapPinMain.addEventListener('mousedown', onPinMouseDown);


  window.map = {
    map: map,
    mapBounders: mapBounders,
    mapPinMain: mapPinMain,
    appartments: appartments,
    pinHeightWithTale: pinHeightWithTale,
    setInactivState: setInactivState
  };

})();
