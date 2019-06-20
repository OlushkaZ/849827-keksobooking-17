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
// var filterFormElements = filterForm.querySelectorAll('select, fieldset');

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

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

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
  pinElement.style.left = pin.location.x - pinImg.width / 2 + 'px';
  pinElement.style.top = pin.location.y - pinImg.height + 'px';

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
};

var setActiveState = function () {
  map.classList.remove('map--faded');
  setActivAdForm();
  setActivFilterForm();
  createMock();
  pinList.appendChild(createFragment());
  mapPinMain.removeEventListener('click', setActiveState);
};

var findChild = function (parent, childType) {
  var notes = null;
  for (var i = 0; i < parent.childNodes.length; i++) {
    if (parent.childNodes[i].nodeName === childType) {
      notes = parent.childNodes[i];
      break;
    }
  }
  return notes;
};

var calcCenterCoordinates = function (element) {
  var elImg = findChild(element, 'IMG');
  var xOffset = elImg ? elImg.width / 2 : 0;
  var yOffset = elImg ? elImg.height / 2 : 0;
  return {'x': parseInt(element.style.left, 10) + xOffset,
    'y': parseInt(element.style.top, 10) + yOffset};
};

var setAddress = function () {
  var adr = adForm.querySelector('#address');
  var coordinates = calcCenterCoordinates(mapPinMain);
  adr.value = coordinates.x + ', ' + coordinates.y;
};

setInactivState();
setAddress();
mapPinMain.addEventListener('click', setActiveState);
mapPinMain.addEventListener('mouseup', setAddress);
