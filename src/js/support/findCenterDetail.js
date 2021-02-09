(function() {
    var map;


    //.link-btn-wrap

    var sms = {
        el : {
            layer : $('.sms-clause-layer'),
            toggleBtn : $('.link-btn-wrap .btn-toggle-sms'),
            close : $('.sms-clause-layer .btn-close')
        },
        validation : null,
        validateResult : "",
        show : function(){
            var self = this;
            self.el.layer.addClass('active').not(':animated').stop().slideDown();
        },
        hide : function(){
            var self = this;
            self.el.layer.filter('.active').removeClass('active').not(':animated').stop().slideUp();
            $('#smsAgreeCheck').prop('checked', false);
            if( self.el.layer.find('.agree-wrap').length ) {
                $('#smsPhoneNo').prop('disabled', true).val('');
            }
            self.el.layer.find('.error-block').hide();
        },
        toggle : function(){
            var self = this;
            if( self.el.layer.hasClass('active')) {
                self.hide();
            } else {
                self.show();
            }
        },
        validateInit : function(){
            var self = this;
           
            vcui.require(['ui/validation', 'ui/formatter'], function () {
                $('#smsPhoneNo').vcFormatter({'format':'num', "maxlength":11});

                var register = {
                    smsAgreeCheck : {
                        required : true,
                        msgTarget : ".err-block"
                    },
                    smsPhoneNo : {
                        required : true,
                        pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                        msgTarget : ".err-block",
                    }
                };
                self.validation = new vcui.ui.CsValidation('.sms-clause-layer', {register : register});
                //validateResult = validation.validate();
            });
            
        },
        init : function(){
            var self = this;

            self.validateInit();

            self.el.toggleBtn.on('click', function(e){
                e.preventDefault();
                self.toggle();
            });

            self.el.close.on('click', function(e){
                e.preventDefault();
                self.hide();
            });

            if( self.el.layer.find('.agree-wrap').length ) {
                $('#smsPhoneNo').prop('disabled', true);
                self.el.layer.find('#smsAgreeCheck').on('change', function(e){
                    var $chk = $(this);
                    var currentVal = $chk.prop('checked');
                    
                    if( currentVal ) {
                        $('#smsPhoneNo').prop('disabled', false);
                    } else {
                        $('#smsPhoneNo').prop('disabled', true);
                    }
                });
            } else {
                $('#smsPhoneNo').prop('disabled', false)
            };

            self.el.layer.find('.btn-apply').on('click', function(e){
                if( self.validation !== null) {
                    self.validation.validate();
                    self.validateResult = self.validation.validate().success;
                    
                    //유효성 검사 완료시
                    if( self.validateResult == true ) {

                        var data = $.extend(self.validation.getAllValues(),{
                            seq : $('#seq').val()
                        }) ;

                        var ajaxUrl = $('.store-info-wrap').data('smsUrl');

                        lgkorUI.requestAjaxDataPost(ajaxUrl, data, function(result) {
                            if (result.data.resultFlag == 'Y') {
                                self.hide();
                            } else {
                                if (result.data.resultMessage) {
                                    lgkorUI.alert("", {
                                        title: result.data.resultMessage
                                    });
                                }
                            }
                        })
                    }
                }
            })
        }
    }
    

    $(window).ready(function() {
        vcui.require(['ui/carousel', 'ui/storeMap'], function () {
            var latitude = $('.contents').data("latitude");
            var longitude = $('.contents').data("longitude");
            var shopname = $('.contents').data("shopName");

            var searchRoadUrl;
            if(vcui.detect.isMobile){
                searchRoadUrl = "https://m.map.naver.com/route.nhn?ex=" + longitude + "&ey=" + latitude + "&ename=" + shopname + "&menu=route&pathType=1";
            } else{
                searchRoadUrl = "https://map.naver.com/index.nhn?elng=" + longitude + "&elat=" + latitude + "&etext=" + shopname + "&menu=route&pathType=1";
            }
            $('.searchRoad-btn').attr("href", searchRoadUrl);

            $('.map').vcStoreMap({
                keyID: 'vsay0tnzme',
                latitude : latitude,
                longitude: longitude
            }).on('mapinit', function(e){
                map = $('.map').vcStoreMap('instance');
                var marker = new naver.maps.Marker({
                        position: new naver.maps.LatLng(latitude, longitude),
                        icon: {
                            url: '/lg5-common/images/icons/icon-point.svg',
                            // content: 
                            //     '<div>'+
                            //     '   <div class="point on">'+
                            //     '       <span class="num">-</span>'+
                            //     '   </div>'+
                            //     '</div>',
                            size: new naver.maps.Size(40, 40),
                            anchor: new naver.maps.Point(20, 40)
                        }
                    });

                marker.setMap(map.map);
            });
            
            $('.photo .ui_carousel_slider').vcCarousel({
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                variableWidth : true,
                responsive: [
                    {
                        breakpoint: 10000,
                        settings: {
                            infinite: false,
                            variableWidth : false,
                            dots: true,
                            slidesToShow: 2,
                            slidesToScroll: 2
                            
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            infinite: false,
                            variableWidth : true,
                            dots: true,
                            slidesToShow: 1, 
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            $('.cont-wrap > .btn-close').on('click', function(e){
                e.preventDefault();
    
                window.close();
            });
        });

        sms.init();

        $(document).on('click', '.info-list .btn-link', function(e){
            e.preventDefault();
            var _domain = location.origin;
            var _url = _domain + $(this).attr('href');

            window.open(_url, "width=1070, height=" + window.innerHeight + ", location=no, menubar=no, status=no, toolbar=no");
            window.close();
        });

        
    });
})();