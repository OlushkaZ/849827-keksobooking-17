'use strict';
(function () {
  var pinCount = 5;
  var pinList = document.querySelector('.map').querySelector('.map__pins');
  var startPosOffers = 2;


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

    return pinElement;
  };

  window.renderPins = function (data) {
    while (pinList.children.length > startPosOffers) {
      pinList.removeChild(pinList.lastChild);
    }
    var takeNumber = data.length > pinCount ? pinCount : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPinItem(data[i]));
    }
    pinList.appendChild(fragment);
    Array.from(pinList.children).slice(startPosOffers).forEach(function (pinItem, num) {
      pinItem.addEventListener('click', window.renderOffer.bind({}, data[num]));
    });
  };
})();
