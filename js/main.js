'use strict';

var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var APPARTMENT_PRICE = [10000, 1000, 5000, 0];
var Mock = {
  countElements: 8,
  minY: 130,
  maxY: 630
};
var appartments = [];
var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var filterForm = map.querySelector('.map__filters');
var mapPinMain = map.querySelector('.map__pin--main');
var typeSelect = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');
var timeSelect = adForm.querySelector('.ad-form__element--time');
var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var pinOffset = {
  x: pinTemplate.querySelector('img').width / 2,
  y: pinTemplate.querySelector('img').height
};

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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var addMockElement = function (arr, count, type, x, y) {
  arr.push(
      {
        'author': {
          'avatar': 'img/avatars/user0' + count + '.png'
        },
        'offer': {
          'type': type
        },
        'location': {
          'x': x,
          'y': y
        }
      });
};

var createMock = function () {
  for (var i = 1; i <= Mock.countElements; i++) {
    addMockElement(appartments, i, APPARTMENT_TYPES[getRandomInt(0, APPARTMENT_TYPES.length - 1)], getRandomInt(0, map.clientWidth), getRandomInt(Mock.minY, Mock.maxY));
  }
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.type;
  pinElement.style.left = pin.location.x - pinOffset.x + 'px';
  pinElement.style.top = pin.location.y - pinOffset.y + 'px';

  return pinElement;
};

var createFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < appartments.length; j++) {
    fragment.appendChild(renderPin(appartments[j]));
  }
  return fragment;
};

var toggleActiveForm = function (formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = !formElements[i].disabled;
  }
};

var setInactivAdForm = function () {
  adForm.classList.add('ad-form--disabled');
  toggleActiveForm(adForm.children);
};

var setActivAdForm = function () {
  adForm.classList.remove('ad-form--disabled');
  toggleActiveForm(adForm.children);
};

var setInactivFilterForm = function () {
  toggleActiveForm(filterForm.children);
};

var setActivFilterForm = function () {
  toggleActiveForm(filterForm.children);
};

var setInactivState = function () {
  map.classList.add('map--faded');
  setInactivAdForm();
  setInactivFilterForm();
  mapPinMain.addEventListener('mouseup', setActiveState);
};

var setActiveState = function () {
  map.classList.remove('map--faded');
  setActivAdForm();
  setActivFilterForm();
  createMock();
  pinList.appendChild(createFragment());
  mapPinMain.removeEventListener('mouseup', setActiveState);
};

var calcCenterCoordinates = function (element) {
  return {'x': parseInt(element.style.left, 10) + element.offsetWidth / 2,
    'y': parseInt(element.style.top, 10) + element.offsetHeight / 2};
};

var calcPointerCoordinates = function (element) {
  return {'x': parseInt(element.style.left, 10) + element.offsetWidth / 2,
    'y': parseInt(element.style.top, 10) + element.offsetHeight};
};

var setAddress = function (coordinates) {
  var adr = adForm.querySelector('#address');
  adr.value = coordinates.x + ', ' + coordinates.y;
};

setInactivState();
setAddress(calcCenterCoordinates(mapPinMain));

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    var coordinatesPinMain = calcPointerCoordinates(mapPinMain);
    var ev = new Event('mouseup');
    if (coordinatesPinMain.x <= 0) {
      coordinatesPinMain.x = 0;
      mapPinMain.style.left = -mapPinMain.offsetWidth / 2 + 'px';
      mapPinMain.dispatchEvent(ev);
    } else if (coordinatesPinMain.x >= map.clientWidth) {
      coordinatesPinMain.x = map.clientWidth;
      mapPinMain.style.left = map.clientWidth - mapPinMain.offsetWidth / 2 + 'px';
      mapPinMain.dispatchEvent(ev);
    }
    if (parseInt(mapPinMain.style.top, 10) <= 0) {
      coordinatesPinMain.y = 0 + mapPinMain.offsetHeight;
      mapPinMain.style.top = 0 + 'px';
      mapPinMain.dispatchEvent(ev);
    } else if (parseInt(mapPinMain.style.top, 10) >= Mock.maxY) {
      coordinatesPinMain.y = Mock.maxY;
      mapPinMain.style.top = Mock.maxY + 'px';
      mapPinMain.dispatchEvent(ev);
    }
    setAddress(coordinatesPinMain);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    mapPinMain.removeEventListener('mousemove', onMouseMove);
    mapPinMain.removeEventListener('mouseup', onMouseUp);

  };

  mapPinMain.addEventListener('mousemove', onMouseMove);
  mapPinMain.addEventListener('mouseup', onMouseUp);
});
