'use strict';
(function () {
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

  var createFragment = function () {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < window.data.appartments.length; j++) {
      fragment.appendChild(renderPin(window.data.appartments[j]));
    }
    return fragment;
  };

  window.pin = {
    createFragment: createFragment
  };
})();
