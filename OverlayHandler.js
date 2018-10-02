(function () {
    'use strict';
    /*===========================
    OverlayHandler
    ===========================*/
    var OverlayHandler = {
        element: null,
        keyEvent: null,
        initialized: false,
        active: false,
        callbacks: {
            onClose: []
        },
        initialize: function($element) {
            if (OverlayHandler.initialized === false) {
                var $existingOverlayHandlers = $('#overlayHandler');
                if ($existingOverlayHandlers.length > 0) {
                    return false;
                }

                var $overlayElement = $('<div id="overlayHandler"><i class="fa fa-cog fa-spin loaderIcon" aria-hidden="true"></i></div>');
                $('body').append($overlayElement);
                OverlayHandler.element = $overlayElement;
                OverlayHandler.element.on('click', OverlayHandler.hide);
                OverlayHandler.initialized = true;
            }
        },
        show: function(showLoader) {
            OverlayHandler.initialize();
            if (OverlayHandler.isActive()) {
                return false;
            }
            var showLoader = showLoader || false;
            OverlayHandler.active = true;
            OverlayHandler.element.addClass('active');
            if (showLoader) {
                OverlayHandler.element.addClass('loading');
            }

            OverlayHandler.bindEscapeKey();
        },
        hide: function(noCallback) {
            OverlayHandler.initialize();
            if (OverlayHandler.isActive() === false) {
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
            OverlayHandler.active = false;
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
        isActive: function() {
            return OverlayHandler.active;
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
