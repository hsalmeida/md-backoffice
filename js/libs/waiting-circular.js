var waitingCircular = waitingCircular || (function ($) {
        'use strict';

        // Creating modal dialog's DOM
        var $dialog = $('<div class="modal fade static" id="loadModal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog text-center" role="document">' +
            '<div class="progress-circular progress-circular-inline progress-circular-orange">' +
            '<div class="progress-circular-wrapper">' +
            '<div class="progress-circular-inner">' +
            '<div class="progress-circular-left">' +
            '<div class="progress-circular-spinner"></div>' +
            '</div>' +
            '<div class="progress-circular-gap"></div>' +
            '<div class="progress-circular-right">' +
            '<div class="progress-circular-spinner"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');

        return {
            /**
             * Opens our dialog
             * @param options Custom options:
             *   options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
             *   options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
             */
            show: function (options) {
                // Assigning defaults
                if (typeof options === 'undefined') {
                    options = {};
                }

                var settings = $.extend({
                    dialogSize: 'm',
                    progressType: '',
                    onHide: null // This callback runs after the dialog was hidden
                }, options);

                // Configuring dialog
                $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);

                // Adding callbacks
                if (typeof settings.onHide === 'function') {
                    $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                        settings.onHide.call($dialog);
                    });
                }
                // Opening dialog
                $dialog.modal();
            },
            /**
             * Closes dialog
             */
            hide: function () {
                $dialog.modal('hide');
            }
        };

    })(jQuery);