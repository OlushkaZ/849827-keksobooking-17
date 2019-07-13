'use strict';
(function () {

  var map = document.querySelector('.map');
  var filter = map.querySelector('.map__filters-container');
  var ESCAPE_CODE = 27;
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var getTypeName = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        throw new Error('Неизвестный тип жилья: «' + type + '»');
    }
  };

  var formatNumber = function (num, str, var1, var2, var3) {
    num = Math.floor(num);
    var arr = num.toString().split('');
    var lastDig = parseInt(arr.pop(), 10);
    var preLastDig = parseInt(arr.pop(), 10);

    if ((preLastDig === 1) || ((lastDig === 0) || (lastDig >= 5 && lastDig <= 9))) {
      return num + ' ' + str + var1;
    }

    if (lastDig >= 2 && lastDig <= 4) {
      return num + ' ' + str + var2;
    }

    if (lastDig === 1) {
      return num + ' ' + str + var3;
    }
    return num + ' ' + str;
  };

  var renderPhoto = function (parent, source) {
    var cardImg = parent.querySelector('.popup__photo');
    var newImg = cardImg.cloneNode(true);
    newImg.src = source;
    return newImg;
  };
  var startSymbol = '--';
  var hideFeature = function (item, arr) {
    if (arr.indexOf(item.classList[1].slice(item.classList[1].indexOf(startSymbol) + startSymbol.length)) === -1) {
      item.classList.add('visually-hidden');
    }
  };

  var renderCard = function (offer) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '\u20BD';
    cardElement.querySelector('.popup__type').textContent = getTypeName(offer.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = formatNumber(offer.offer.rooms, 'комнат', '', 'ы', 'a') + ' для ' + formatNumber(offer.offer.guests, 'гост', 'ей', 'я', 'я');
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = offer.offer.description;
    cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

    var cardPhoto = cardElement.querySelector('.popup__photos');
    var fragment = document.createDocumentFragment();
    offer.offer.photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(cardPhoto, photo));
    });
    cardPhoto.removeChild(cardPhoto.firstElementChild);
    cardPhoto.appendChild(fragment);

    var cardFeatures = cardElement.querySelector('.popup__features');
    var featureItems = cardFeatures.querySelectorAll('.popup__feature');
    featureItems.forEach(function (item) {
      hideFeature(item, offer.offer.features);
    });

    return cardElement;
  };

  var escHandler = function (evt) {
    if (evt.keyCode === ESCAPE_CODE) {
      var card = map.querySelector('.map__card');
      if (card) {
        map.removeChild(card);
        document.removeEventListener('keydown', escHandler);
      }
    }
  };

  var removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      map.removeChild(card);
    }
  };

  var renderOffer = function (data) {
    removeCard();
    map.insertBefore(renderCard(data), filter);
    var card = map.querySelector('.map__card');
    var closeButton = map.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      map.removeChild(card);
      document.removeEventListener('keydown', escHandler);
    });
    document.addEventListener('keydown', escHandler);
  };

  window.card = {
    renderOffer: renderOffer,
    removeCard: removeCard
  };

})();
