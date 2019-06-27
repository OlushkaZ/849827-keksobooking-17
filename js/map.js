'use strict';

(function () {
  var map = document.querySelector('.map');
  var filterForm = map.querySelector('.map__filters');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapBounders = {
    left: map.offsetLeft,
    right: map.offsetLeft + map.offsetWidth,
    top: map.offsetTop,
    bottom: map.offsetTop + map.offsetHeight - map.querySelector('.map__filters-container').offsetHeight
  };
  var taleSize = parseInt(window.getComputedStyle(
      document.querySelector('.map__pin--main'), ':after'
  ).getPropertyValue('border-top-width'), 10);
  var pinHeightWithTale = mapPinMain.offsetHeight + taleSize;

  window.map = {
    map: map,
    mapBounders: mapBounders,
    mapPinMain: mapPinMain
  };

  var setAddress = function () {
    window.form.adr.value = (parseInt(mapPinMain.style.left, 10) + Math.round(mapPinMain.offsetWidth / 2)) + ', ' + (parseInt(mapPinMain.style.top, 10) + pinHeightWithTale);
  };

  var setStartAddress = function () {
    window.form.adr.value = (parseInt(mapPinMain.style.left, 10) + Math.round(mapPinMain.offsetWidth / 2)) + ', ' + (parseInt(mapPinMain.style.top, 10));
  };

  var setInactivFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  var setActivFilterForm = function () {
    window.util.toggleActiveForm(filterForm.children);
  };

  var setInactivState = function () {
    map.classList.add('map--faded');
    window.form.setInactivAdForm();
    setInactivFilterForm();
    mapPinMain.addEventListener('mouseup', setActiveState);
  };

  var setActiveState = function () {
    map.classList.remove('map--faded');
    window.form.setActivAdForm();
    setActivFilterForm();
    window.pin.createPinList();
    mapPinMain.removeEventListener('mouseup', setActiveState);
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

  setInactivState();
  setStartAddress();

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
        setAddress();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      correctCoordinates();
      setAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onPinMouseDown);

})();
