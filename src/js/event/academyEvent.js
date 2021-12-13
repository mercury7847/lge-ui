(function() {
        var emailCertified = {
            init: function() {
                var self = this;
                    self.$contents = $('#academyPopup02');
                    self.$submitForm = self.$contents.find('#emailCertifiedForm');

                    //self.url = self.$submitForm.data('ajax');
                    $('#btnCertified').on('click', function() {
                        alert(1);
                        vcui.require(['ui/validation'], function () {
                            self.validation = new vcui.ui.CsValidation('#emailCertifiedForm', { 
                                register: {
                                    email: {
                                        required: true,
                                        errorMsg: "이메일 주소를 다시 확인해주세요.",
                                        msgTarget: '.err-block',
                                        pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    }
                                }
                            });
                        });
                });
            },
            bindEvent: function() {
                $('#academyPopup01 .btn-list').on('click', function(e) {
                    e.preventDefault();
                    $('#academyPopup01').vcModal('hide'); 
                    location.href = "/benefits/exhibitions";
                });
                $('#academyPopup02 .btn-close').on('click', function(e) {
                    e.preventDefault();
                    $('#academyPopup02').vcModal('hide'); 
                    location.reload();
                });
            }
        };
})();


$(document).ready(function() {
  // emailCertified.init();
});