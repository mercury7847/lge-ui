function MainSwiper( ID ){
    this.$el = $('#' + ID);
    this.tabs = this.$el.find('.nav-item');
    this.currentIdx = 0;
    this.contentHTMLArray = [];
    this.canScroll = false;
    this.swiper = null;
    this.currentHash = window.location.hash;

    this.hashMap = [
        '#home',
        '#store',
        '#story',
        '#cs',
        '#care'
    ];

    this.urlToHash = {
        'home' : '#home',
        'store' : '#store',
        'story' : '#story',
        'support' : '#cs',
        'care-solutions' : '#care'
    };

    this.init();
    
}

MainSwiper.prototype = {
    init : function(){       
        this.setMobileNav();
        this.setSwipe();
        
    },
    setSwipe : function(){
        var mainSwiper =  this;
        var currentHash = this.currentHash;

        this.swiper = new Swiper('#sw_con', {
            autoHeight : true,
            observer : true,
            slidesPerView : 1,           
            hashNavigation : {
                watchState: true
            },
            on : {
                'beforeInit' : function(){
                    $('#sw_con .swiper-slide').data('isLoaded', false);
                },
                'init' : function(swiper){
                    //console.log('mainSwiper.getHash', mainSwiper.getHash());
                    window.location.hash = mainSwiper.getHash();
                    var currentSlide = swiper.slides[ mainSwiper.currentIdx ];
                    mainSwiper.loadContent( currentSlide );
                },
                'slideChange' : function(swiper){
                    console.log('active page', swiper.slides[swiper.activeIndex] );
                    var currentSlide = swiper.slides[swiper.activeIndex];

                    mainSwiper.loadContent( currentSlide );
                    mainSwiper.currentIdx = swiper.activeIndex;

                    mainSwiper.tabs.removeClass('on').eq(swiper.activeIndex).addClass('on');

                    
                }
            }
        });

        $('#sw_con .swiper-slide').on('touchstart', function( e ){
            //console.log('touchstart event', e);
            //console.log('is carouselList',!!$(e.target).parents('.ui_carousel_list').length);

            var isCategoryTab = !!$(e.target).closest('.ui_category_tab').length;
            var isCarouselList = !!$(e.target).closest('.ui_carousel_list').length;
            var isCategoryTabContent = !!$(e.target).closest('.ui_category_tab_contents').length;
            var isTagScrollTab = !!$(e.target).closest('.ui_tag_smooth_scrolltab').length;
            var isSlick = !!$(e.target).closest('.slick-track').length;
            
            
            

            if (isCategoryTab || isCarouselList || isCategoryTabContent || isTagScrollTab || isSlick){
                e.stopPropagation();
            }
            
        });

        $('#sw_con .swiper-slide').on('touchmove', function( e ){
            //console.log('touchmove event', e);
            //console.log('is carouselList',!!$(e.target).parents('.ui_carousel_list').length);

            var isCategoryTab = !!$(e.target).closest('.ui_category_tab').length;
            var isCarouselList = !!$(e.target).closest('.ui_carousel_list').length;
            var isCategoryTabContent = !!$(e.target).closest('.ui_category_tab_contents').length;
            var isTagScrollTab = !!$(e.target).closest('.ui_tag_smooth_scrolltab').length;
            var isSlick = !!$(e.target).closest('.slick-track').length;

            if (isCategoryTab || isCarouselList || isCategoryTabContent || isTagScrollTab || isSlick){
                e.stopPropagation();
            }
        });

    },
    loadContent: function( currentSlide ){
        var href = $(currentSlide).data().href;
        var isLoaded = $(currentSlide).data().isLoaded;

        console.log('currentSlide', $(currentSlide).data());

        if (!href) return;

        if (isLoaded) return;

        $.ajax({
            method: 'POST',
            url : href,
            dataType : 'html',
            success : function( res ){
                $(currentSlide).html( res );
            },
            error : function(error){
                console.log('mainSwiper cant get HTML', error);
            },
            complete: function(){
                lgkorUI.init( $(currentSlide) );
                $(currentSlide).data().isLoaded = true;       
            }
        });
    },
    setMobileNav : function(){
        var $tabs = this.tabs;
        $tabs.on('click', function( e ){
            //e.preventDefault();
            //var href = $(this).data().href;
            var idx = $tabs.index(this);

            $tabs.removeClass('on').eq(idx).addClass('on');

            window.location.href = this.href;

            //if (!href) return;
            /*
            

            if (!href) return;

            if (idx == 0){
                $('html').attr('canscroll', 'true');
                $('html').css({
                    'overflow' : 'hidden',
                    'height' : '100%'
                });
            } else {
                $('html').attr('canscroll', 'false');
                $('html').css({
                    'overflow' : '',
                    'height' : ''
                });
            } 
            */       
            /*
            $.ajax({
                url : href,
                dataType : 'html',
                success : function( res ){
                    $('#sw_con').html( '<div class="swipe-item">' + res + '</div>' );
                },
                error : function(error){
                    console.log('mainSwiper cant get HTML', error);
                },
                complete: function(){                    
                    lgkorUI.init();
                    $tabs.removeClass('on').eq(idx).addClass('on');
                }
            });
            */
        });
    },
    // fixed 처리된 모달 수정값
    getLeft: function(){
        return Math.abs($('#sw_con .swiper-wrapper').offset().left);
    },
    // url 마지막 경로 
    getLastSegmentByUrl: function(){
        return window.location.href.split('/').pop();
    },

    getHash: function(){
        console.log('urltohash value', this.urlToHash[ this.getLastSegmentByUrl() ] );
        var hash = '';
        if (!!this.urlToHash[ this.getLastSegmentByUrl() ] == false ){
            hash = this.urlToHash['home'];
        } else {
            hash = this.urlToHash[ this.getLastSegmentByUrl() ];
        }

        return hash;
    }
}

