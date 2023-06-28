"use strict";
exports.__esModule = true;
exports.getMediaDuration = exports.appendFullStop = void 0;
exports.appendFullStop = function (inputString) {
    var words = inputString.split(',');
    var wordsWithDot = words.map(function (word) { return '.' + word.trim(); });
    var result = wordsWithDot.join(', ');
    return result;
};
exports.getMediaDuration = function (file) {
    return new Promise(function (resolve, reject) {
        var mediaElement = document.createElement(file.type === 'audio' ? 'audio' : 'video');
        mediaElement.src = URL.createObjectURL(file);
        mediaElement.onloadedmetadata = function () {
            resolve(mediaElement.duration);
        };
        mediaElement.onerror = reject;
    });
};
