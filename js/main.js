'use strict';

var APPARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var appartments = [];
var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandomInt = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var addMockElement = function(arr, count, type, x, y){
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
}

for(var i = 1; i <= 8; i++){
  addMockElement(appartments, i, APPARTMENT_TYPES[getRandomInt(0,3)], getRandomInt(0, map.clientWidth), getRandomInt(130, 630));
}

map.classList.remove('map--faded');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImg = pinElement.querySelector('img');

  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.type;
  pinElement.style.left = pin.location.x + pinImg.width / 2 + "px";
  pinElement.style.top = pin.location.y + pinImg.height + "px";

  return pinElement;
}

for (var i = 0; i < appartments.length; i++) {
  fragment.appendChild(renderPin(appartments[i]));
}
pinList.appendChild(fragment);
