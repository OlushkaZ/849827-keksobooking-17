'use strict';

(function () {
  var ESCAPE_CODE = 27;
  var toggleActiveForm = function (formElements) {
    Array.from(formElements).forEach(function (it) {
      it.disabled = !it.disabled;
    });
  };

  var formatNumber = function (num, str, var1, var2, var3) {
    num = Math.floor(num);
    var numbers = num.toString().split('');
    var lastDig = parseInt(numbers.pop(), 10);
    var preLastDig = parseInt(numbers.pop(), 10);

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

  window.util = {
    toggleActiveForm: toggleActiveForm,
    formatNumber: formatNumber,
    escapeCode: ESCAPE_CODE
  };
})();
