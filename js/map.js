'use strict';

(function () {
  var map = document.querySelector('.map');
  var flagInactivState;
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapBounders = {
    left: map.offsetLeft,
    right: map.offsetLeft + map.offsetWidth,
    top: map.offsetTop,
    bottom: map.offsetTop + map.offsetHeight - map.querySelector('.map__filters-container').offsetHeight
  };
  var appartments = [];
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var errorMessage = errorTemplate.cloneNode(true);
  var ESCAPE_CODE = 27;
  var resetButton = document.querySelector('.ad-form__reset');
  var taleSize = parseInt(window.getComputedStyle(
      document.querySelector('.map__pin--main'), ':after'
  ).getPropertyValue('border-top-width'), 10);
  var pinHeightWithTale = mapPinMain.offsetHeight + taleSize;

  var setInactivState = function () {
    flagInactivState = true;
    map.classList.add('map--faded');
    window.form.setInactivAdForm();
    window.filterForm.toggleActiveFilterForm();
  };

  window.map = {
    map: map,
    mapBounders: mapBounders,
    mapPinMain: mapPinMain,
    appartments: appartments,
    pinHeightWithTale: pinHeightWithTale,
    setInactivState: setInactivState
  };

  var setActiveState = function () {
    map.classList.remove('map--faded');
    window.form.setActivAdForm();
    window.filterForm.toggleActiveFilterForm();
    flagInactivState = false;
  };

  var correctCoordinates = function () {
    var x = parseInt(mapPinMain.style.left, 10) + mapPinMain.offsetWidth / 2;
    var y = parseInt(mapPinMain.style.top, 10);
    if (x < 0) {
      mapPinMain.style.left = -mapPinMain.offsetWidth / 2 + 'px';
    } else if (x >= map.clientWidth) {
      mapPinMain.style.left = map.clientWidth - mapPinMain.offsetWidth / 2 + 'px';
    }
    if (y <= 0) {
      mapPinMain.style.top = 0 + 'px';
    } else if (y >= mapBounders.bottom - pinHeightWithTale) {
      mapPinMain.style.top = mapBounders.bottom - pinHeightWithTale + 'px';
    }
  };

  var successHandler = function (data) {
    window.map.appartments = data;
    window.similar.updateAppartments(data);
  };

  var removeErrorMessage = function (evt) {
    if (evt.type === 'click' || evt.keyCode === ESCAPE_CODE) {
      main.removeChild(errorMessage);
      resetButton.dispatchEvent(new Event('click'));
      document.removeEventListener('keydown', removeErrorMessage);
      // errorButton.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('click', removeErrorMessage);
    }
  };

  var errorHandler = function () {
    errorMessage.firstElementChild.textContent = 'Ошибка загрузки данных';
    errorMessage.lastElementChild.classList.add('visually-hidden');
    main.appendChild(errorMessage);
    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', removeErrorMessage);
    // main.insertAdjacentElement('afterbegin', errorMessage);
  };

  setInactivState();
  window.form.setStartAddress();

  var onPinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var setNewCoordinates = function (e) {
      var shift = {
        x: startCoords.x - e.clientX,
        y: startCoords.y - e.clientY
      };

      startCoords = {
        x: e.clientX,
        y: e.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if ((moveEvt.pageX > mapBounders.left) && (moveEvt.pageX < mapBounders.right) && (moveEvt.pageY > mapBounders.top) && (moveEvt.pageY < mapBounders.bottom)) {
        setNewCoordinates(moveEvt);
        correctCoordinates();
        window.form.setAddress();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (flagInactivState) {
        setActiveState();
        window.backend.load(successHandler, errorHandler);
      }
      correctCoordinates();
      window.form.setAddress();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onPinMouseDown);

})();
