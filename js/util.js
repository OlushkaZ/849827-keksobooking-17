'use strict';

(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var toggleActiveForm = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].disabled = !formElements[i].disabled;
    }
  };

  window.util = {
    getRandomInt: getRandomInt,
    toggleActiveForm: toggleActiveForm
  };
})();
