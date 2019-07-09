'use strict';
(function () {
  var PIN_COUNT = 5;
  var pinList = document.querySelector('.map').querySelector('.map__pins');
  var START_POS_OFFERS = 2;


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
    while (pinList.children.length > START_POS_OFFERS) {
      pinList.removeChild(pinList.lastChild);
    }
    var takeNumber = data.length > PIN_COUNT ? PIN_COUNT : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      var pinItem = renderPinItem(data[i]);
      pinItem.addEventListener('click', window.renderOffer.bind({}, data[i]));
      fragment.appendChild(pinItem);
    }
    pinList.appendChild(fragment);
  };
})();
