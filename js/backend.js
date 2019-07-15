'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var Code = {
    SUCCESS: 200
  };

  var request = function (onSuccess, onError, data) {
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
    if (data) {
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    } else {
      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };

  window.backend = {
    load: request,
    save: request
  };
})();
