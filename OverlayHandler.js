(function () {
    'use strict';
    /*===========================
    OverlayHandler
    ===========================*/
    var OverlayHandler = {
        selector: null,
        keyEvent: null,
        callbacks: {
            onClose: {}
        },
        initialize: function($selector) {
            OverlayHandler.selector = $selector;
            OverlayHandler.selector.on('click', OverlayHandler.hide);
        },
        show: function(showLoader) {
            var showLoader = showLoader || false;
            OverlayHandler.selector.addClass('active');
            if (showLoader) {
                OverlayHandler.selector.addClass('loading');
            }

            OverlayHandler.bindEscapeKey();
        },
        hide: function() {
            OverlayHandler.selector.removeClass('active loading');
            var callbacks = OverlayHandler.callbacks;
            for (var i in callbacks.onClose) {
                callbacks.onClose[i](OverlayHandler.selector);
            }

            OverlayHandler.unbindEscapeKey();
        },
        showLoader: function() {
            OverlayHandler.selector.addClass('loading');
        },
        hideLoader: function() {
            OverlayHandler.selector.removeClass('loading');
        },
        showLoading: function() { OverlayHandler.showLoader() },
        hideLoading: function() { OverlayHandler.hideLoader() },
        onClose: function(callback) {
            if (typeof callback == 'function') {
                OverlayHandler.callbacks.onClose.push(callback);
            }
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
            OverlayHandler.selector = $selector;
        },
        getSelector: function() {
            return OverlayHandler.selector;
        }
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
