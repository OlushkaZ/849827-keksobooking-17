'use strict';
(function () {
  var pinCount = 5;
  var pinList = document.querySelector('.map').querySelector('.map__pins');


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

  window.render = function (data) {
    while (pinList.children.length > 2) {
      pinList.removeChild(pinList.lastChild);
    }
    var takeNumber = data.length > pinCount ? pinCount : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(data[i]));
    }
    pinList.appendChild(fragment);
  };
})();
