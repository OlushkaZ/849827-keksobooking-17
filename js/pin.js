'use strict';
(function () {
  var map = document.querySelector('.map');
  var pinList = map.querySelector('.map__pins');
  var START_POS_OFFERS = 2;
  var mapPinMain = map.querySelector('.map__pin--main');
  var pinMainStart = {
    top: mapPinMain.style.top,
    left: mapPinMain.style.left
  };

  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var pinOffset = {
    x: pinTemplate.querySelector('img').width / 2,
    y: pinTemplate.querySelector('img').height
  };

  var renderPinItem = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImg = pinElement.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.type;
    pinElement.style.left = pin.location.x - pinOffset.x + 'px';
    pinElement.style.top = pin.location.y - pinOffset.y + 'px';

    pinElement.addEventListener('click', function () {
      window.card.render(pin);
    });

    return pinElement;
  };

  var clearPins = function () {
    while (pinList.children.length > START_POS_OFFERS) {
      pinList.removeChild(pinList.lastChild);
    }
  };

  var renderPins = function (data) {
    clearPins();
    var fragment = document.createDocumentFragment();
    data.forEach(function (offer) {
      fragment.appendChild(renderPinItem(offer));
    });
    pinList.appendChild(fragment);
  };

  var refreshPinMain = function () {
    mapPinMain.style.left = pinMainStart.left;
    mapPinMain.style.top = pinMainStart.top;
  };

  window.pin = {
    clear: clearPins,
    render: renderPins,
    refreshPinMain: refreshPinMain
  };
})();
