'use strict';

(function () {
  var toggleActiveForm = function (formElements) {
    Array.from(formElements).forEach(function (it) {
      it.disabled = !it.disabled;
    });
  };

  window.util = {
    toggleActiveForm: toggleActiveForm
  };
})();
