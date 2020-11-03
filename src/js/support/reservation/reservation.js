(function() {

    $(window).ready(function() {
        var reservation = {
            initialize: function() {
                var self = this;

                vcui.require(["helper/formValidator", "ui/formatter", "ui/carousel"], function (FormValidator) {
                    $('#input-phoneNumber').vcFormatter({"format":"num","maxlength":11});
                    
                    self.validator = new FormValidator($('#submitForm')[0], {
                        showAlert: true,
                        autoCheck: false
                    });
                    
                    $('.engineer-carousel').length && $('.engineer-carousel').vcCarousel({
                        swipeToSlide: true,
                        slidesToShow: 4,
                        arrows:false,
                        customPaging: function(carousel, i) {
                            var $button = $('<button type="button" class="btn-indi"><span class="blind">'+(i+1)+'번 내용 보기'+'</span></button>');
                            return $button;
                        },
                        responsive: [{
                            breakpoint:767,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }]
                    });
                });

                self._setEventListener();
            },
            _reset: function() {

            },
            _setEventListener: function() {
                var self = this;

                $('#choiceEngineerPopup').on('modalshow', function() {
                    $('.engineer-carousel').vcCarousel('resize');
                });

                $('#solutionsPopup').on('modalshow', function() {
                    
                });

                $('#completeBtn').on('click', function(){
                    self.validator.run();
                });
            }
        }

        reservation.initialize();
    });
})();