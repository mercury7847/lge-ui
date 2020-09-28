(function() {

    $(window).ready(function() {
        var reservation = {
            initialize: function() {
                var self = this;

                vcui.require(["helper/formValidator", "ui/formatter"], function (FormValidator) {
                    $('#input-phoneNumber').vcFormatter({"format":"num","maxlength":11});
                    
                    test = new FormValidator($('#submitForm')[0], {
                        showAlert: true,
                        autoCheck: false,
                    });
                    
                });

                self._setEventListener();
            },
            _reset: function() {

            },
            _setEventListener: function() {
                var self = this;

                $('#btn-confirm').on('click', function(){
                    test.run();
                });
            }
        }

        reservation.initialize();
    });
})();