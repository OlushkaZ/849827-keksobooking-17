'use strict';

var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Mock = {
  countElements: 8,
  minY: 130,
  maxY: 630
};
var appartments = [];
var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var filterForm = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');

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

var toggleActivForm = function (form, state) {
  var formElements = form.querySelectorAll('select, fieldset');
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].disabled = state;
  }
};

var setInactivAdForm = function () {
  adForm.classList.add('ad-form--disabled');
  toggleActivForm(adForm, true);
};

var setActivAdForm = function () {
  adForm.classList.remove('ad-form--disabled');
  toggleActivForm(adForm, false);
};

var setInactivFilterForm = function () {
  toggleActivForm(filterForm, true);
};

var setActivFilterForm = function () {
  toggleActivForm(filterForm, false);
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
  var x = parseInt(element.style.left.match(/\d+/), 10) + xOffset;
  var y = parseInt(element.style.top.match(/\d+/), 10) + yOffset;
  return {'x': x, 'y': y};
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
// createMock();
// pinList.appendChild(createFragment());
