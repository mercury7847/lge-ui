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
                    e.preventDefault();
    
                    if( $listWrap.hasClass('active')) {
                        $listWrap.removeClass('active').siblings().removeClass('siblings');
                        $list.stop().slideUp();
                    } else {
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
                        }
                    ]
                },
                init : function(){
                    var self = this;
                    var $container = $(self.el.slider);
                    var $backContList = $container.find('.card-back-cont');
                    var $btnBackOpen = $container.find('.btn-goto-back');
                    var $btnBackClose = $container.find('.btn-goto-front');


                    $(document).on('click', self.el.front, function(e){
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

                    $(document).on('click', self.el.btnBackClose, function(e){
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
            inquiry : {
                el : {
                    slider : $('.reserv-inquiry-slider')
                },
                config : {
                    infinite: false,
                    autoplay: false,
                    slidesToScroll: 1,
                    slidesToShow: 2,
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
            award : {
                el : {
                    slider : $('.award-slider'),
                },
                slideActiveClass : "is-active",
                config : {
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed : 5000,
                    slidesToScroll: 4,
                    slidesToShow: 4,
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
                                slidesToScroll: 4,
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
                    if( $(self.heroPd.el.slider).find('.item-list').length >= 2) {
                        $(self.heroPd.el.slider).not('.' + self.slideActiveClass).vcCarousel(self.heroPd.config);
                        $(self.heroPd.el.slider).addClass(self.slideActiveClass);
                    }
                    
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
                    
                    //로그인 후 화면 조회 슬라이드
                    self.inquiry.el.slider.not('.' + self.slideActiveClass).vcCarousel(self.inquiry.config);
                    self.inquiry.el.slider.addClass(self.slideActiveClass);
                    self.inquiry.el.slider.vcCarousel('resize');


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
            serviceReserv : {
                el : {
                    container : $('.service-reserv'),
                    agreeChk : $('#agreePrivacyCheck'),
                    popup : $('#agreePrivacyPopup'),
                },
                validation : null,
                addressFinder : null,
                validateInit : function(){
                    var self = this;
                   
                    vcui.require(['ui/validation', 'ui/formatter'], function () {
                        self.addressFinder = new AddressFind();
                        $('#servicePhoneNo').vcFormatter({'format':'num', "maxlength":11});
        
                        var register = {
                            agreePrivacyCheck : {
                                required : true,
                                msgTarget : ".err-block"
                            },
                            serviceUserName : {
                                required : true,
                                msgTarget : ".err-block"
                            },
                            servicePhoneNo : {
                                required : true,
                                maxLength : 11,
                                pattern: /^(010|011|17|018|019)\d{3,4}\d{4}$/,
                                msgTarget : ".err-block",
                            }
                        };
                        self.validation = new vcui.ui.CsValidation('.service-reserv', {register : register});
                    });
                    
                },
                inputVisible : function(){
                    var self = this;
                    self.el.container.find('#serviceUserName, #servicePhoneNo, .btn-reservation').attr('disabled', false).val('');
                    self.el.container.find('.btn-reservation').removeClass('disabled');
                },
                inputDisable : function(){
                    var self = this;
                    self.el.container.find('#serviceUserName, #servicePhoneNo, .btn-reservation').attr('disabled', true).val('');
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
                            
                            $('#userName').val($('#serviceUserName').val());
                            $('#userPhoneNo').val($('#servicePhoneNo').val())
                            $('#userZipCode').val($('#serviceZipCode').val())
                            $('#userAddress').val($('#serviceUserAddress').val())
                            $('#userDetailAddress').val($('#serviceDetailAddress').val())

                            self.el.container.find('#serviceReservationForm').submit();
                        }
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
                            userName1 : {
                                required : true,
                                msgTarget : ".err-block"
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
                                    pattern: /^[가-힣\s]|[a-zA-Z\s]+$/,
                                    msgTarget: '.err-block',                        
                                    errorMsg: '이름을 입력해주세요.',
                                    patternMsg: '이름은 한글 또는 영문만 입력 가능합니다.'
                                },
                                phoneNo: {
                                    required: true,
                                    minLength: 10,
                                    maxLength: 11,
                                    pattern: /^(010|011|017|018|019)\d{3,4}\d{4}$/,
                                    msgTarget: '.err-block',
                                    errorMsg: '정확한 휴대전화 번호를 입력해주세요.',
                                    patternMsg: '정확한 휴대전화 번호를 입력해주세요.'
                                },
                                authNo:{
                                    required: true,
                                    msgTarget: '.err-block',
                                    errorMsg: '인증번호를 입력해주세요.',
                                }
                            }
                        };

                        if( self.el.container.find('.form-wrap').length) {
                            self.validation = new vcui.ui.CsValidation('.reserv-inquiry .auth-type-no', {register : register});
                            self.authManager = new AuthManager(authOptions);
    
                            self.el.container.find('.btn-auth-confirm').on('click', function() {
                                self.authManager.send(this);
                                self.el.container.find('#authNo').attr('disabled', false);
                            });
    
                            self.el.container.find('.btn-inquiry').on('click', function(){
    
                                if( self.el.container.find('.auth-type-no.active').length ) {

                                    self.validation.validate();
                                    var validationResult = self.validation.validate().success;
                                    var resultData = self.validation.getAllValues();

                                    if( validationResult ) {
                                        lgkorUI.showLoading();
                                        lgkorUI.requestAjaxDataPost($('#authDataForm1').data('ajax'), resultData, function(result) {
                                            if (result.data.resultFlag == 'Y') {
                                                $('#authDataForm1').attr('action', result.data.url).submit();
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
                                                });
                                            }
                    
                                            lgkorUI.hideLoading();
                                        });
                                    }
                                }
                                
                                if( self.el.container.find('.auth-type-phone.active').length ) {
                                    self.authManager.confirm('.btn-auth-confirm')
                                }
    
                            })
                        }
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
                this.serviceReserv.init();
                this.reservInquiry.init();
            }
        },
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
                    '<a href="/support/solutions-{{item.item_id}}?category={{item.parent_category}}&subCategory={{item.category}}">' + 
                        '<div class="item-category"><span class="category-thumb"><img src="{{item.icon_path}}" alt=""></span> {{item.parent_cate_name}}</div>' + 
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
                            lgkorUI.hideLoading();
                        } else {
                            lgkorUI.hideLoading();
                            lgkorUI.confirm('등록된 제품이 없습니다. <br>보유제품을 등록하시겠습니까?',{
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
            },
            init : function(){
                var self = this;
                var $container = $(self.el.container);
                var $pdCont = $container.find(self.el.pdCont);

                
                $container.find(self.el.toggleBtn).on('click', function(e){
                    var $this = $(this);

                    if( lgkorUI.isLogin ) {
                        e.preventDefault();
                        if( $this.hasClass('active') ) {
                            $this.removeClass('active');
                            $pdCont.filter('.default-pd').addClass('active').siblings().removeClass('active').find('.btn-moreview').removeClass('close').text('더보기');
                        } else {
                            self.getProduct();
                        }
                    } else {
                        //비로그인

                        var _url = $this.data('href');

                        location.href= _url;
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
                var self = this;
                var $popup = $(self.el.popup);


                if($popup.length ) {
                    $popup.each(function(v, i){
                        var $this = $(this);
                        var _id = $this.attr('id');

                        if( lgkorUI.cookie.getCookie(_id) == "done") {
                            $this.addClass('hidden');
                        }
                    })
                    $popup.not('.hidden').addClass('active');

                    if( $popup.filter('.active').length ) {
                        $('html').css('overflow', 'hidden');
                        $popup.filter('.active').wrapAll(self.el.modal);
                        if( $popup.filter('.active').length == 1) {
                            $('.ui_modal_wrap.init-type').addClass('center-only');
                        }
                        $popup.filter('.active').stop().fadeIn();

                        if( !vcui.detect.isMobileDevice) {
                            $popup.filter('.active').not('.mCustomScrollbar').find('.pop-conts').mCustomScrollbar();
                            $popup.filter('.active').not('.mCustomScrollbar').find('.video-figure').mCustomScrollbar();
                        }
                    }
                }

                $popup.find(self.el.close).on('click', function(e){
                    var $this =$(this);
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
                            $popup.unwrap();
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

                $('.ui_modal_wrap.init-type .ui_modal_dim').on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                })
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