(function() {

    $(window).ready(function() {
        var reservation = {
            initialize: function() {
                var self = this;

                vcui.require(["ui/formatter", "ui/validation"], function () {
                    $('#input-phoneNumber').vcFormatter({"format":"num","maxlength":11});
                    $('.contents-inner').vcValidation();
                });

                self._setEventListener();
            },
            
            _reset: function() {

            },
            _setEventListener: function() {
                var self = this;

            }
        }

        reservation.initialize();
    });
})();