$(function(){
    var mainSwiperID = 'mobileNav';
    window.mainSwiper = new MainSwiper( mainSwiperID );

    //$('#floatBox').hide();

});





// BTOCSITE-27 :: support quickmenu
(function($){
    vcui.require(['support/common/quickMenu.min'], function() {
        $('#quickMenu').vcQuickMenu();
    });

    function commonInit(){
        //input type number 숫자키패드
        $('input[type="number"]').attr('inputmode', 'numeric');
        //$('input[type="number"]').attr('oninput', 'this.value = this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")');
        
        $('[data-format=koreng]').on('input', function() {
            var $this = $(this),
                value = $this.val();
            
            var regex = /(^[^가-힣ㄱ-ㅎㅏ-ㅣㄱ-ㅎ가-힣ㅏ-ㅣㆍ ᆢa-zA-Z])|[^가-힣ㄱ-ㅎㅏ-ㅣㄱ-ㅎ가-힣ㅏ-ㅣㆍ ᆢa-zA-Z]|([^가-힣ㄱ-ㅎㅏ-ㅣㄱ-ㅎ가-힣ㅏ-ㅣㆍ ᆢa-zA-Z]$)/g;
            
            if (regex.test(value)) {
                $this.val(value.replace(regex, ''));
                return;
            }
        });

        $('[data-format=email]').on('input', function() {
            var $this = $(this),
                value = $this.val();
            
            var regex = /[가-힣ㄱ-ㅎㅏ-ㅣㆍ ᆢ\s]/g;
            
            if (regex.test(value)) {
                $this.val(value.replace(regex, ''));
                return;
            }
        });

        $('[data-format=alnum]').on('input', function() {
            var $this = $(this),
                value = $this.val();
            
            var regex = /[^a-zA-Z0-9]/g;
            
            if (regex.test(value)) {
                $this.val(value.replace(regex, ''));
                return;
            }
        });


        if( $('#surveyPopup').length) {
            vcui.require(['ui/selectbox', 'ui/satisfactionModal']);
        }

        if ($('.ui_common_scroll').length && !vcui.detect.isMobileDevice) {
            $('.ui_common_scroll').mCustomScrollbar();
        }

        $(document).on('input', 'input[type="text"]', function(){
            if (this.maxLength > 0 && this.value.length > this.maxLength){
                this.value = this.value.slice(0, this.maxLength);
            }  
        });

        $(document).on('input', 'input[type="number"]', function(){
            if (this.maxLength > 0 && this.value.length > this.maxLength){
                this.value = this.value.slice(0, this.maxLength);
            }  
        });

        $(document).on('focus', 'input[type="number"]', function(e){
            $(this).on('mousewheel',function(e){
                e.preventDefault();
            });
        });

        $(document).on('keydown', 'input[type="number"]', function(e){
            if( e.keyCode == 189 || e.keyCode == 187 || e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 110 || e.keyCode == 190) {
                e.preventDefault();
            }
        });

        $(document).on('click', '.btn-add-pd', function(e){
            if( !lgkorUI.isLogin ) {
                var _url = $(this).attr('href');
                e.preventDefault();
                
                lgkorUI.confirm('로그인을 하셔야 이용하실 수 있습니다. <br>로그인 하시겠습니까?',{
                    typeClass:'type2',
                    title:'',
                    okBtnName: '네',
                    cancelBtnName: '아니요',
                    ok: function() {
                        location.href = _url;
                    },
                    cancel: function() {
                        
                    }
                });
            }
        });

        $(document).on('keyup', 'input[type="number"]', function(e){
            var $this = $(this);
            var v = $this.val();

            if( e.keyCode != 8 && e.keyCode != 46) {
                if( v != null && v != "") {
                    $this.data('oldValue', v);
                }
            } else {
                $this.data('oldValue', v);
            }
            
        });

        $(document).on('blur', 'input[type="number"]', function(e){
            var $this = $(this);
            var v = $this.val();
            var oldVal = $this.data('oldValue');
            
            if( v == null || v == "") {
                $this.val(oldVal);
            }
        });

        $(document).on('change', '.agree-wrap input:checkbox', function(){
            var $this = $(this);
            var $wrap = $this.closest('.agree-wrap');

            if ($wrap.find('input:checkbox').filter(':checked').length == $wrap.find('input:checkbox').length) {
                var $this = $(this);
                var $curSection = $this.closest('.section').nextAll('.section:visible').eq(0);
                
                lgkorUI.scrollTo($curSection, $('.prod-selected-wrap').outerHeight());
            }
        });
        
        $(document).on('ajaxComplete', function() {
            $('img').not('[data-pc-src], #modelNamePopup img').on('error', function() {
                lgkorUI.addImgErrorEvent(this);
            });
            $('#modelNamePopup img').on('error', function() {
                lgkorUI.addModelNameImgErrorEvent(this);
            });
        });

        $('.agree-wrap .agree-cont-box').attr('tabindex', 0);

        if ($('.pay-warranty').length) {
            $('.ui_tab-notice').on('tabchange', function(e, info) {
                var index = info.selectedIndex;
                switch(index) {
                    case 0:
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/ratesInfo1.do', '/acecount/ratesInfo1m.do');
                        break;
                    case 1:
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/ratesInfo3.do', '/acecount/ratesInfo3m.do');
                        break;
                    case 2:
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/ratesInfo4.do', '/acecount/ratesInfo4m.do');
                        break;
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', commonInit);

    $('[data-control="modal"]').each(function() {
        var target = $(this).data('href') || $(this).attr('href');
        
        $(target).on('modalshow', function(e, modal) {
            $(target).removeAttr('style');
        });
    });
})(jQuery);

if (!vcui.detect.isMobileDevice) {
    var _AceGID=(function(){var Inf=['gtp20.acecounter.com','8080','AH5A40639666759','AW','0','NaPm,Ncisy','ALL','0']; var _CI=(!_AceGID)?[]:_AceGID.val;var _N=0;var _T=new Image(0,0);if(_CI.join('.').indexOf(Inf[3])<0){ _T.src ="https://"+ Inf[0] +'/?cookie'; _CI.push(Inf);  _N=_CI.length; } return {o: _N,val:_CI}; })();
    var _AceCounter=(function(){var G=_AceGID;var _sc=document.createElement('script');var _sm=document.getElementsByTagName('script')[0];if(G.o!=0){var _A=G.val[G.o-1];var _G=(_A[0]).substr(0,_A[0].indexOf('.'));var _C=(_A[7]!='0')?(_A[2]):_A[3];var _U=(_A[5]).replace(/\,/g,'_');_sc.src='https:'+'//cr.acecounter.com/Web/AceCounter_'+_C+'.js?gc='+_A[2]+'&py='+_A[4]+'&gd='+_G+'&gp='+_A[1]+'&up='+_U+'&rd='+(new Date().getTime());_sm.parentNode.insertBefore(_sc,_sm);return _sc.src;}})();
} else {
    var _AceGID=(function(){var Inf=['co.kr','www.lgservice.co.kr,lgservice.co.kr,m.lgservice.co.kr,lge.co.kr,m.lge.co.kr,www.lge.co.kr','AZ3A66760','AM','0','NaPm,Ncisy','ALL','0']; var _CI=(!_AceGID)?[]:_AceGID.val;var _N=0;if(_CI.join('.').indexOf(Inf[3])<0){ _CI.push(Inf);  _N=_CI.length; } return {o: _N,val:_CI}; })();
    var _AceCounter=(function(){var G=_AceGID;var _sc=document.createElement('script');var _sm=document.getElementsByTagName('script')[0];if(G.o!=0){var _A=G.val[G.o-1];var _G=(_A[0]).substr(0,_A[0].indexOf('.'));var _C=(_A[7]!='0')?(_A[2]):_A[3];var _U=(_A[5]).replace(/\,/g,'_');_sc.src='https:'+'//cr.acecounter.com/Mobile/AceCounter_'+_C+'.js?gc='+_A[2]+'&py='+_A[1]+'&up='+_U+'&rd='+(new Date().getTime());_sm.parentNode.insertBefore(_sc,_sm);return _sc.src;}})();    
}