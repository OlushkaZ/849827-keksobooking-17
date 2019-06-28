'use strict';
(function () {
  var pinList = document.querySelector('.map').querySelector('.map__pins');
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  var pinOffset = {
    x: pinTemplate.querySelector('img').width / 2,
    y: pinTemplate.querySelector('img').height
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

  var successHandler = function (appartments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 5; i++) {
      fragment.appendChild(renderPin(appartments[i]));
    }
    pinList.appendChild(fragment);
  };

  var errorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', errorElement);
  };

  var createPinList = function () {
    window.load(successHandler, errorHandler);
  };


  window.pin = {
    createPinList: createPinList

  };
})();
