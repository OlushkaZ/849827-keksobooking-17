'use strict';
(function () {
  var map = document.querySelector('.map');
  var filter = map.querySelector('.map__filters-container');
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
        return false;
    }
  };

  var renderPhoto = function (parent, source) {
    var cardImg = parent.querySelector('.popup__photo');
    var newImg = cardImg.cloneNode(true);
    newImg.src = source;
    return newImg;
  };
  var startSymbol = '--';
  var hideFeature = function (item, features) {
    if (features.indexOf(item.classList[1].slice(item.classList[1].indexOf(startSymbol) + startSymbol.length)) === -1) {
      item.classList.add('visually-hidden');
    }
  };

  var renderCardSection = function (cardElement, sectionClassName, offerSection, expression) {
    var cardSection = cardElement.querySelector(sectionClassName);
    if (offerSection) {
      cardSection.textContent = expression;
    } else {
      cardSection.classList.add('visually-hidden');
    }
  };

  var renderCard = function (offer) {
    var cardElement = cardTemplate.cloneNode(true);

    renderCardSection(cardElement, '.popup__title', offer.offer.title, offer.offer.title);
    renderCardSection(cardElement, '.popup__text--address', offer.offer.address, offer.offer.address);
    renderCardSection(cardElement, '.popup__text--price', offer.offer.price, offer.offer.price + '\u20BD');
    renderCardSection(cardElement, '.popup__type', offer.offer.type, getTypeName(offer.offer.type));
    renderCardSection(cardElement, '.popup__text--capacity', offer.offer.rooms, window.util.formatNumber(offer.offer.rooms, 'комнат', '', 'ы', 'a') + ' для ' + window.util.formatNumber(offer.offer.guests, 'гост', 'ей', 'ей', 'я'));
    renderCardSection(cardElement, '.popup__text--time', offer.offer.checkin, 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout);
    renderCardSection(cardElement, '.popup__description', offer.offer.description, offer.offer.description);

    var cardAvatar = cardElement.querySelector('.popup__avatar');
    if (offer.author.avatar) {
      cardAvatar.src = offer.author.avatar;
    } else {
      cardAvatar.classList.add('visually-hidden');
    }

    var cardPhoto = cardElement.querySelector('.popup__photos');
    if (offer.offer.photos.length === 0) {
      cardPhoto.classList.add('visually-hidden');
    } else {
      var fragment = document.createDocumentFragment();
      offer.offer.photos.forEach(function (photo) {
        fragment.appendChild(renderPhoto(cardPhoto, photo));
      });
      cardPhoto.removeChild(cardPhoto.firstElementChild);
      cardPhoto.appendChild(fragment);
    }

    if (offer.offer.features.length === 0) {
      cardElement.querySelector('.popup__features').classList.add('visually-hidden');
    } else {
      var featureItems = cardElement.querySelectorAll('.popup__feature');
      featureItems.forEach(function (item) {
        hideFeature(item, offer.offer.features);
      });
    }
    return cardElement;
  };

  var escHandler = function (evt) {
    if (evt.keyCode === window.util.escapeCode) {
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
    render: renderOffer,
    remove: removeCard
  };

})();
