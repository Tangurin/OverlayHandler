(function () {
    'use strict';
    /*===========================
    OverlayHandler
    ===========================*/
    var OverlayHandler = {
        element: null,
        keyEvent: null,
        callbacks: {
            onClose: []
        },
        initialize: function($element) {
            OverlayHandler.element = $element;
            OverlayHandler.element.on('click', OverlayHandler.hide);
        },
        show: function(showLoader) {
            var showLoader = showLoader || false;
            OverlayHandler.element.addClass('active');
            if (showLoader) {
                OverlayHandler.element.addClass('loading');
            }

            OverlayHandler.bindEscapeKey();
        },
        hide: function(noCallback) {
            if (OverlayHandler.element.hasClass('active') === false) {
                return false;
            }
            OverlayHandler.element.removeClass('active loading');
            var callbacks = OverlayHandler.callbacks;
            for (var i in callbacks.onClose) {
                var method = callbacks.onClose[i];
                callbacks.onClose.splice(i, 1);
                method(OverlayHandler.element);
            }

            OverlayHandler.unbindEscapeKey();
        },
        showLoader: function() {
            OverlayHandler.element.addClass('loading');
        },
        hideLoader: function() {
            OverlayHandler.element.removeClass('loading');
        },
        onClose: function(callback) {
            if (typeof callback == 'function') {
                OverlayHandler.callbacks.onClose.push(callback);
            }
        },
        onHide: function(callback) {
            OverlayHandler.onClose(callback);
        },
        bindEscapeKey: function() {
            $(document).on('keyup', function(e) {
                 if (e.keyCode == 27) {
                    OverlayHandler.hide();
                }
            });
        },
        unbindEscapeKey: function() {
            if (OverlayHandler.keyEvent != null) {
                OverlayHandler.keyEvent.unbind('keyup');
                OverlayHandler.keyEvent = null;
            }
        },
        setSelector: function($selector) {
            OverlayHandler.element = $selector;
        },
        getSelector: function() {
            return OverlayHandler.element;
        },
        /* Aliases */
        open: function(showLoader) { OverlayHandler.show(showLoader) },
        close: function() { OverlayHandler.hide() },
        showLoading: function() { OverlayHandler.showLoader() },
        hideLoading: function() { OverlayHandler.hideLoader() },
    };
    window.OverlayHandler = OverlayHandler;
})();

/*===========================
OverlayHandler AMD Export
===========================*/
if (typeof(module) !== 'undefined') {
    module.exports = window.OverlayHandler;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.OverlayHandler;
    });
}
