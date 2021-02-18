(function(){
    var supportHome = {
        loginTooltip : function(){
            var $tooltip = $('.tooltip-login');
            var $btnClose = $tooltip.find('.btn-tooltip-close');

            $btnClose.on('click', function(e){
                $tooltip.hide();
                e.preventDefault();
            });
        },
        toggleList : {
            el : {
                container : '[data-toggle-list="container"]',
                wrap : '[data-toggle-list="wrap"]',
                list : '[data-toggle-list="list"]',
                btn : '[data-toggle-list="btn"]'
            },
            toggle : function(){
                var self = this;
    
                $(document).on('click', self.el.btn, function(e){
                    var $this = $(this);
                    var $listWrap = $this.closest(self.el.wrap);
                    var $list = $listWrap.find(self.el.list);
                    console.log('toggle')
                    e.preventDefault();
    
                    if( $listWrap.hasClass('active')) {
                        $listWrap.removeClass('active');
                        $list.stop().slideUp();
                    } else {
                        $listWrap.addClass('active').siblings().removeClass('active').find(self.el.list).stop().slideUp(function(){
                            $(this).attr('style', '');
                        });
                        $list.stop().slideDown();
                    }
                    
                })
            },
            init : function(){
                this.toggle();
            }
        },
        moreShow : {
            el : {
                container : '[data-more="container"]',
                hidden : '[data-more="hidden"]',
                btn : '[data-more="btn"]'
            },
            hiddenVisible : function(){
                var self = this;
                var $moreBtn = $(self.el.btn);
            
                $moreBtn.on('click', function(e){
                    var $this = $(this);
                    var $wrap = $this.closest(self.el.container);
                    var $hiddenItem = $wrap.find(self.el.hidden);
                    
                    if( $hiddenItem.filter('.show').length ) {
                        $hiddenItem.removeClass('show');
                        $this.removeClass('close').text('더보기');
                    } else {
                        $hiddenItem.addClass('show');
                        $this.addClass('close').text('접기');
                    }
                    
                    e.preventDefault();
                })
            },
            init : function(){
                this.hiddenVisible();
            }
        },
        slide : {
            slideActiveClass : "is-active",
            controls : {
                play : $('.btn-play')
            },
            heroPd : {
                el : {
                    slider : '.had-pd-slider',
                    backContList : '.card-back-cont',
                    btnBackOpen : '.btn-goto-back',
                    btnBackClose : '.btn-goto-front'
                },
                config : {
                    infinite: false,
                    autoplay: false,
                    dots : true,
                    arrows : true,
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    responsive: [
                        {
                            breakpoint: 1920,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 1460,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 2,
                                variableWidth : true
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                arrows : false,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                                variableWidth : true
                            }
                        }
                    ]
                },
                init : function(){
                    var self = this;
                    var $container = $(self.el.slider);
                    var $backContList = $container.find('.card-back-cont');
                    var $btnBackOpen = $container.find('.btn-goto-back');
                    var $btnBackClose = $container.find('.btn-goto-front');


                    $(document).on('click', self.el.btnBackOpen, function(e){
                        var $this = $(this);
                        var $card = $this.closest('.item-card');
                        var $backCard = $card.find('.card-back');

                        if(!$backCard.hasClass('active')) {
                            $backCard.css('opacity', 0).show();
                            $backCard.find('.card-back-cont').mCustomScrollbar()
                            $backCard.stop().animate({opacity:1}, function(){
                                $(this).addClass('active').removeAttr('style');
                            })
                                                    }
                        
                        e.preventDefault();
                    })

                    $(document).on('click', self.el.btnBackClose, function(e){
                        var $this = $(this);
                        var $backCard = $this.closest('.card-back');

                        if($backCard.hasClass('active')) {
                            
                            $backCard.stop().fadeOut(function(){
                                $(this).removeClass('active').removeAttr('style');
                                $(this).find('.card-back-cont').mCustomScrollbar('destroy');
                            })
                        }
                        
                        e.preventDefault();
                    })

                    $(document).on('mouseenter', self.el.backContList, function(){
                        var $this = $(this);
                        var $container = $this.closest('.pd-info-list');


                    });
                }
            },
            supportList : {
                el : {
                    slider : $('.support-list-slider')
                },
                config : {
                    infinite: false,
                    autoplay: false,
                    dots : false,
                    arrows : false,
                    slidesToScroll: 1,
                    slidesToShow: 3,
                    variableWidth : true,
                    responsive: [
                        {
                            breakpoint: 1025,
                            settings: {
                                dots : true,
                                arrows : true,
                                swipe : true,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                                variableWidth : false
                            }
                        }
                    ]
                }
            },
            notice : {
                el : {
                    slider : $('.notice-slider')
                },
                
                config : {
                    infinite: true,
                    autoplay: true,
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    vertical:true
                },
            },
            main_service : {
                el : {
                    slider : $('.main-service-slider'),
                },
                config : {
                    infinite: false,
                    autoplay: false,
                    slidesToScroll: 1,
                    slidesToShow: 4,
                    dots : false,
                    arrows : false,
                    draggable : false, 
                    responsive: [
                        {
                            breakpoint: 1920,
                            settings: {
                                dots : false,
                                arrows : false,
                                draggable : false, 
                                slidesToScroll: 1,
                                arrowsUpdate: 'disabled',
                                slidesToShow: 4,
                            }
                        },
                        {
                            breakpoint: 1460,
                            settings: {
                                dots : true,
                                arrows : true,
                                draggable : true, 
                                slidesToScroll: 1,
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                dots : true,
                                arrows : true,
                                draggable : true, 
                                slidesToScroll: 1,
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                dots : true,
                                arrows : false,
                                draggable : true, 
                                slidesToScroll: 1,
                                slidesToShow: 1,
                                variableWidth : true
                            }
                        }
                    ]
                }
            },
            award : {
                el : {
                    slider : $('.award-slider'),
                },
                slideActiveClass : "is-active",
                config : {
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed : 2000,
                    slidesToScroll: 1,
                    slidesToShow: 4,
                    responsive: [
                        {
                            breakpoint: 1460,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 20000,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 4
                            }
                        }
                    ]
                },
            },
            resize : function(){
                var self = this;

                if( window.innerWidth > 1024) {
                    $('.support-toggle-list-wrap').not('.only-desktop').addClass('only-desktop');
                } else {
                    $('.support-toggle-list-wrap').removeClass('only-desktop');
                }
                
            },
            firstInit : function(){
                if( window.innerWidth > 1024) {
                    $('.support-toggle-list-wrap').addClass('only-desktop');
                } else {
                    $('.support-toggle-list-wrap').removeClass('only-desktop');
                };
            },
            init : function(){
                var self = this;
                
                vcui.require(['ui/carousel'], function () {    
                    //히어로 보유제품 슬라이드
                    $(self.heroPd.el.slider).not('.' + self.slideActiveClass).vcCarousel(self.heroPd.config);
                    $(self.heroPd.el.slider).addClass(self.slideActiveClass);
                    
                    //히어로 보유제품 슬라이드 관련 이벤트 초기 실행
                    self.heroPd.init();

                    //공지사항 슬라이드
                    self.notice.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.notice.config);
                    self.notice.el.slider.addClass(self.slideActiveClass);
                    
                    //히어로 영역 제품 지원
                    self.supportList.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.supportList.config);
                    self.supportList.el.slider.addClass(self.slideActiveClass);
                    // if( window.innerWidth <= 768) {
                    // } else {
                    //     //self.supportList.el.slider.filter('.' + self.slideActiveClass).vcCarousel('destroy').removeClass(self.slideActiveClass);
                    // }

                    // 주요 서비스 
                    self.main_service.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.main_service.config);
                    self.main_service.el.slider.addClass(self.slideActiveClass);

                    //수상목록
                    self.award.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.award.config);
                    self.award.el.slider.addClass(self.slideActiveClass);


                    //재생/정지 버튼
                    self.controls.play.on('click', function(e){
                        var $this = $(this);
                        var $slider = $this.closest('.slide-wrap.is-active');
                        e.preventDefault();
                        
                        if( $this.hasClass('pause') ) {
                            $slider.vcCarousel('play');
                            $this.removeClass('pause');
                        } else {
                            $slider.vcCarousel('pause');
                            $this.addClass('pause');
                        }
                    })
                });
            }
        },
        reservation : {
            engineerReserv : {
                el : {
                    container : $('.engineer-reserv'),
                    agreeChk : $('#agreePrivacyCheck'),
                    popup : $('#agreePrivacyPopup'),
                },
                validation : null,
                addressFinder : null,
                validateInit : function(){
                    var self = this;
                   
                    vcui.require(['ui/validation', 'ui/formatter'], function () {
                        self.addressFinder = new AddressFind();
                        $('#engineerPhoneNo').vcFormatter({'format':'num', "maxlength":11});
        
                        var register = {
                            agreePrivacyCheck : {
                                required : true,
                                msgTarget : ".err-block"
                            },
                            engineerUserName : {
                                required : true,
                                msgTarget : ".err-block"
                            },
                            engineerPhoneNo : {
                                required : true,
                                maxLength : 11,
                                pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                                msgTarget : ".err-block",
                            }
                        };
                        self.validation = new vcui.ui.CsValidation('.engineer-reserv', {register : register});
                    });
                    
                },
                inputVisible : function(){
                    var self = this;
                    self.el.container.find('#engineerUserName, #engineerPhoneNo, .btn-reservation').attr('disabled', false).val('');
                    self.el.container.find('.btn-reservation').removeClass('disabled');
                },
                inputDisable : function(){
                    var self = this;
                    self.el.container.find('#engineerUserName, #engineerPhoneNo, .btn-reservation').attr('disabled', true).val('');
                    self.el.container.find('.btn-reservation').addClass('disabled');
                },
                init : function(){
                    var self = this;

                    self.validateInit();

                    self.el.agreeChk.on('input', function(e){
                        var $this = $(this);
                        var _checked = $this.prop('checked');

                        if( _checked ) {
                            self.inputVisible();
                        } else {
                            self.inputDisable();
                        }
                    });

                    self.el.popup.find('.btn-agree').on('click', function(e){
                        e.preventDefault();

                        if( self.el.agreeChk.prop('checked') == false) {
                            self.el.agreeChk.trigger('click');
                        }
                    });
                    

                    self.el.container.find('.btn-reservation').on('click', function(){
                        self.validation.validate();
                        var validationResult = self.validation.validate().success;
                        if( validationResult ) {
                            //각 인풋의 value를 히든 인풋에 담은 뒤에 서브밋
                            
                            console.log(11)

                            self.el.container.find('#engineerReservationForm').submit();
                        }
                    })


                    self.el.container.find('.btn-address').on('click', function() { 
                        self.addressFinder.open(function(data) { 
                            var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;
        
                            self.el.container.find('#engineerZipCode').val(data.zonecode);
                            self.el.container.find('#engineerUserAddress').val(address);
                            self.el.container.find('#engineerDetailAddress').val('').prop('disabled', false);
                        }); 
                    });
                }
            },
            reservInquiry : {
                el : {
                    container : $('.reserv-inquiry'),
                    authChangeRdo : '[name="inquiryRdo"]',
                    changeCont : $('.reserv-inquiry .toggle-forms')
                },
                validation : null,
                authManager : null,
                validateInit : function(){
                    var self = this;
                   
                    vcui.require(['ui/validation', 'ui/formatter'], function () {
                        $('#inquiryAuthPhoneNo').vcFormatter({'format':'num', "maxlength":11});
        
                        var register = {
                            inquiryAuthName : {
                                required : true,
                                msgTarget : ".err-block"
                            },
                            inquiryAuthNo : {
                                required: true,
                                msgTarget: '.err-block',
                                errorMsg: '접수번호를 입력해주세요.'
                            },
                            // inquiryAuthPhoneNo : {
                            //     required : true,
                            //     maxLength : 11,
                            //     pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                            //     msgTarget : ".err-block",
                            // },
                            // inquiryAuthReceiveNo : {
                            //     required: true,
                            //     msgTarget: '.err-block',
                            //     errorMsg: '인증번호를 입력해주세요.'
                            // }
                        };

                        var authOptions = {
                            elem: {
                                form: '#authDataForm2',
                                name: '#inquiryAuthName2',
                                phone: '#inquiryAuthPhoneNo',
                                number: '#inquiryAuthReceiveNo'
                            },
                            register: {
                                inquiryAuthName2: {
                                    required: true,
                                    maxLength: 30,
                                    pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                                    msgTarget: '.err-block',                        
                                    errorMsg: '이름을 입력해주세요.',
                                    patternMsg: '이름은 한글 또는 영문만 입력 가능합니다.'
                                },
                                inquiryAuthPhoneNo: {
                                    required: true,
                                    minLength: 10,
                                    maxLength: 11,
                                    pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                                    msgTarget: '.err-block',
                                    errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                                    patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
                                },
                                inquiryAuthReceiveNo:{
                                    required: true,
                                    msgTarget: '.err-block',
                                    errorMsg: '인증번호를 입력해주세요.',
                                }
                            }
                        };

                        self.validation = new vcui.ui.CsValidation('.reserv-inquiry .auth-type-no', {register : register});
                        self.authManager = new AuthManager(authOptions);

                        self.el.container.find('.btn-auth-confirm').on('click', function() {
                            self.authManager.send(this);
                        });

                        self.el.container.find('.btn-inquiry').on('click', function(){

                            if( self.el.container.find('.auth-type-no.active').length ) {
                                self.validation.validate();
                                var validationResult = self.validation.validate().success;
                                if( validationResult ) {
                                    //각 인풋의 value를 히든 인풋에 담은 뒤에 서브밋
        
                                    $('#authDataForm1').submit();
                                }
                            }
                            
                            if( self.el.container.find('.auth-type-phone.active').length ) {
                                self.authManager.confirm('.btn-auth-confirm', function(success, result) {
                                    if (success) {
                                        $('#authDataForm2').submit();
                                    }
                                })
                            }

                        })
                    });
                    
                },
                toggle : function(){
                    var self = this;
                    var $rdo = self.el.container.find(self.el.authChangeRdo);
                    var $toggleCont = self.el.changeCont;
    
                    $rdo.on('input', function(e){
                        var curValue = parseInt(this.value);

                        $toggleCont.removeClass('active').eq(curValue).addClass('active');
                        switch(curValue) {
                            case 0 : 
                            
                            case 1 : 
                        }
                        $toggleCont.eq(this.value)
                    })
                },
                init :function(){
                    var self = this;
                    self.toggle();

                    self.validateInit();
                    
                }
            },
            init : function(){
                this.engineerReserv.init();
                this.reservInquiry.init();
            }
        },
        initialize: function(){
            this.loginTooltip();
            this.moreShow.init();
            this.slide.init();
            this.toggleList.init();
            this.reservation.init();
        }
    }

    supportHome.slide.firstInit();

    
    $(window).ready(function(){
        supportHome.initialize();
    })

    $(window).on('resize', function(){
        supportHome.slide.resize();
    })
})();