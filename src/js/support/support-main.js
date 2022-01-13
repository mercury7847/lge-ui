(function(){
    var detect = vcui.detect;
    var isMobileDevice = detect.isMobileDevice;    
    var $context = !!$('[data-hash="support"]').length ? $('[data-hash="support"]') : $(document);
    var contextLeft = !!$('[data-hash="support"]').length ? $context.width() * (Number($context.attr('aria-label').split('/')[0].trim()) - 1) : null;
    
    var supportHome = {
        loginTooltip : function(){
            var $tooltip = $context.find('.tooltip-login');
            var $btnClose = $tooltip.find('.btn-tooltip-close');

            $tooltip.on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainLoginClick.do', '/acecount/mainLoginClickm.do');
            });

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

                $context.on('click', self.el.btn, function(e){
                    var $this = $(this);
                    var $listWrap = $this.closest(self.el.wrap);
                    var $list = $listWrap.find(self.el.list);
                    e.preventDefault();
    
                    if( $listWrap.hasClass('active')) {
                        $this.find('.blind').text($this.find('.blind').text().replace('접기', '펼치기'));
                        $listWrap.removeClass('active').siblings().removeClass('siblings');
                        $list.stop().slideUp();
                    } else {
                        $this.find('.blind').text($this.find('.blind').text().replace('펼치기', '접기'));
                        $listWrap.removeClass('siblings').addClass('active').siblings().removeClass('active').addClass('siblings').find(self.el.list).stop().slideUp(function(){
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
            btnShow : function(){
                var self = this;

                $context.find(self.el.container).each(function(){
                    var $this = $(this);
                    var $item = $this.find(self.el.hidden);

                    if( $item.length ) {
                        $this.find(self.el.btn).css('display','block');
                    } else {
                        $this.find(self.el.btn).css('display','none');
                    }
                })
            },
            hiddenVisible : function(){
                var self = this;
                var $moreBtn = $context.find(self.el.btn);

                $context.find(self.el.container).each(function(){
                    var $this = $(this);
                    var $item = $this.find('.item');
                    var $itemList = $this.find('.item-list');

                    $item.each(function(i){
                        if( i >= 3) {
                            $(this).addClass('hidden').data('more', 'hidden').attr('data-more', 'hidden');
                        }
                    })

                    $itemList.each(function(i){
                        if( i >= 3) {
                            $(this).addClass('hidden').data('more', 'hidden').attr('data-more', 'hidden');
                        }
                    })
                })

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

                self.btnShow();
            },
            init : function(){
                this.hiddenVisible();
            }
        },
        slide : {
            activeClass : ".slick-initialized",
            controls : {
                play : $context.find('.btn-play')
            },
            heroPd : {
                el : {
                    slider : '.had-pd-slider',
                    front : '.card-front',
                    backContList : '.card-back-cont',
                    btnBackOpen : '.btn-goto-back',
                    btnBackClose : '.btn-goto-front'
                },
                config : {
                    infinite: false,
                    autoplay: false,
                    dots : true,
                    arrows : true,
                    slidesToScroll: 3,
                    slidesToShow: 3,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100,
                    responsive: [
                        {
                            breakpoint: 1920,
                            settings: {
                                slidesToScroll: 3,
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 1460,
                            settings: {
                                slidesToScroll: 2,
                                slidesToShow: 2,
                                variableWidth : true
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                arrows : false,
                                dots : true,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                                variableWidth : true
                            }
                        },
                        //BTOCSITE-9066 모바일 사이즈 수정 - S
                        {
                            breakpoint: 768,
                            settings: {
                                arrows : false,
                                dots : false,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                                variableWidth : true
                            }
                        }
                        //BTOCSITE-9066 모바일 사이즈 수정 - E
                    ]
                },
                init : function(){
                    var self = this;
                    var $container = $context.find(self.el.slider);
                    var $backContList = $container.find('.card-back-cont');
                    var $btnBackOpen = $container.find('.btn-goto-back');
                    var $btnBackClose = $container.find('.btn-goto-front');

                    $context.on('click', self.el.front, function(e){
                        var $this = $(this);
                        var $card = $this.closest('.item-card');
                        var $backCard = $card.find('.card-back');

                        if(!$backCard.hasClass('active')) {
                            $backCard.css('opacity', 0).show();
                            if( !vcui.detect.isMobileDevice ) {
                                $backCard.find('.card-back-cont').mCustomScrollbar()
                            }
                            $backCard.stop().animate({opacity:1}, function(){
                                $(this).addClass('active').removeAttr('style');
                            })
                        }
                        e.preventDefault();
                    })

                    $context.on('click', self.el.btnBackClose, function(e){
                        var $this = $(this);
                        var $backCard = $this.closest('.card-back');

                        if($backCard.hasClass('active')) {
                            $backCard.stop().fadeOut(function(){
                                $(this).removeClass('active').removeAttr('style');
                                $(this).find('.card-back-cont.mCustomScrollbar').mCustomScrollbar('destroy');
                            })
                        }
                        e.preventDefault();
                    })                
                }
            },
            supportList : {
                el : {
                    slider : $context.find('.support-toggle-list-wrap')
                },
                config : { 
                    infinite: false,
                    autoplay: false,
                    dots : true,
                    swipe : true,
                    arrows : false,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100,
                    slidesToScroll: 1,
                    slidesToShow: 1
                }
            },
            notice : {
                el : {
                    slider : $context.find('.notice-slider')
                },                
                config : {
                    infinite: true,
                    autoplay: true,
                    slidesToScroll: 1,
                    slidesToShow: 1,
                    vertical:true,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100
                },
            },
            // BTOCSITE-9066 신규 WSG 적용 - 고객지원_main_service 슬라이드 변경
            main_service : {
                el : {
                    slider : $context.find('.main-service-slider'),
                },
                // BTOCSITE-9066 slick 라이브러리 변경으로 해당 구조 변경
                // config : {
                //     arrows: false,
                //     slidesToShow: 4,
                //     slidesToScroll: 4,
                //     infinite:false,
                //     variableWidth:false,
                //     outerEdgeLimit: false,                    
                //     prevArrow : $context.find('.slick-prev'),
                //     nextArrow : $context.find('.slick-next'),
                //     responsive: [
                //         {
                //             breakpoint: 1460,
                //             settings: {
                //                 slidesToScroll: 3,
                //                 slidesToShow: 3
                //             }
                //         },
                //         {
                //             breakpoint: 1024,
                //             settings: {
                //                 slidesToScroll: 2,
                //                 slidesToShow: 2,
                //                 variableWidth : true
                //             }
                //         },
                //         {
                //           breakpoint: 768,
                //           settings: {
                //             arrows:false,
                //             slidesToShow: 1,
                //             slidesToScroll: 1,
                //             variableWidth:true
                //           }
                //         }
                //     ]
                // },
                // 추가 - 220113
                init : function(){
                    var self = this;

                    $context.find('.main-service-slider').slick({
                        arrows: true,
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        infinite:false,
                        variableWidth:false,
                        outerEdgeLimit: false,
                        prevArrow : $context.find('.slick-prev'),
                        nextArrow : $context.find('.slick-next'),
                        responsive: [
                            {
                            breakpoint: 1200,
                            settings: {
                                arrows:true,
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                variableWidth:false
                            }
                            },
                            {
                            breakpoint: 768,
                            settings: {
                                arrows:false,
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                variableWidth:true,
                                outerEdgeLimit: true,                            
                            }
                            }
                        ]
                    })
                }
            },
            inquiry : {
                el : {
                    slider : $context.find('.reserv-inquiry-slider')
                },
                config : {
                    infinite: false,
                    arrows : false,
                    dots : true,
                    autoplay: false,
                    slidesToScroll: 1,
                    slidesToShow: 2,
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100,
                    responsive: [
                        {
                            breakpoint: 1920,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 1280,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToScroll: 1,
                                slidesToShow: 1,
                            }
                        }
                    ]
                }
            },
            // BTOCSITE-9066 신규 WSG 적용 - 고객지원_award 슬라이드 변경
            award : {
                el : {
                    slider : $context.find('.award-slider .award-list')
                },                
                config : {
                    infinite: true,
                    autoplay: false,
                    dots : true,
                    autoplaySpeed : 5000,
                    slidesToScroll: 3,
                    slidesToShow: 3,
                    appendDots : '.awards .slick-dot-container',
                    cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                    speed: 150,
                    touchThreshold: 100,
                    responsive: [
                        {
                            breakpoint: 1460,
                            settings: {
                                slidesToScroll: 3,
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToScroll: 2,
                                slidesToShow: 2,
                                variableWidth : true
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                arrows: false,
                                dots : false,
                                slidesToScroll: 1,
                                slidesToShow: 1,
                                variableWidth : true
                            }
                        }
                    ],
                },
            },
            resize : function(){
                var self = this;
                if( window.innerWidth > 1024) {
                    $context.find('.support-toggle-list-wrap').not('.only-desktop').addClass('only-desktop');
                    self.supportList.el.slider.filter('.slick-initialized').slick('unslick');
                } else {
                    $context.find('.support-toggle-list-wrap').removeClass('only-desktop');
                    self.supportList.el.slider.not(self.activeClass).slick(self.supportList.config);
                }
                
            },
            firstInit : function(){
                if( window.innerWidth > 1024) {
                    $context.find('.support-toggle-list-wrap').addClass('only-desktop');
                } else {
                    $context.find('.support-toggle-list-wrap').removeClass('only-desktop');
                };
            },
            init : function(){
                var self = this;

                $context.find('[data-auto-type]').each(function(){
                    $(this).on('init', function(event, slick){
                        var $this = $(this);
                        var _type = $this.data('autoType');
                        var $container = $this.closest('[data-role="slide-container"]');
                        var _button = $('<button class="btn-play"><span class="blind">멈춤</span></button>');
    
                        if( _type == "button") {
                            _button.insertAfter($this)
                            //$this.insertAfter(_button);
                            //$this.append(_button);
                        }
                        if( _type == "dot") {
                            var $dotCont = $this.next('.slick-controls');
                            $dotCont.append(_button);
                        }
    
                        if(slick.$slides.length > slick.options.slidesToScroll) {
                            $container.find('.notice-inner > .btn-play').show(); // BTOCSITE-9066 award auto-play 제거 
                        } else {
                            $container.find('.btn-play').hide();
                        }
                    });

                });

                $context.find('[data-auto-type]').on('breakpoint', function(event, slick, breakpoint){
                    var $this = $(this);
                    var $container = $this.closest('[data-role="slide-container"]');

                    if(slick.$slides.length > slick.options.slidesToScroll) {
                        $container.find('.notice-inner > .btn-play').show(); // BTOCSITE-9066 award auto-play 제거 
                    } else {
                        $container.find('.btn-play').hide();
                    }
                });
                //재생/정지 버튼
                $context.find('[data-role="slide-container"]').on('click', '.btn-play', function(e){
                    var $this = $(this);
                    var $container = $this.closest('[data-role="slide-container"]');
                    var $slider = $container.find('.slick-initialized');
                    e.preventDefault();
                    
                    if( $this.hasClass('pause') ) {
                        $slider.slick('slickPlay');
                        $this.removeClass('pause');
                        $this.find('.blind').text('멈춤');
                    } else {
                        $slider.slick('slickPause');
                        $this.addClass('pause');
                        $this.find('.blind').text('재생');
                    }
                })

                //히어로 보유제품 슬라이드
                $(self.heroPd.el.slider).not(self.activeClass).slick(self.heroPd.config);
                
                //히어로 보유제품 슬라이드 관련 이벤트 초기 실행
                self.heroPd.init();

                //공지사항 슬라이드
                self.notice.el.slider.not(self.activeClass).slick(self.notice.config);
                
                //히어로 영역 제품 지원
                if( window.innerWidth < 1025) {
                    self.supportList.el.slider.not(self.activeClass).slick(self.supportList.config);
                    self.supportList.el.slider.not(self.activeClass).slick('reinit');
                }

                // 주요 서비스 
                //self.main_service.el.slider.slick(self.main_service.config); // 220113 제거 slick 구조 변경
                self.main_service.init(); // 220113 변경
                self.main_service.el.slider.off('DOMNodeInserted').on('DOMNodeInserted', function(e) {
                    var element = e.target;

                    if($(element).is('.slick-arrow')) {
                        var index = $(element).hasClass('slick-prev') ? 0 : 1;
                        // BTOCSITE-7261 뷰저블 쿼리셀렉터 이슈 해결 (CS)
                        $(element).attr("id","beu_cst_sc_main_service_20211126_"+vcui.number.zeroPad(index+1,2));
                    }
                });

                //수상목록
                self.award.el.slider.not(self.activeClass).slick(self.award.config);
                
                //로그인 후 화면 조회 슬라이드
                self.inquiry.el.slider.not(self.activeClass).slick(self.inquiry.config);
            },
            refresh : function(){
                $context.find('.slick-initialized').slick('refresh');
            }
        },
        reservation : {
            serviceReserv : {
                el : {
                    container : $context.find('.service-reserv'),
                    agreeChk : $context.find('#agreePrivacyCheck'),
                    popup : $context.find('#agreePrivacyPopup'),
                },
                validation : null,
                addressFinder : null,
                validateInit : function(){
                    var self = this;
                   
                    vcui.require(['ui/validation', 'ui/formatter'], function () {
                        self.addressFinder = new AddressFind();
                        //$('#servicePhoneNo').vcFormatter({'format':'num', "maxlength":11});
        
                        var register = {
                            agreePrivacyCheck : {
                                required : true,
                                msgTarget : ".err-block"
                            },

                            serviceUserName : {
                                required: true,
                                maxLength: 30,
                                pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                                msgTarget: '.err-block',
                                errorMsg: '이름을 입력해주세요.',
                                patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                            },
                            servicePhoneNo : {
                                required : true,
                                minLength : 10,
                                maxLength : 11,
                                pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                                msgTarget : ".err-block",
                                validate : function(value){
                                    return validatePhone(value);
                                } 
                            }
                        };
                        self.validation = new vcui.ui.CsValidation('.service-reserv', {register : register});
                    });
                    
                },
                inputVisible : function(){
                    var self = this;
                    self.el.container.find('#serviceUserName, #servicePhoneNo, .btn-reservation').prop('disabled', false).val('');
                    self.el.container.find('.btn-reservation').removeClass('disabled');
                },
                inputDisable : function(){
                    var self = this;
                    self.el.container.find('#serviceUserName, #servicePhoneNo, .btn-reservation').prop('disabled', true).val('');
                    self.el.container.find('.btn-reservation').addClass('disabled');
                },
                //BTOCSITE-9066 추가
                inputCssChk : function(){
                    //210113 추가 - 수정 필요
                    var self = this;
                    var formHead = self.el.container.find('.form-head');
                    var formHeadErrBlock = formHead.find('.err-block');

                    if(vcui.detect.isMobileDevice){
                        if(formHeadErrBlock.css('display') === 'none' && formHeadErrBlock.hasClass('active')){
                            formHead.css('margin-bottom','45px');
                        } else {
                            formHead.css('margin-bottom','24px');
                            formHeadErrBlock.addClass('active');
                        }
                    }
                },
                init : function(){
                    var self = this;

                    self.validateInit();

                    // self.el.agreeChk.on('change', function(e){
                    //     var $this = $(this);
                    //     var _checked = $this.prop('checked');

                    //     if( _checked ) {
                    //         self.inputVisible();
                    //     } else {
                    //         self.inputDisable();
                    //     }
                    // });
                    //BTOCSITE-9066 추가
                    self.el.agreeChk.on('change',function (e){
                        self.inputCssChk();
                    })

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
                            
                            $context.find('#userName').val($context.find('#serviceUserName').val());
                            $context.find('#userPhoneNo').val($context.find('#servicePhoneNo').val())
                            $context.find('#userZipCode').val($context.find('#serviceZipCode').val())
                            $context.find('#userAddress').val($context.find('#serviceUserAddress').val())
                            $context.find('#userDetailAddress').val($context.find('#serviceDetailAddress').val())
                            
                            lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainEngineerClick.do', '/acecount/mainEngineerClickm.do');
                            self.el.container.find('#serviceReservationForm').submit();
                        }
                    });

                    // 20210727 BTOCSITE-3577 고객지원 > Main 의 출장서비스 예약 영역에 제품 설치/철거 예약 탭 및 내용 추가
                    self.el.container.find('.btn-installDemolition').on('click', function(){
                        var _self = this;
                        var href = $(this).data("href");
                        var target = $(this).data("target");

                        lgkorUI.confirm( "제품 이전 설치/철거 서비스는 <b>전문업체인</b><br> <b>(주)엘엑스판토스 홈페이지를 통해 예약이<br> 가능합니다.</b><br><br><b>(주)엘엑스판토스로 이동 하시겠습니까?</b>",{
                            typeClass:'type2',
                            title:'',
                            okBtnName: '네',
                            cancelBtnName: '아니요',
                            ok: function() {
                                if(href)  {
                                    if(target) {
                                        window.open(href, '_blank');
                                    } else {
                                        location.href = href;
                                    }
                                } 
                            }
                        });
                    });

                    self.el.container.find('.btn-address').on('click', function() { 
                        self.addressFinder.open(function(data) { 
                            var address = data.userSelectedType == 'R' ? data.roadAddress : data.jibunAddress;
        
                            self.el.container.find('#serviceZipCode').val(data.zonecode);
                            self.el.container.find('#serviceUserAddress').val(address);
                            self.el.container.find('#serviceDetailAddress').val('').prop('disabled', false);
                        }); 
                    });
                }
            },
            reservInquiry : {
                el : {
                    container : $context.find('.reserv-inquiry'),
                    authChangeRdo : '[name="inquiryRdo"]',
                    changeCont : $context.find('.reserv-inquiry .toggle-forms')
                },
                validation : null,
                authManager : null,
                validateInit : function(){
                    var self = this;
                   
                    vcui.require(['ui/validation', 'ui/formatter'], function () {
                        $context.find('#inquiryAuthPhoneNo').vcFormatter({'format':'num', "maxlength":11});
        
                        var register = {
                            userName1 : {
                                required: true,
                                maxLength: 30,
                                pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                                msgTarget: '.err-block',
                                errorMsg: '이름을 입력해주세요.',
                                patternMsg: '이름은 한글 또는 영문으로만 입력해주세요.'
                            },
                            number : {
                                required: true,
                                msgTarget: '.err-block',
                                errorMsg: '접수번호를 입력해주세요.'
                            }
                        };

                        var authOptions = {
                            elem: {
                                form: '#authDataForm2',
                                name: '#userName2',
                                phone: '#phoneNo',
                                number: '#authNo'
                            },
                            register: {
                                userName2: {
                                    required: true,
                                    maxLength: 30,
                                    pattern: /^[가-힣\s]+$|^[a-zA-Z\s]+$/,
                                    msgTarget: '.err-block',                        
                                    errorMsg: '이름을 입력해주세요.',
                                    patternMsg: '이름은 한글 또는 영문만 입력 가능합니다.'
                                },
                                phoneNo: {
                                    required: true,
                                    minLength: 10,
                                    maxLength: 11,
                                    msgTarget: '.err-block',
                                    errorMsg: '정확한 휴대폰번호를 입력해주세요.',
                                    patternMsg: '정확한 휴대폰번호를 입력해주세요.',
                                    validate : function(value){
                                        return validatePhone(value);
                                    } 
                                },
                                authNo:{
                                    required: true,
                                    msgTarget: '.err-block',
                                    errorMsg: '인증번호를 입력해주세요.',
                                }
                            },
                            pass: false
                        };

                        if( self.el.container.find('.form-wrap').length) {
                            self.validation = new vcui.ui.CsValidation('.reserv-inquiry .auth-type-no', {register : register});
                            self.authManager = new AuthManager(authOptions);
    
                            self.el.container.find('.btn-auth-confirm').on('click', function() {
                                self.authManager.send(this);
                                //self.el.container.find('#authNo').attr('disabled', false);
                            });
    
                            self.el.container.find('.btn-inquiry').on('click', function(){
                                var _self = this;

                                if( self.el.container.find('.auth-type-no.active').length ) {

                                    self.validation.validate();
                                    var validationResult = self.validation.validate().success;
                                    var resultData = self.validation.getAllValues();

                                    if( validationResult ) {
                                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainStatusClick.do', '/acecount/mainStatusClickm.do');
                                        lgkorUI.showLoading();
                                        lgkorUI.requestAjaxDataPost($context.find('#authDataForm1').data('ajax'), resultData, function(result) {
                                            if (result.data.resultFlag == 'Y') {
                                                $context.find('#authDataForm1').attr('action', result.data.url).submit();
                                            } else if (result.data.resultFlag == 'N') {
                                                lgkorUI.alert("", {
                                                    title: result.data.resultMessage,
                                                    ok: function(el) {
                                                        if (result.data.url) {
                                                            location.href = result.data.url; 
                                                        } else {
                                                            $(el).vcModal('hide');
                                                        }
                                                    }
                                                }, _self);
                                            }
                    
                                            lgkorUI.hideLoading();
                                        });
                                    }
                                }
                                
                                if( self.el.container.find('.auth-type-phone.active').length ) {
                                    self.authManager.confirm('.btn-auth-confirm', function(success) {
                                        success && lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainStatusClick.do', '/acecount/mainStatusClickm.do');
                                    });
                                }
    
                            })
                        }
                    });
                    
                },
                toggle : function(){
                    var self = this;
                    var $rdo = self.el.container.find(self.el.authChangeRdo);
                    var $toggleCont = self.el.changeCont;

                    $rdo.eq(0).prop('checked', true);
                    $toggleCont.removeClass('active').eq(0).addClass('active');
    
                    $rdo.on('change', function(e){
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
                    
                    // 2021-07-27 BTOCSITE-3604 문의/예약 조회 GET 을 POST로 변경 : 추가
                    $(document).on('click', '.reserv-inquiry-slider .item-list a', function(e){
                        var $this = $(this);
                        var currentData = $this.data();
                        var $form = $this.closest('.rersv-wrap').find('#reservInquiryForm');

                        e.preventDefault();

                        if( currentData ) {
                            $.each(currentData, function(key, value){
                                if( value ) {
                                    if( key == 'username') {
                                        $form.find('#username1').val(value)
                                    } else {
                                        $form.find('#' + key).val(value)
                                    }
                                }
                            })
                        }
                        $form.submit();
                    })
                }
            },
            init : function(){
                this.serviceReserv.init();
                this.reservInquiry.init();
            }
        },
        // BTOCSITE-7261 뷰저블 쿼리셀렉터 이슈 해결 (CS)
        getRegisterdProduct : {
            el : {
                container :'.popular-find',
                toggleBtn : '.btn-filter-toggle',
                listWrap : '.popular-list-wrap',
                pdCont : '.solution-pd-content',
            },
            template : 
                '{{#each (item, index) in listData}}' + 
                '{{#if (index < 3)}}' + 
                '<div class="item-list">' +
                '{{#else}}' + 
                '<div class="item-list" data-more="hidden">' +
                '{{/if}}'+
                    '<a href="/support/solutions-{{item.item_id}}?category={{item.parent_category}}&subCategory={{item.category}}" id="beu_cst_sc_{{item.item_id}}">' + 
                        '<div class="item-category"><span class="category-thumb"><img src="{{item.icon_path}}" alt=""></span> {{item.cate_name}}</div>' + 
                        '<strong class="item-tit">{{item.item_title}}</strong>' + 
                        '<ul class="bullet-list">' + 
                            '<li class="b-txt">{{item.parent_cate_name}} > {{item.cate_name}}</li>' + 
                            '<li class="b-txt">{{item.symp_name}} > {{item.symp_sub_name}}</li>' + 
                        '</ul>' + 
                    '</a>' + 
                '</div>' + 
                '{{/each}}',
            getProduct : function(){
                var self = this;
                var $container = $(self.el.container);
                var $pdCont = $container.find(self.el.pdCont);
                var ajaxUrl = $container.data('ajax');
                var modelCnt = $context.find('[name="modelCnt"]').val();
                var memberContentsCnt = $context.find('[name="memberContentsCnt"]').val();
                var alertMsgArry = [
                    '등록된 제품이 없습니다. <br>보유제품을 등록하시겠습니까?',
                    '보유하신 제품으로 검색된 결과가 없습니다.'
                ];
                var alertMsg = alertMsgArry[0];
                if( modelCnt == 0) {
                    alertMsg = alertMsgArry[0];
                    lgkorUI.confirm(alertMsg,{
                        typeClass:'type2',
                        title:'',
                        okBtnName: '네',
                        cancelBtnName: '아니요',
                        ok: function() {
                            location.href = "/my-page/manage-products";
                        },
                        cancel: function() {
                            
                        }
                    });
                } else if ( modelCnt > 0 && memberContentsCnt == 0) {
                    alertMsg = alertMsgArry[1];
                    lgkorUI.alert(alertMsg,{
                        typeClass:'type2',
                        title:''
                    });
                } else { 
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxData(ajaxUrl, {}, function(result) {
                        var data = result.data,
                            listData = data.listData,
                            html;
                          
                            if( listData.length ) {
                                html = vcui.template(self.template, data); 
                                $pdCont.filter('.registerd-pd').find(self.el.listWrap).html(html);   
                                $pdCont.filter('.registerd-pd').addClass('active').siblings().removeClass('active').find('.btn-moreview').removeClass('close').text('더보기');;
                                $(self.el.toggleBtn).addClass('active');
                                $("#myPrdChkfilter").prop("checked", true); //BTOCSITE-9066 추가
                                supportHome.moreShow.btnShow();
                                lgkorUI.hideLoading();
                            } else {
                                lgkorUI.hideLoading();
                                lgkorUI.confirm(alertMsg,{
                                    typeClass:'type2',
                                    title:'',
                                    okBtnName: '네',
                                    cancelBtnName: '아니요',
                                    ok: function() {
                                        location.href = data.url;
                                    },
                                    cancel: function() {
                                        
                                    }
                                });
                            }
                    });
                }
                    

            },
            init : function(){
                var self = this;
                var $container = $context.find(self.el.container);
                var $listWrap = $container.find(self.el.listWrap);
                var $pdCont = $container.find(self.el.pdCont);
                var modelCnt = $context.find('[name="modelCnt"]').val();
                var memberContentsCnt = $context.find('[name="memberContentsCnt"]').val();

                if( memberContentsCnt > 0 && modelCnt > 0) {
                    self.getProduct();
                }

                $listWrap.on('click', 'a', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainKeywordResetClick.do', '/acecount/mainKeywordResetClickm.do');
                });
                
                $container.find(self.el.toggleBtn).on('click', function(e){
                    var $this = $(this);
                    // BTOCSITE-9066 신규 WSG 적용 - 고객지원_prop checkd 속성 추가 - s
                    if( lgkorUI.isLogin ) {
                        e.preventDefault();
                        if( $this.hasClass('active') ) {                            
                            $this.removeClass('active');
                            $pdCont.filter('.default-pd').addClass('active').siblings().removeClass('active').find('.btn-moreview').removeClass('close').text('더보기');
                            $("#myPrdChkfilter").prop("checked", false);
                        } else {
                            $("#myPrdChkfilter").prop("checked", true);
                            self.getProduct();
                        }
                    // BTOCSITE-9066 신규 WSG 적용 - 고객지원_prop checkd 속성 추가 - e
                    } else {
                        //비로그인

                        var _url = $this.data('href');

                        lgkorUI.confirm('로그인을 하셔야 이용하실 수 있습니다. <br>로그인 하시겠습니까?',{
                            typeClass:'type2',
                            title:'',
                            okBtnName: '네',
                            cancelBtnName: '아니요',
                            ok: function() {
                                location.href = _url;
                                
                            },
                            cancel: function() {
                                //BTOCSITE-9066 신규 WSG 적용 - prop checked false
                                $("#myPrdChkfilter").prop("checked", false);
                                
                            }
                        }, $this[0]);
                    }
                })
                
            }
        },
        modal : {
            el : {
                modal : '<div class="ui_modal_wrap init-type" style="position:fixed; z-index:9000; top:0; left:0; width:100%; height:100%;"/>',
                popup : '.popup-init',
                check : '[data-role="today-cookie-check"]',
                close : '.btn-close'
            },
            init : function(){

                if (contextLeft != null){
                    this.el.modal = '<div class="ui_modal_wrap init-type" style="position:fixed; z-index:9000; top:0; left:'+ contextLeft +'px; width:100%; height:100%;"/>'
                }
                

                var self = this;
                var $popup = $context.find(self.el.popup);
                


                
                if($popup.length ) {
                    $popup.each(function(v, i){
                        var $this = $(this);
                        var _id = $this.attr('id');

                        if( lgkorUI.cookie.getCookie(_id) == "done") {
                            $this.addClass('hidden');
                        }
                    })
                    $popup.not('.hidden').addClass('active').attr('tabindex', '0');

                    if( $popup.filter('.active').length ) {
                        //$('html').css('overflow', 'hidden');
                        $popup.filter('.active').wrapAll(self.el.modal);
                        if( $popup.filter('.active').length == 1) {
                            $context.find('.ui_modal_wrap.init-type').addClass('center-only');
                        }
                        $popup.filter('.active').stop().fadeIn();

                        $popup.filter('.active').first().focus();

                        if( !vcui.detect.isMobileDevice) {
                            $popup.filter('.active').not('.mCustomScrollbar').find('.pop-conts').mCustomScrollbar();
                            $popup.filter('.active').not('.mCustomScrollbar').find('.video-figure').mCustomScrollbar();
                        }
                    }
                }



                $popup.find(self.el.close).on('click', function(e){
                    var $this = $(this);
                    var $curModal = $this.closest('.popup-init');
                    var $modalWrap = $this.closest('.ui_modal_wrap');
                    var $dimm = $modalWrap.find('.ui_modal_dim');
                    var $check = $curModal.find(self.el.check).find('input:checkbox');
                    var _id = $curModal.attr('id');

                    if( $check.prop('checked')) {
                        lgkorUI.cookie.setCookie(_id, "done", 1);
                    }
                    
                    if( $modalWrap.find('.popup-init.active').length == 1) {
                        $modalWrap.stop().fadeOut(function(){
                            //$popup.unwrap();
                            $curModal.hide().removeClass('active');
                            $('html').css('overflow', 'visible');
                        });
                    } else {
                        $curModal.stop().fadeOut(function(){
                            $(this).removeClass('active');

                            if( $modalWrap.find('.popup-init.active').length == 1) {
                                $modalWrap.addClass('center-only');
                            }
                        })
                    }
                    e.preventDefault();
                });

                var $elFocus = $context.find('.ui_modal_wrap.init-type').find('a, button, input, textarea').filter(':visible');

                $context.find('.ui_modal_wrap.init-type .ui_modal_dim').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                })

                $elFocus.first().css('color', 'red');
                $elFocus.last().css('color', 'blue');

                $popup.filter('.active').first().on('keydown', function(e){
                    if( e.shiftKey && e.keyCode == 9) {
                        if( $(e.target).is('.popup-init') ) {
                            e.preventDefault();
                            $elFocus.last().focus();
                        }
                    }
                })

                $elFocus.last().on('keydown', function(e){

                    if( !e.shiftKey && e.keyCode == 9) {
                        e.preventDefault();
                        $elFocus.first().focus();
                    }
                })
            }
        },
        keyword: {
            el: {
                searchWrap: '.ui_search',
                searchInput: '#search',
                recentlyWrap: '.recently-keyword',
                popularWrap: '.popular-keyword',
                autocompleteWrap: '.autocomplete-box'
            },
            init: function() {
                if (!$context.find('.ui_search').length) return;

                var self = this;
                var $searchWrap = $context.find(self.el.searchWrap);
                var $searchInput = $context.find(self.el.searchInput);
                var $recentlyWrap = $context.find(self.el.recentlyWrap);
                var $popularWrap = $context.find(self.el.popularWrap);
                var $autocompleteWrap = $context.find(self.el.autocompleteWrap);
                var url = $searchWrap.data('searchUrl');

                $searchInput.on('keyup', function(e) {
                    if (e.keyCode == 13) {  
                        e.preventDefault();
                        var _value = $searchInput.val();
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainSearchClick.do', '/acecount/mainSearchClickm.do');
                        _value = _value.replace(/(<([^>]+)>)/ig,""); //BTOCSITE-5089
                        _value = _value.replace(/<\/([^>]+)/ig,""); //BTOCSITE-5089
                        location.href = url + encodeURI(_value)
                    }
                });

                $searchWrap.find('.btn-search').on('click', function() {
                    var _value = $searchInput.val();
                    _value = _value.replace(/(<([^>]+)>)/ig,""); //BTOCSITE-5089
                    _value = _value.replace(/<\/([^>]+)/ig,""); //BTOCSITE-5089
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainSearchClick.do', '/acecount/mainSearchClickm.do');
                    location.href = url + encodeURI(_value)
                });

                $searchWrap.on('keywordClick', function() {
                    var _value = $searchInput.val();
                    _value = _value.replace(/(<([^>]+)>)/ig,""); //BTOCSITE-5089
                    _value = _value.replace(/<\/([^>]+)/ig,""); //BTOCSITE-5089
                    
                    location.href = url + encodeURI(_value)
                });

                $autocompleteWrap.on('click', 'a', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainModelClick.do', '/acecount/mainModelClickm.do');
                });

                $recentlyWrap.on('click', 'a', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainRecentClick.do', '/acecount/mainRecentClickm.do');
                });

                $popularWrap.on('click', 'a', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainPopularClick.do', '/acecount/mainPopularClickm.do');
                });

                $searchWrap.search({
                    template: {
                        autocompleteList: '<ul>{{#each (item, index) in list}}<li><a href="{{item.url}}"><span class="model">{{item.factoryID}}</span><span class="category">{{item.category}}</span></a></li>{{/each}}</ul>',
                        recentlyList: '<li><a href="#">{{keyword}}</a><button type="button" class="btn-delete"><span class="blind">삭제</span></button></li>',
                        keywordList: '<li><a href="#">{{keyword}}</a></li>'
                    }
                });

                $searchWrap.on('autocomplete', function(e, param, url, callback) {
                    lgkorUI.requestAjaxData(url, param, function(result) {
                        callback(result.data);
                    });
                });
            }
        },
        initialize: function(){
            this.loginTooltip();
            this.moreShow.init();
            this.slide.init();
            this.toggleList.init();
            this.reservation.init();
            this.getRegisterdProduct.init();
            this.modal.init();
            this.keyword.init();

            if (lgkorUI.searchParamsToObject('smq') == 'Y') {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/mainThinqView.do', '/acecount/mainThinqViewm.do');
            }
        }
    }
    
    supportHome.slide.firstInit();

    $(window).ready(function(){
        supportHome.initialize();    

        var prevSize = window.innerWidth;
    
        $(window).on('resize', function(){
            var curSize = window.innerWidth;

            if( curSize <= 1024 &&  prevSize > 1024 ) {
                supportHome.slide.resize();
            }

            if( curSize > 1024 &&  prevSize <= 1024 ) {
                supportHome.slide.resize();
            }
            prevSize = window.innerWidth;
        })
        $(window).on('load', function(){
            supportHome.slide.refresh();
        });
    })
})();