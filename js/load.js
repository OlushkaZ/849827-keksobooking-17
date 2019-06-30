'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var Code = {
    SUCCESS: 200
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
