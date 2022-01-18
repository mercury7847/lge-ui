//통합앱 구축팀 요청...통합앱 식별 스크립트
var isApp = function(){
    return /lgeapp/i.test(navigator.userAgent);
}

/* goAppUrl : 앱실행및 해당 경로로 랜딩하는 함수
*  @path : 랜딩할 경로
*/
var goAppUrl = function(path) {
    var weblink = path ? path : location.href;
    location.href =  'https://lgeapp.page.link/?link='+weblink+'&apn=kr.co.lge.android&isi=1561079401&ibi=kr.co.lge.ios'; // 앱실행 
    
}

;(function(global){

    if(global['lgkorUI']) return;
    // console.log("lgkorUI start!!!");

    var isApplication = isApp();
    var isAndroid = vcui.detect.isAndroid;
    var isIOS = vcui.detect.isIOS;
    var isMobileDevice = vcui.detect.isMobileDevice; 

    if(vcui.detect.isMac) $('html').addClass('mac');
    if(isApplication) $('html').addClass('app');
    if(isMobileDevice) $('html').addClass('mdevice');


    window.onload = function(){
        vcui.require([
            'ui/lazyLoaderSwitch',
            'ui/lazyLoader'
        ], function () {
            var $b = $('body');
            $b.vcLazyLoaderSwitch();
            $b.vcLazyLoader();
        });
    };

    // BTOCSITE-429 앱 설치 유도 팝업 노출 페이지 추가 - 해당 요건으로인해 스크립트로 이동
    var appDownloadTmpl = 
        '<article id="mobile-close-popup" class="popup-wrap small app-popup-init appMobile-pop">\n'+
        '    <section class="pop-conts align-center">\n'+
        '        <section class="section">\n'+
        '            <div class="appMobile-pop-content">\n'+
        '                <p class="appMobile-popImg"><img src="/lg5-common/images/MA/appPop_img_v2.png" alt="LG로고" class="pop-img"></p>\n'+
        '                <div class="text-cont">\n'+
        '                LG전자 <b>LGE.COM</b><br/>\n'+
        '                앱으로 더 편리하게<br/>\n'+
        '                이용하실 수 있습니다.\n'+
        '                </div>\n'+
        '            </div>\n'+
        '            <div class="btn-wrap">\n'+
        '                <button type="button" class="btn full border size-m" id="lg__app-download"><span>지금 앱으로 보기</span></button>\n'+
        '            </div>\n'+
        '        </section>\n'+
        '    </section>\n'+
        '    <button type="button" class="ui_modal_close">모바일 웹에서볼게요</button>\n'+
        '</article>\n';

    var alertTmpl =  '<article id="laypop" class="lay-wrap {{typeClass}}" style="display:block;" role="alert">\n'+
        '   <header class="lay-header">\n'+
        '       <h1 class="tit">{{#raw title}}</h1>\n'+
        '   </header>\n'+
        '   <section class="lay-conts ui-alert-msg">\n'+
        '   </section>\n'+
        '   <div class="btn-wrap laypop">\n'+
        '       <button type="button" class="btn ui_modal_close" data-role="ok"><span>{{okBtnName}}</span></button>\n'+
        '   </div>\n'+
        '</article>';

    var mainPopupInit = 
    '<article id="main-init-popup" class="popup-wrap small main-init-popup"  style="max-width:500px">' + 
        '<header class="pop-header">' + 
            '<h1 class="tit"><span>안내</span></h1>' + 
        '</header>' + 
        '<section class="pop-conts" style="text-align:center;">' + 
            '<section class="section">' + 
                '<div class="headline">' + 
                    '<h3 class="h-tit-3">주주확정기준일설정공고</h3>' + 
                '</div>' + 
                '<div class="text-cont">' + 
                    '상법 제354조 및 우리 회사 정관 제21조에<br> 의거하여, ' + 
                    '다음과 같이 임시주주총회에서<br> 의결권을 행사할 주주 확정을 위한 ' + 
                    '기준일을<br> 정하였으니 양지하여 주시기 바랍니다. ' + 
                    '<br><br> - 다  음 - <br><br>' + 
                    '■주주확정기준일: 2021년 12월 10일<br><br>' +
                    '<p style="text-align:right;">2021년 11월 25일</p>' +
                    '<p style="text-align:right;">LG전자 주식회사</p>' +
                '</div>' + 
                '<div class="btn-wrap">' + 
                    '<a href="https://www.lge.co.kr/company/investor/announceView?anncmNo=18&page=1#com-tabs02" title="pdf 확인하기" class="btn full border size-m"><span>자세히 보기</span></a>' + 
                '</div>' + 
            '</section>' + 
        '</section>' + 
        '<div class="pop-footer check-type align-between">' + 
            '<span class="chk-wrap" data-role="today-cookie-check">' + 
                '<input type="checkbox" id="init-popup-check-today" name="init-popup-check-today">' + 
                '<label for="init-popup-check-today">7일동안 보지 않기</label>' + 
            '</span>' + 
            '<button type="button" class="btn pink btn-main-pop-close size"><span>닫기</span></button>' + 
        '</div>' + 
        '<button type="button" class="btn-close btn-main-pop-close"><span class="blind">닫기</span></button>' + 
    '</article>';



    var confirmTmpl =  '<article id="laypop" class="lay-wrap {{typeClass}}" style="display:block;" role="confirm">\n'+
        '   {{#if title}}'+
        '   <header class="lay-header">\n'+
        '       <h1 class="tit">{{#raw title}}</h1>\n'+
        '   </header>\n'+
        '   {{/if}}'+
        '   <section class="lay-conts ui-alert-msg">\n'+
        '   </section>\n'+
        '    <section class="lay-conts">\n'+
        '        <h6 class="ui-alert-msg"></h6>\n'+
        '    </section>\n'+
        '    <div class="btn-wrap laypop">\n'+
        '        <button type="button" class="btn gray ui_modal_close" data-role="cancel"><span>{{cancelBtnName}}</span></button>\n'+
        '        <button type="button" class="btn" data-role="ok"><span>{{okBtnName}}</span></button>\n'+
        '    </div>\n'+
        '</article>';


    $.fn.buildCommonUI = function () {
        vcui.require([
            'ui/selectbox',
            'ui/calendar',
            'ui/accordion',
            'ui/carousel',
            'ui/modal',
            'ui/tab',       
            "ui/videoBox",
            "ui/youtubeBox",
            "ui/dropdown",
            "ui/textControl",
            "ui/fileInput",
            "ui/radioShowHide",
            'ui/inputClearButton',
            "ui/starRating",
            "ui/tooltipTarget",
            "ui/sticky",
            "ui/formatter",
            "ui/scrollNavi",
            "ui/smoothScroll",
            "ui/smoothScrollTab",
            "ui/checkboxAllChecker",
            //"ui/imageSwitch"
            'ui/lazyLoaderSwitch',
            'ui/lazyLoader'
        ], function () {    
            // console.log("buildCommonUI!!!!");

            //this.vcImageSwitch();
            if(location.hostname == "cms50.lge.co.kr") {
                // console.log('lazy cms50');
                this.vcLazyLoaderSwitch();
                this.vcLazyLoader();
            }

            this.find('.ui_calendar').vcCalendar();
            this.find('.ui_accordion').vcAccordion();        
            this.find('.ui_dropdown').vcDropdown();
            this.find('.ui_tab').vcTab();
            this.find('.ui_carousel').vcCarousel();
            this.find('.animation-box').vcVideoBox();
            this.find('.youtube-box').vcYoutubeBox();
            this.find('.ui_textcontrol').vcTextcontrol();
            //this.find('.ui_fileinput').vcFileInput();
            this.find('.ui_radio_visible').vcRadioShowHide();
            this.find('.ui_input_clearbutton').vcInputClearButton();
            this.find('.ui_star_rating').vcStarRating();
            this.find('.ui_tooltip-target').vcTooltipTarget();
            
            //this.find('.ui_card_number').vcFormatter({format: "card", maxlength:16});
            
            this.find('.ui_smooth_scroll').vcSmoothScroll();
            this.find('.ui_scroll_navi').vcScrollNavi();

            this.find('.ui_smooth_scrolltab').vcSmoothScrollTab();

            this.find('.ui_sticky').vcSticky();

            this.find('.ui_all_checkbox').vcCheckboxAllChecker();

            this.find('.ui_selectbox').vcSelectbox({
                events:{
                    selectboxtoggle: function(e){
                        var selectwrap = $(e.currentTarget).siblings('.ui-selectbox-wrap');
                        var isOpen = selectwrap.hasClass('on');
                        if(isOpen){
                            var selectlist = selectwrap.find("> .ui-selectbox-list");
                            var margintop = selectlist.css('margin-top');
                            if(parseInt(margintop) < 0){
                                if(!selectwrap.hasClass('type_up')) selectwrap.addClass('type_up')
                            }
                        } else{
                            selectwrap.removeClass("type_up");
                        }
                    }
                }
            });

            this.find('.ui_wide_slider').vcCarousel({
                autoplay:true,
                autoplaySpped:5000,
                infinite: true,
                pauseOnHover:false,
                pauseOnFocus:false,
                swipeToSlide: true,
                buildDots:false,
                dotsSelector:'.ui_wideslider_dots',
                slidesToShow: 1,
                slidesToScroll: 1
            });
            this.find('.ui_wide_dot_slider').vcCarousel({
                autoplay:true,
                autoplaySpped:5000,
                infinite: true,
                pauseOnHover:false,
                pauseOnFocus:false,
                swipeToSlide: true,
                slidesToShow: 1,
                slidesToScroll: 1
            });
            this.find('.ui_carousel_4_slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 4,
                slidesToShow: 4,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToScroll: 1,
                            slidesToShow: 1
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
            });
            this.find('.ui_carousel_3_slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 3,
                slidesToShow: 3,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            variableWidth: true,
                            slidesToScroll: 1,
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 20000,
                        settings: {
                            slidesToScroll: 3,
                            slidesToShow: 3
                        }
                    }
                ]
            });
            this.find('.ui_carousel_1_slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 1,
                slidesToShow: 1,
                // responsive: [
                //     {
                //         breakpoint: 768,
                //         settings: {
                //             variableWidth: true,
                //             centerMode: true
                //         }
                //     }
                // ]
            });

            lgkorUI.resetFlexibleBox();
        }.bind(this));

        return this;
    };

    

    /* 

    vcui.require.config({
        paths: {
            'jquery.transit': 'libs/jquery.transit'
        },
        waitSeconds: 15,
        onNodeCreated: function (node) {
            node.charset = 'euc-kr';
        }
    });
    

    // ajax 로 통신할때는 기본 케릭터셑이 utf-8 로 되어있음.
    // 따라서, euc-kr 로 설정된 서버에서 ajax 를 이용하여 한글로된 데이터를 전달하게 되면 글씨가 깨짐.
    // 이때는 아래와 같이 캐릭터셑을 euc-kr 로 설정해 주면 해결이 됩니다

    var pathname = location.pathname;
    if (pathname.indexOf('/html/') > -1) {
        console.log(pathname);
        $.ajaxSetup({
            contentType: 'application/x-www-form-urlencoded;charset=euc-kr',
            beforeSend: function (xhr) {
                xhr.overrideMimeType('application/x-www-form-urlencoded;charset=euc-kr');
            }
        });
    } 
    */
    
    $.holdReady(true);
    
    global['lgkorUI'] = {
        COMPARE_KEY: "prod_compare",
        CAREPLANER_KEY: "care_planer",
        CAREPLANER_ID: "putitem_list",
        CAREPLANER_PRICE: "putitem_price",
        MOBILE_CHECK_WIDTH: 768,
        STICKY_MODULES:[],
        NO_IMAGE: "/lg5-common/images/icons/noimage.svg",
        NO_IMAGE_MODEL_NAME: "/lg5-common/images/icons/noimage-modelName.svg",
        RECENT_PROD_COOKIE_NAME: "myRecentProduct", //최근 본 제품 쿠키
        COMPARE_COOKIE_NAME: "LG5_CompareCart", //비교하기 쿠키
        HOMEBREW_CHECK_COOKIE_NAME: "lgeAgeCheckFlag", //홈브류 연령체크 쿠키
        INTERGRATED_SEARCH_VALUE: "intergratedSearchValue",
        MAX_SAVE_RECENT_KEYWORD: 5, //최근 검색어 저장 최대수
        MAX_SAVE_RECENT_PRODUCT: 10, //최근 본 제품 저장 최대수,
        SEARCH_AUTOCOMPLETE_MIN_LENGTH: 1, // 검색 자동 완성 기능 실행 최소 글자수
        SEARCH_AUTOCOMPLETE_TIMER: 300, // 검색 자동 완성 기능 키보드 클릭 타이머
        DOMAIN_LIST:["www.lge.co.kr", 'wwwstg.lge.co.kr', 'wwwdev50.lge.co.kr'],
        CONTEXT_AREA: null,      
        init: function( $context ){            
            var self = this;

            self._bindErrBackEvent();
            self._addImgOnloadEvent();

            if (!!$context){
                self.CONTEXT_AREA = $context;
                self._preloadComponents();
            } else {
                //self.CONTEXT_AREA = null;
                self.CONTEXT_AREA = $(document);
                self._preloadComponents();
            }

            //self._mobileInitPopup(); //2021-12-16 삭제 (BTOCSITE-9801)
            self._addTopButtonCtrl();
            self._createMainWrapper();
            self._switchLinker();
            
            self._appDownloadPopup(); //BTOCSITE-429 앱 설치 유도 팝업 노출 페이지 추가
            self.afLoginEvent(); // BTOCSITE-4852 [AppsFlyer] 앱어트리뷰션 툴 Event 태깅을 위한 회원가입완료 및 로그인 완료 정보 개발 요청건

            var lnbContents = $('.contents .lnb-contents');
            if(lnbContents.length) lnbContents.attr('id', 'content');
            else $('body').find('.container').attr('id', 'content');

            if (!!$context){
                return $.Deferred().resolve($context.data());
            }

            // a link form 태그 있을경우 시스템 얼럿 처리
            $(window).on("beforeunload",function(){

                self.hideLoading()
            });


            // BTOCSITE-659
            if(location.href.indexOf('/story/') > -1 ) self.addAWSStory();

        },

        // BTOCSITE-659 [UI개발]마이컬렉션 추천 서비스로 개편 : story 상세
        addAWSStory: function () {
            // story 상세페잊 파라메터로 넘긴다
            // /mkt/commonModule/addAWSStory.lgajax
            // 파라미터
            // itemId : storyurl (/story/only-and-best/all-in-one-generation)
            var depth = location.pathname.split('/');
            if(depth.length === 4) {
                lgkorUI.requestAjaxData("/mkt/commonModule/addAWSStory.lgajax", {"itemId":location.href.replace(/https?:\/\//,'').replace(location.host,'')});
            }
        },

        //BTOCSITE-429 앱 설치 유도 팝업 노출 페이지 추가
        _appDownloadPopup: function() {
            var enableUrl = [
                '^/$', // 메인
               '^/benefits/event/?', // 이벤트 페이지
               '^/benefits/exhibitions/?', // 기획전 페이지
               '^/story/?$', // 스토리 페이지
            //    '^/story/lifestyle/?', // 스토리 - lifestyle 상세 페이지
            //    '^/story/trend/?', // 스토리 - trend 상세 페이지
            //    '^/story/expert-curation/?', // 스토리 - 인사이드 대명장의 추천  상세 페이지
            //    '^/story/only-and-best/?', // 스토리 -  인사이드 only & best 상세 페이지
            //    '^/story/useful-tip/?', // 스토리 - 가이드&팁 상세 페이지
            //    '^/story/user-guide/?', // 스토리 - 사용가이드 상세 페이지
            //    '^/story/hands-on-reviews/?', // 스토리 - 고객리뷰 상세 페이지


               // pdp 
            //    '^/tvs|projectors|home-audio|notebook|all-in-one-pc-and-desktop|monitors/.*$', // 스토어 - tv/av , it
            //    '^/refrigerators|kimchi-refrigerators|electric-ranges|dishwashers|microwaves-and-ovens|water-purifiers|lg-homebrew/.*$', // 스토어 - 주방가전

            //    '^/tvs/.*$', // 스토어 - tv/av = tv
            //    '^/projectors/.*$', // 스토어 - tv/av - 프로젝터
            //    '^/home-audio/.*$',// 스토어 - tv/av - av
            //    '^/notebook/.*$',// 스토어 - it - 노트북
            //    '^/all-in-one-pc-and-desktop/.*$',// 스토어 - it - 일체형/데스크톱
            //    '^/monitors/.*$',// 스토어 - it - 모니터

            //    '^/refrigerators/.*$',// 스토어 - 주방가전 - 냉장고
            //    '^/kimchi-refrigerators/.*$',// 스토어 - 주방가전 - 김치냉장고
            //    '^/electric-ranges/.*$',// 스토어 - 주방가전 - 전자레인지
            //    '^/dishwashers/.*$',// 스토어 - 주방가전 - 식기세척기
            //    '^/microwaves-and-ovens/.*$',// 스토어 - 주방가전 - 광파오븐/전자레인지
            //    '^/water-purifiers/.*$',// 스토어 - 주방가전 - 정수기
            //    '^/lg-homebrew/.*$',// 스토어 - 주방가전 - 맥주제조기


            //    '^/kr/business/product/builtin/cooling-list/.*$',// 스토어 - 주방가전 - 빌트인가전, 시그니쳐 : lge.co.kr 5.0 사이트 아님


            //     '^/wash-tower/.*$',// 스토어 - 생활가전 - 워시타워
            //     '^/washing-machines/.*$',// 스토어 - 생활가전 - 세탁기
            //     '^/dryers/.*$',// 스토어 - 생활가전 - 의류건조기
            //     '^/vacuum-cleaners/.*$',// 스토어 - 생활가전 - 청소기
            //     '^/massage-chairs/.*$',// 스토어 - 생활가전 - 안마의자

            //     '^/air-conditioners/.*$',// 스토어 - 에어컨/에어케어 - 에어컨
            //     '^/system-air-conditioners/.*$',// 스토어 - 에어컨/에어케어 - 시스템에어컨
            //     '^/air-purifier/.*$',// 스토어 - 에어컨/에어케어 - 공기청정기
            //     '^/air-conditioners/.*$',// 스토어 - 에어컨/에어케어 - 에어컨
            //     '^/dehumidifiers-and-humidifiers/.*$',// 스토어 - 에어컨/에어케어 - 제습/가습기
            //     '^/ceiling-fan/.*$',// 스토어 - 에어컨/에어케어 - 제습/가습기
                
            //     '^/beauty-device/.*$',// 스토어 - 뷰티의료기기 - 뷰티디바이스
            //     '^/medical-device/.*$',// 스토어 - 뷰티의료기기 - 뷰티디바이스
            //     '^/beauty-device/.*$',// 스토어 - 뷰티의료기기 - 뷰티디바이스

            //     '^/signature/.*$',// 스토어 - LG SIGNATURE 
            //     '^/object-collection/.*$',// 스토어 - LG Objet Collection 



            //     '^/care-accessories/(abq|aaa).*$',// 케어용품/소모품 -전자레인지


            //    '^/care-accessories/tv/.*$',// 케어용품/소모품 -tv
            //    '^/care-accessories/projector-\(minibeam-etc\.\)/.*$',// 케어용품/소모품 -프로젝터
            //    '^/care-accessories/laptop/.*$',// 케어용품/소모품 -노트북
            //    '^/care-accessories/monitor/.*$',// 케어용품/소모품 -모니터
            //    '^/care-accessories/desktop/.*$',// 케어용품/소모품 -데스크톱
            //    '^/care-accessories/laserjet-inkjet-printer-printer/.*$',// 케어용품/소모품 -프린터
            //    '^/care-accessories/side-by-side-and-french-door-refrigerators/.*$',// 케어용품/소모품 -냉장고
            //    '^/care-accessories/care-accessories/water-purifier/.*$',// 케어용품/소모품 -정수기
            //    '^/care-accessories/care-accessories/dishwasher/.*$',// 케어용품/소모품 -식기세척기

            //    '^/care-accessories/front-load-washer/.*$',// 케어용품/소모품 -세탁기
            //    '^/care-accessories/dryer/.*$',// 케어용품/소모품 -의류건조기
            //    '^/care-accessories/styler/.*$',// 케어용품/소모품 -스타일러
            //    '^/care-accessories/a9-vacuum-cleaner/.*$',// 케어용품/소모품 -청소기
            //    '^/care-accessories/robotic-vacuum-cleaner/.*$',// 케어용품/소모품 -청소기
            //    '^/care-accessories/other-vacuum-cleaner/.*$',// 케어용품/소모품 -청소기
            //    '^/care-accessories/floor-standing-cooler/.*$',// 케어용품/소모품 -에어컨
            //    '^/care-accessories/room-air-conditioner/.*$',// 케어용품/소모품 -에어컨
            //    '^/care-accessories/system-rooftop-air-conditioner/.*$',// 케어용품/소모품 -에어컨
            //    '^/care-accessories/window-portable-air-conditioner/.*$',// 케어용품/소모품 -에어컨

            //    '^/care-accessories/pra\.l/.*$',// 케어용품/소모품 -프라엘
            //    '^/care-accessories/medi-hair/.*$',// 케어용품/소모품 -메디헤어
            //    '^/care-accessories/eye-care/.*$',// 케어용품/소모품 -아이케어

            ];

            var isPopUp = enableUrl.some(function(element) {
                return location.pathname.match(new RegExp(element,"g"))
            });
            
            $(function() {
                if (vcui.detect.isMobileDevice && !isApp()) {
                    var cookie_name = '__LGAPP_DLOG__';
                    if (vcui.Cookie.get(cookie_name) === '' && (isPopUp || $('.pdp-wrap').length >0) ) {
                        if($('#mobile-close-popup').size() === 0 && !!vcui.modal) {
                            $('body').append(vcui.template(appDownloadTmpl));
                            vcui.modal('#mobile-close-popup', open);
                            var el = $('#mobile-close-popup');
                            el.find('#lg__app-download').on('click', function () {
                                goAppUrl();
                                return;
                            });
                            
                            el.find('.ui_modal_close').one('click', function () {
                                vcui.Cookie.set(cookie_name, 'hide', {"expires": 1, "path": '/'});
                                $('html, body').css('overflow', '');
                                return;
                            });
                        }
                        
                    }
                }                
            });
        },

        _mobileInitPopup: function(){
            var enableUrl = [
                '^/$', // 메인
            ];

            var isPopUp = enableUrl.some(function(element) {
                return location.pathname.match(new RegExp(element,"g"))
            });

            $(function() {
                if (!isApp()) {
                    var cookie_InitPopName = '__LG_MAIN_REPORT_POPUP_INIT';
                    if (vcui.Cookie.get(cookie_InitPopName) === '' && isPopUp ) {
                    // if (vcui.Cookie.get(cookie_InitPopName) === '' ) {
                        if($('#main-init-popup').size() === 0 && !!vcui.modal) {
                            $('body').append(vcui.template(mainPopupInit));
                            $('#main-init-popup').vcModal('show');
                            
                            $(document).on('click', '#main-init-popup .btn-main-pop-close', function (e) {
                                var _expireChecked = $('#main-init-popup').find('.check-type input:checkbox').prop('checked');
                                
                                if( _expireChecked ) {
                                    vcui.Cookie.set(cookie_InitPopName, 'hide', {"expires": 7, "path": '/'});
                                }
                                $('#main-init-popup').vcModal('hide');
                                /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
                                $('html, body').css('overflow', '');
                                /* BTOCSITE-2148:pc메인 페이지 수정 2021-07-23 */
                                return;
                            });
                        }
                        
                    }
                }
            });
        },


        _addImgOnloadEvent: function(){
            var self = this;
            $('img').not('[data-pc-src]').on('error', function(e){
                var img = this;
                img.onerror = null;
                if ( !img.complete || !img.naturalWidth ) {
                    img.src = self.NO_IMAGE;
                    img.classList.add('no-img');
                }
                /*
                $(this).off('error');
                $(this).attr('src', self.NO_IMAGE);
                $(this).addClass('no-img');
                */
            });
        },

        addImgErrorEvent: function(img){
            var self = this;
            img.onerror = null;
            if ( !img.complete || !img.naturalWidth ) {
                img.src = self.NO_IMAGE;
                img.classList.add('no-img');
            }
        },

        addModelNameImgErrorEvent: function(img){
            var self = this;
            img.onerror = null;
            $(img).attr('src', self.NO_IMAGE_MODEL_NAME);
            $(img).addClass('no-img');
        },


        _createMainWrapper: function(){
            if ( $('.container-fluid:has(.header)').length && !$('main').length ) {
                //$('.container-fluid:has(.header) ~ div,.container-fluid.iw_section:has(.header) ~ section').not(':has(.footer-box)').wrapAll('<main></main>');
            }
        },
    
        // 주요 컴포넌트를 미리 로드
        _preloadComponents: function () {
            var self = this;

            vcui.require([  
                //'helper/responsiveImage',
                //'helper/breakpointDispatcher',
                'ui/spinner',         
                'ui/selectbox',
                'ui/calendar',
                'ui/accordion',
                'ui/carousel',
                'ui/modal',
                'ui/tab',       
                "ui/videoBox",
                "ui/youtubeBox",
                "ui/textControl",
                "ui/fileInput",
                "ui/radioShowHide",
                'ui/inputClearButton',
                "ui/starRating",
                "ui/tooltipTarget",
                "ui/toast",
                "ui/sticky",
                "ui/formatter",
                "ui/scrollNavi",
                "ui/smoothScroll",
                "ui/smoothScrollTab",
                'ui/imageFileInput',
                'common/header', 
                'common/footer',
            ], function (/*ResponsiveImage,*/ /*BreakpointDispatcher*/) {
                
                // new BreakpointDispatcher({
                //     matches: {
                //         '(min-width: 768px)' : function(mq) {
                //             var data;
                //             if (mq.matches) {
                //                 // pc
                //                 data = {
                //                     name: 'pc',
                //                     min: 768,
                //                     max: 999999,
                //                     isMobile: false,
                //                     isPc: true,
                //                     prev: window.breakpoint || {}
                //                 };
                                
                //             } else {
                //                 // mobile
                //                 data = {
                //                     name: 'mobile',
                //                     min: 0,
                //                     max: 767,
                //                     isMobile: true,
                //                     isPc: false,
                //                     prev: window.breakpoint || {}
                //                 };
                //             }
    
                //             window.breakpoint = data;
                //             $(window).data('breakpoint', data).trigger('breakpointchange', data);
                //         }
    
                //         /* 
                //         '(min-width : 769px) and (max-width : 1599px)' : function(mq){
                //         },
                //         '(min-width : 1600px)' : function(mq){
                //         } 
                //         */
                //     }
                // }).start();     
                
                /*
                var breakpoint = {
                    mobile: 768,
                    pc: 100000
                }
                
                new ResponsiveImage('body', breakpoint);
                */
                
                var $doc = $(document);                       

                //resize 이벤트 발생 시 등록 된 이벤트 호출...
                $(window).off('resizeend').on('resizeend', function(e){
                    self.resetFlexibleBox();
                });  
                self.resetFlexibleBox();

                /*
                self.resizeCallbacks = [];
                $(window).on("addResizeCallback", function(e, callback){
                    self.resizeCallbacks.push(callback);
                }).on('resize', function(e){
                    for(var idx in self.resizeCallbacks){
                        self.resizeCallbacks[idx].call();
                    }

                    //self._switchLinker();

                    self.resetFlexibleBox();
                });  
                self.resetFlexibleBox();
                */

                // 모달 기초작업 //////////////////////////////////////////////////////
                // 모달 기본옵션 설정: 모달이 들때 아무런 모션도 없도록 한다.(기본은 fade)
                vcui.ui.setDefaults('Modal', {
                    effect: 'fade',         // 모달이 뜰 때 사용할 효과
                    draggable: false,       // 모달을 드래그 할 수 있게 허용할 것인가..no
                    closeByEscape: false,   // esc키 누를 때 닫히게 할 것인가
                    closeByDimmed: false,   // dim 클릭시 닫히게 할 것인가
                    events: {
                        modalshown: function (e) {
                            // 모달이 뜨면 내부 컨텐츠 영역이 포커싱되도록 tabindex를 설정
                            //this.$('.pop_contents').attr('tabindex', 0);
                            //console.log(this);

                            // $('html, body').css({
                            //     overflow:"hidden"
                            // });
    
                            if(this.$('.ui_carousel').length>0){
                                this.$('.ui_carousel').vcCarousel('update');
                            }
                            if(this.$('.ui_smooth_scrolltab').length>0){
                                this.$('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                            }
                            if(this.$('.ui_smooth_scroll').length>0){
                                this.$('.ui_smooth_scroll').vcSmoothScroll('refresh');
                            }

                            if(this.$('.ui_pop_sticky').length > 0){
                                this.$('.ui_pop_sticky').vcSticky();
                            }
                        },
                        modalhidden: function(e){
                            var $modal = $(e.currentTarget);
                            var $opener = $modal.vcModal('getOpener');
                            if($opener) $opener.focus();

                            // $('html, body').css({
                            //     overflow:"visible"
                            // });
                        }
                    }
                });

                //캐로우셀
                vcui.ui.setDefaults('Carousel', {
                    events: {
                        carouselinit: function (e, data) {   
                            if(data.$el.find('.youtube-box').length>0) {                      
                                data.$el.find('.youtube-box').vcYoutubeBox();
                            }   
                            if(data.$el.find('.animation-box').length>0) {                      
                                data.$el.find('.animation-box').vcVideoBox();
                            }      
                        }
                    }
                });
    
                // 아코디언의 기본설정을 멀티오픈으로 설정해놓는다,
                vcui.ui.setDefaults('Accordion', {
                    singleOpen: false,
                    events: {
                        accordionexpand: function (e, data) {
                            // data.content.attr('tabindex', '0');                  
                            if(data.content.find('.ui_carousel').length>0) {                                
                                data.content.find('.ui_carousel').vcCarousel('update');
                            }                            
                        }
                    }
                });
    
    
                // 탭의 기본설정을 설정해놓는다,
                vcui.ui.setDefaults('Tab', {
                    events: {
                        tabchange: function (e, data) {
                            if(data && data.content.find('.ui_carousel').length > 0) {
                                data.content.find('.ui_carousel').vcCarousel('update');
                            }
                            if(data && data.content.find('.ui_smooth_scrolltab').length>0){
                                data.content.find('.ui_smooth_scrolltab').vcSmoothScrollTab('refresh');
                            }
                            if(data && data.content.find('.ui_smooth_scroll').length>0){
                                data.content.find('.ui_smooth_scroll').vcSmoothScroll('refresh');
                            }
                            if(data && data.content.find(".ui_carousel_slider").length > 0){
                                data.content.find('.ui_carousel_slider').vcCarousel('update');
                            }
                        }
                    }
                });
                
                if (!!lgkorUI.CONTEXT_AREA){                 
                    $('header.header').vcHeader(); //헤더 모듈 적용...
                    //lgkorUI.CONTEXT_AREA.find('footer').vcFooter(); //푸터모듈 적용...
                    lgkorUI.CONTEXT_AREA.find('footer:not(.pop-footer)').vcFooter();

                    lgkorUI.CONTEXT_AREA.buildCommonUI();

                } else {
                    $('header.header').vcHeader(); //헤더 모듈 적용...
                    //$('footer').vcFooter();
                    $('footer:not(.pop-footer)').vcFooter();

                    $('body').buildCommonUI();
                }
                
    
                $.holdReady(false); // ready함수 실행을 허용(이전에 등록된건 실행해준다.)
    
                // 모달이 열렸을 때 페이지 스크롤을 막기 위함 ////////////////////////////
                $doc.on('modalfirstopen modallastclose', function (e) {
    
                }).on('modalshown', function (e) {
                    // 모달이 뜰때 모달내부에 있는 공통 컴포넌트 빌드
                    $(e.target).buildCommonUI();
                    self.resetFlexibleBox();
                });
                //////////////////////////////////////////////////////////////////////
    
                // 아코디온이 펼쳐지거나 닫힐 때 레이아웃 사이즈가 변하기 때문에 resize이벤트를 강제로 발생시킨다.
                // $doc.on('accordionexpand accordioncollapse', vcui.delayRun(function (e) {
                //     $(window).triggerHandler('resize');
                // }, 200));
                ///////////////////////////////////////////////////////////////////////

                
                //공통 js-pop a태그 처리...
                $doc.off('click.jsPop').on('click.jsPop', '.js-popup', function(e){
                    e.preventDefault();

                    var target = this.getAttribute('href'),
                        popupWidth = parseInt(this.getAttribute('data-width')),
                        popupHeight = parseInt(this.getAttribute('data-height')),
                        screenWidth = parseInt(screen.width),
                        screenHeight = parseInt(screen.height),
                        intLeft = Math.floor((screenWidth - popupWidth) / 2),
                        intTop = Math.floor((screenHeight - popupHeight) / 2);
            
                    if (intLeft < 0) intLeft = 0;
                    if (intTop < 0) intTop = 0;
            
                    window.open(target, '_blank', 'width=' + popupWidth + ',height=' + popupHeight + ',left=' + intLeft + ',top=' + intTop + ',history=no,resizable=no,status=no,scrollbars=yes,menubar=no');
                });

                // BTOCSITE-3536
                /**
                 *   a 태그 속성에 data-go-url 추가하여 사용하세요
                 *  - 모바일 브라우져 동작시 target 설정값이 '_blank' => window.open '_self' 이거나 미설정시 => location.href 이동
                 *  - 아래 옵션은 app 일경우만 동작 입니다.
                 *  - 옵션 : data-open-mode
                 *      미설정시 : 앱내 이동 location.href 로 이동 시킵니다.
                 *      inAppBrowser : inAppBrowser 로 뛰움
                 *      outlink  : ios , android 외부 브라우저로 뛰움
                 *    <샘플>
                 *    <a data-go-url data-open-mode="outlink" href="https://www.lge.co.kr/story/user-guide/objetcollection-change-panel-guide">자세히 보기</a>
                 * 
                 */
                $doc.off('click.goUrl').on('click.goUrl', '[data-go-url]', function(e){
                    e.preventDefault();
                    lgkorUI.goUrl(this);             
                });

                $('.toast-message').remove();
                $('body').append('<div class="toast-message"></div>');
                $('.toast-message').vcToast();
            });

            vcui.require([
                'helper/breakpointDispatcher'
            ], function (BreakpointDispatcher) {
                new BreakpointDispatcher({
                    matches: {
                        '(min-width: 768px)' : function(mq) {
                            var data;
                            if (mq.matches) {
                                // pc
                                data = {
                                    name: 'pc',
                                    min: 768,
                                    max: 999999,
                                    isMobile: false,
                                    isPc: true,
                                    prev: window.breakpoint || {}
                                };
                                
                            } else {
                                // mobile
                                data = {
                                    name: 'mobile',
                                    min: 0,
                                    max: 767,
                                    isMobile: true,
                                    isPc: false,
                                    prev: window.breakpoint || {}
                                };
                            }
    
                            window.breakpoint = data;
                            $(window).data('breakpoint', data).trigger('breakpointchange', data);
                        }
    
                        /* 
                        '(min-width : 769px) and (max-width : 1599px)' : function(mq){
                        },
                        '(min-width : 1600px)' : function(mq){
                        } 
                        */
                    }
                }).start();
            });

            self.loadKakaoSdkForShare();
        },

        //top 버튼 컨틀롤...
        _addTopButtonCtrl: function(){
            var self = this;
            $(window).scroll(function(){
                if(self.scrollTimer) {
                    clearTimeout(self.scrollTimer);
                }
                self.scrollTimer = setTimeout(function(){
                    if ($(this).scrollTop() > 100) {
                        $(window).trigger('floatingTopShow');
                        $('.floating-menu.top').removeClass('call-yet');
                    } else {
                        $(window).trigger('floatingTopHide');
                        $('.floating-menu.top').addClass('call-yet');
                    }
                }, 200);
            });
            
            $('.back-to-top button').on('click', function (e) {
                e.preventDefault();
                $(window).trigger('floatingTop');
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            });
        },

        _switchLinker: function(){
            $('body').find('a[data-pc-href]').each(function(idx, item){
                var href = vcui.detect.isMobileDevice ? $(item).data("mHref") : $(item).data("pcHref");
                $(item).attr('href', href);
            });
        },

        //에러 페이지 되돌아가기
        _bindErrBackEvent: function(){
            var self = this;

            $('body').find('.contents.error-page .btns a').on('click', function(e){
                e.preventDefault();

                self._historyBack();
            })
        },

        _historyBack: function(){
            var self = this;
            
            var referrer = document.referrer;
            var index = -1;
            var leng = lgkorUI.DOMAIN_LIST.length;
            for(var i=0;i<leng;i++){
                index = referrer.indexOf(lgkorUI.DOMAIN_LIST[i]);
                if(index > -1){
                    break;
                }
            }

            // BTOCSITE-3536 앱이고 파라메타에 openInApp 있는경우 closeInAppBrowser 실행
            if(isApp() &&  lgkorUI.getParameterByName('openMode') === 'inAppBrowser') {
                if(vcui.detect.isIOS){ 
                    var jsonString = JSON.stringify({'command':'closeInAppBrowser'});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                 }else{
                     android.closeNewWebview(); 
                 }
            } else {
                if(index < 0) location.href = "/";
                else history.back();
            }
        },

        resetFlexibleBox: function(){
            //리스트 height 재설정
            $('body').find('.ui_flexible_height').each(function(idx, item){
                var maxheight = 0;
                $(item).children().each(function(cdx, child){
                    var flexiblebox = $(child).find('.ui_flexible_box .ui_flexible_cont');
                    maxheight = Math.max(maxheight, flexiblebox.outerHeight(true));
                });

                $(item).find('.ui_flexible_box').height(maxheight);
            });
        },

        showLoading:function(msg, target){
            vcui.require(['ui/spinner'],function(){
                var str = msg? msg : '진행중입니다';
                var $target = target instanceof $ ? target : $(target);

                if($target[0]){
                    $target.vcSpinner({msg:str, position:'absolute'}).vcSpinner('spin'); 
                }else{
                    // $('html').addClass('dim');
                    $('body').append("<div class='loading_dim' style='position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.3);z-index:199999999'></div>")
                    $('body').vcSpinner({msg:str, position:'fixed'}).vcSpinner('spin'); 
                }
                
            }); 
        },

    
        hideLoading:function(target){
            vcui.require(['ui/spinner'],function(){

                var $target = target instanceof $ ? target : $(target);

                if($target[0]){
                    $target.vcSpinner('stop');
                }else{
                    $('.loading_dim').remove();
                    // $('html').removeClass('dim');
                    $('body').vcSpinner('stop');
                }
                
            });
        },

        confirm:function () {
            /**
             * 얼럿레이어
             * @memberOf vcui.ui
             * @name confirm
             * @function
             * @param {string} msg 얼럿 메세지
             * @param {Object} options 모달 옵션
             * @param {Element} opener 포커스 타겟
             * @example
             * lgkorUI.confirm('받은 알림을 전체삭제<br>하시겠습니까?', {                        
                ok:function(){},
                cancel:function(){}
                });
             */
            return function (msg, options, opener) {
            
                if (typeof msg !== 'string' && arguments.length === 0) {
                    options = msg;
                    msg = '';
                }
    
                var callbackOk, callbackCancel;
    
                if(options && options.ok && typeof options.ok =='function'){
                    callbackOk = options.ok;
                    delete options['ok'];
                } 
                if(options && options.cancel && typeof options.cancel =='function'){ 
                    callbackCancel = options.cancel;
                    delete options['cancel'];
                }
    
                $('html').addClass('dim');
                var tmplObj = {
                    cancelBtnName:options && options.cancelBtnName? options.cancelBtnName:'취소' ,
                    okBtnName:options && options.okBtnName? options.okBtnName:'확인' ,
                    typeClass:options && options.typeClass? options.typeClass:'' ,
                    title:options && options.title? options.title:''
                }
                var el = $(vcui.template(confirmTmpl, tmplObj)).appendTo('body');
                if(tmplObj.title) $(el).find('.lay-conts.ui-alert-msg').html(msg), $(el).find('.lay-conts:not(.ui-alert-msg)').remove();
                else $(el).find('.lay-conts h6.ui-alert-msg').html(msg), $(el).find('.lay-conts.ui-alert-msg').remove();
                

                var modal = $(el).vcModal(vcui.extend({ removeOnClose: true, variableHeight:true, variableWidth:true, isHash:false, alertType:true, opener:opener}, options)).vcModal('instance');
                modal.getElement().buildCommonUI();
                modal.on('modalhidden modalok modalcancel', function (e) {    
                    if(e.type =='modalok'){
                        if(callbackOk) callbackOk.call(this, e);
                    }else if(e.type == 'modalcancel'){
                        if(callbackCancel) callbackCancel.call(this, e);
                    }    
                    $('html').removeClass('dim');
                    el = null;
                    modal = null;
                });
                return modal;
            };
        }(),
    
        alert:function () {
            /**
             * 얼럿레이어
             * @memberOf vcui.ui
             * @name alert
             * @function
             * @param {string} msg 얼럿 메세지
             * @param {Object} options 모달 옵션
             * @param {Element} opener 포커스 타겟
             * @example
             * lgkorUI.alert('<p>구매일자 : 2020. 06. 18</p><p>구매제품 : 얼음정수기냉장고</p>', {
                 title:'영수증 등록이 완료되었습니다.',
                 ok:function(){}
                }, this);
             *  
             */
    
            return function (msg, options, opener) {
                if (typeof msg !== 'string' && arguments.length === 0) {
                    options = msg;
                    msg = '';
                }
    
                var callbackOk;
    
                if(options && options.ok && typeof options.ok =='function'){
                    callbackOk = options.ok;
                    delete options['ok'];
                } 
    
                $('html').addClass('dim');
    
                var el = $(vcui.template(alertTmpl, {
                    okBtnName:options && options.okBtnName? options.okBtnName:'확인' ,
                    typeClass:options && options.typeClass? options.typeClass:'' ,
                    title:options && options.title? options.title:''
                })).appendTo('body');
                $(el).find('.ui-alert-msg').html(msg);                

                var modal = $(el).vcModal(vcui.extend({ removeOnClose: true, variableHeight:true, variableWidth:true ,isHash:false, alertType:true, opener:opener}, options)).vcModal('instance');
                modal.getElement().buildCommonUI();
                modal.on('modalhidden modalok', function (e) {
    
                    if(e.type =='modalok'){
                        if(callbackOk) callbackOk.call(this, e);
                    }
                    $('html').removeClass('dim');
                    el = null;
                    modal = null;
                });
                return modal;
            };   
            
        }(),

        getCompareLimit: function(){
            return window.breakpoint.isMobile ? 2 : 3;
        },

        addCompareProd: function(categoryId, data){
            var self = this;
            
            var compareLimit = self.getCompareLimit();

            var compareStorage = self.getStorage(self.COMPARE_KEY);
            if(compareStorage[categoryId] == undefined){
                var categoryName = lgkorUI.getHiddenInputData().categoryName;
                compareStorage[categoryId] = { 'categoryName' : categoryName,'data' : [data]};

                if(compareStorage[categoryId]['data'].length === 1){
                    // 비교하기 첫제품 추가시 토스트 메시지
                    $(window).trigger("toastshow", "선택하신 제품과 함께 비교할 수 있는 제품만 비교하기 버튼이 보여집니다");

                    // 비교하기 버튼 상태 변경
                    if($('.KRP0007').size() > 0) {
                        $('.KRP0007 a[data-b2bcatemapping]').removeAttr('style')
                        .parent().find('a[data-b2bcatemapping="'+(data.b2bcatemapping === 'Y' ? 'N' : 'Y')+'"]').hide();
                    }

                }

            } else{
                var leng = compareStorage[categoryId]['data'].length;
                if(leng < compareLimit){
                    compareStorage[categoryId]['data'].push(data);
                } else{
                    $(window).trigger('excessiveCompareStorage');
                    return false;
                }
            }

            // 세션스토리지에서 비교하기 데이터 전체 비교
            var prod_compare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
            if(prod_compare.hasOwnProperty(categoryId) && prod_compare[categoryId].data.length) {
                var cateMapCheck = true;
                prod_compare[categoryId].data.forEach(function(item) {
                    if(item.b2bcatemapping !== data.b2bcatemapping) {
                        cateMapCheck = false;
                        return false;
                    }
                });

                if(!cateMapCheck) {
                    console.log("비교하기가 불가능한 제품을 선택했습니다. 다른 제품을 선택해주세요.");
                    return false;
                }
            }
            self.setStorage(self.COMPARE_KEY, compareStorage, true);

            return true;
        },

        removeCompareProd: function(categoryId, id){
            var self = this;

            if(id) {
                var compareStorage = self.getStorage(self.COMPARE_KEY);
                compareStorage[categoryId]['data'] = vcui.array.filter(compareStorage[categoryId]['data'], function(item){
                    return item['id'] != id;
                });

                if(compareStorage[categoryId]['data'].length == 0) {
                    self.removeStorage(self.COMPARE_KEY, categoryId);

                    // PLP 비교하기 버튼 리셋
                    if($('.KRP0007').size() > 0) {
                        $('.KRP0007 a[data-b2bcatemapping]').removeAttr('style');
                    }
                    
                    // PDP 비교하기 아이템 삭제시 버튼 상태 변경
                    if($('.KRP0008').size() > 0) {
                        $('.KRP0008 .product-compare').removeAttr('style');
                    }

                } else {
                    var data = {};
                        data[categoryId] = compareStorage[categoryId];
                    self.setStorage(self.COMPARE_KEY, data, true, categoryId);
                }
                
            } else {
                // self.initCompareProd(categoryId);
                self.removeStorage(self.COMPARE_KEY, categoryId);

                // 비교하기 버튼 리셋
                if($('.KRP0007').size() > 0) {
                    $('.KRP0007 a[data-b2bcatemapping]').removeAttr('style');
                }

                // PDP 비교하기 아이템 삭제시 버튼 상태 변경
                if($('.KRP0008').size() > 0) {
                    console.log("ppd 비교하기 아이템 삭제시 222 ")
                    // $('.KRP0008 .product-compare input[type=checkbox]').removeAttr('disabled');
                    $('.KRP0008 .product-compare').removeAttr('style');
                }
            }
        },

        // initCompareProd: function(categoryId){
        //     var self = this;
            
        //     self.removeStorage(self.COMPARE_KEY, categoryId);
        //     // 비교하기 버튼 리셋
        //     $('.KRP0007 a[data-b2bcatemapping]').removeAttr('style');
        // },

        setCompapreCookie: function(categoryId){
            var self = this;
            var compareIDs = [];
            var compareStorage = self.getStorage(self.COMPARE_KEY, categoryId);
                compareStorage['data'].forEach(function(item){ compareIDs.push(item.id); });
            var compareCookie = compareIDs.join("|");

            self.setCookie(self.COMPARE_COOKIE_NAME, compareCookie);
        },

        addEqualCompare: function(ids, url){
            var self = this;

            self.setCookie(self.COMPARE_COOKIE_NAME, ids);

            location.href = url;
        },

        setStorage: function(key, value, isExtend, name){
            var storage = sessionStorage.getItem(key);
            var storageData = storage? JSON.parse(storage) : {};   
            var data = { 'state' : 'set', 'key' : key, 'value' : value };     
            //Internet Explorer 불가
            //storageData = Object.assign(storageData, value);
            if(isExtend) {
                $.extend(storageData, value);
            } else {
                storageData = value;
            }
            sessionStorage.setItem(key, JSON.stringify(storageData));
            if(name) data = $.extend(data, { 'name' : name});
            $(window).trigger(jQuery.Event("changeStorageData", data));

            return storageData;
        },

        getStorage: function(key, name){							
            var storage = sessionStorage.getItem(key); 
            if(name){							
                var storageData = storage? JSON.parse(storage) : {}; 						
                return storageData[name];
            }else{
                return storage? JSON.parse(storage) : {};
            }   
        },

        removeStorage: function(key, name){    
            var data = {};
            var returnValue;
            var data = {  'state' : 'remove', 'key' : key  }
            if(name){
                var storage = sessionStorage.getItem(key);
                var storageData = storage? JSON.parse(storage) : {}; 		
                delete storageData[name];						
                sessionStorage.setItem(key, JSON.stringify(storageData)); 
                returnValue =  storageData;
                data = $.extend(data, { 'name' : name});
            }else{
                sessionStorage.removeItem(key);
                returnValue =  null;
                data = {  'state' : 'remove', 'key' : key  }
            }
            
            $(window).trigger(jQuery.Event("changeStorageData", data));

            console.log("removeStorage data %o",data)
            
            $(window).trigger(jQuery.Event("changeStorageData", data));
           
            return returnValue;
        },

        //만료기간을 가진 스토리지 저장
        setExipreStorage: function(key, value, expireTime){
            var storage = sessionStorage.getItem(key);
            var storageData = storage? JSON.parse(storage) : {};        
            //Internet Explorer 불가
            //storageData = Object.assign(storageData, value);

            var cookieExpire = new Date();
            cookieExpire.setDate(cookieExpire.getDate() + days);
            var expireDateString = vcui.date.format(cookieExpire,'yyyyMMddhhmmss');

            value += ("&&&" + expireDateString);

            $.extend(storageData, value);
            sessionStorage.setItem(key, JSON.stringify(storageData));
            
            //$(window).trigger("changeStorageData");

            return storageData;
        },

        getExipreStorage: function(key){							
            var storage = sessionStorage.getItem(key); 
            if(storage){
                var i = JSON.parse(storage);
                
                var index = !i ? -1 : i.indexOf("&&&");
                if(index != -1) {
                    var checkExpire = new Date();

                    var arr = i.split('&&&');
                    if(arr.length > 1) {
                        var value = arr[0];
                        var date = arr[1];

                        var year = date.substring(0, 4);
                        var month = date.substring(4, 6);
                        var day = date.substring(6, 8);
                        var hour = date.substring(8, 10);
                        var minute = date.substring(10, 12);
                        var second = date.substring(12, 14);
                        var expire = new Date(year, month-1, day, hour, minute, second);
                        var res = vcui.date.compare(checkExpire,expire);
                        if(res != 1) {
                            //날짜 지남
                            self.removeStorage(key,null);
                            return null;
                        } else {
                            return value;
                        }
                     } else {
                         return i;
                     }
                }
            } else {
                return null;
            }
        },

        //lgkorUI.setCookie('','', false, 1);

        //쿠키
        setCookie: function(cookieName, cookieValue, deleteCookie, expireDay) {
            var cookieExpire = new Date();
            if(deleteCookie) {
                cookieExpire = new Date(1);
            } else {
                var days = expireDay? expireDay : 30*6;
                cookieExpire.setDate(cookieExpire.getDate() + days);
            }

            var cookiePath = null;
            var cookieDomain = null;
            var cookieSecure = false;

            var cookieText = escape(cookieName) + '=' + escape(cookieValue);
            cookieText += (cookieExpire ? ('; EXPIRES='+cookieExpire.toUTCString()) : '');
            cookieText += '; PATH=/';/*(cookiePath ? ('; PATH='+cookiePath) : '')*/;
            cookieText += (cookieDomain ? ('; DOMAIN='+cookieDomain) : '');
            cookieText += (cookieSecure ? '; SECURE' : '');

            document.cookie = cookieText;
        },

        getCookie: function(cookieName, getRealValue){
            var self = this;
            var cookieValue = null;
            if(document.cookie){
                var cookieKey = escape(cookieName) + "="; 
                var cookieArr = document.cookie.split(";");
                
                for(var i = 0; i < cookieArr.length; i++) {
                    if(cookieArr[i][0] === " ") {
                        cookieArr[i] = unescape(cookieArr[i].substring(1));
                    }
                    if(cookieArr[i].indexOf(cookieKey) === 0) {
                        cookieValue = unescape(cookieArr[i].slice(cookieKey.length, cookieArr[i].length));
                    }
                }
    /*
                var array = document.cookie.split((escape(cookieName)+'='));
                console.log(array);
                if(array.length >= 2){
                    var arraySub = array[1].split(';');
                    cookieValue = unescape(arraySub[0]);
                }
                */
            }

            var index = !cookieValue ? -1 : cookieValue.indexOf("&&&");
            if(index != -1) {
                //array
                var checkExpire = new Date();
                var itemArray = cookieValue.split('|');
                var valueArray = [];
                var resultArray = [];
                itemArray.forEach(function (i, index) {
                    var arr = i.split('&&&');
                    if(arr.length > 1) {
                        var value = arr[0];
                        var date = arr[1];

                        var year = date.substring(0, 4);
                        var month = date.substring(4, 6);
                        var day = date.substring(6, 8);
                        var hour = date.substring(8, 10);
                        var minute = date.substring(10, 12);
                        var second = date.substring(12, 14);
                        var expire = new Date(year, month-1, day, hour, minute, second);
                        var res = vcui.date.compare(checkExpire,expire);
                        if(res != 1) {
                            //날짜 지남
                            //console.log('날짜지남',value);
                        } else {
                            valueArray.push(value);
                            resultArray.push(i);
                        }
                    } else {
                        valueArray.push(value);
                        resultArray.push(i);
                    }
                });
                if(resultArray.length != itemArray.length) {
                    self.setCookie(cookieName, resultArray.join('|'));
                }
                cookieValue = (getRealValue) ? resultArray.join('|') : valueArray.join('|');
            }
            return cookieValue;
        },

        deleteCookie: function(cookieName){
            var self = this;
            var temp = self.getCookie(cookieName, true);
            if(temp){
                self.setCookie(cookieName,temp,true);
            }
        },

        addCookieArrayValue: function(cookieName, addData, maxLength, expireDay) {
            var self = this;
            var items = self.getCookie(cookieName, true); // 이미 저장된 값을 쿠키에서 가져오기
            var itemArray = [];
            if(items) {
                itemArray = items.split('|');
                //겹치는 값 제거
                var findIndex = -1;
                for(var n=0;n<itemArray.length;n++) {
                    var value = itemArray[n];
                    var arr = value.split('&&&');
                    if(arr.length > 1) {
                        value = arr[0];
                    }
                    if(value == addData) {
                        findIndex = n;
                        break;
                    }
                };
                if(findIndex != -1) {
                    itemArray.splice(findIndex, 1);
                }
            }

            //값 새로 저장
            var days = expireDay? expireDay : 30*6;
            var cookieExpire = new Date();
            cookieExpire.setDate(cookieExpire.getDate() + days);
            var expireDateString = vcui.date.format(cookieExpire,'yyyyMMddhhmmss');

            addData += ("&&&" + expireDateString);

            itemArray.unshift(addData);
            itemArray = itemArray.slice(0,maxLength);

            items = itemArray.join('|');
            self.setCookie(cookieName, items, false, expireDay);

            /*
            console.log('saved',itemArray.length);
            var test = self.getCookie(cookieName);
            var searchedList = test.split('|');
            console.log(searchedList);
            */
        },

        removeCookieArrayValue: function(cookieName, removeData) {
            var self = this;
            var items = self.getCookie(cookieName, true); // 이미 저장된 값을 쿠키에서 가져오기
            var itemArray = [];
            if(items) {
                itemArray = items.split('|');
                var findIndex = -1;
                for(var n=0;n<itemArray.length;n++) {
                    var value = itemArray[n];
                    var arr = value.split('&&&');
                    if(arr.length > 1) {
                        value = arr[0];
                    }
                    if(value == removeData) {
                        findIndex = n;
                        break;
                    }
                };
                if(findIndex != -1) {
                    itemArray.splice(findIndex, 1);
                    items = itemArray.join('|');
                    self.setCookie(cookieName, items);
                }
            }
        },

        loadKakaoSdkForShare: function(callback){
            var self = this;

            if(window.kakao){
                if(callback != null) callback();
            }else{
                var script = document.createElement('script');
        
                script.onload = function () {
                    if(callback != null){
                        callback();
                        return;
                    }
                    self.loadCommonShareUI();
                };
                script.onerror = function(e){ 
                    //alert('kakao api를 로드할수 없습니다.');
                    console.log('kakao api를 로드할수 없습니다.');
                }
                script.src = '//developers.kakao.com/sdk/js/kakao.min.js';        
                document.head.appendChild(script); 
            }
        },

        loadCommonShareUI: function(){
            vcui.require([
                'helper/sharer'
            ], function (Sharer) {
                // 공유하기 헬퍼 빌드
                Sharer.init({
                    selector: '.sns-list > li >  a',
                    attr: 'data-link-name' // sns서비스명을 가져올 속성
                });
            });
        },

        requestAjaxData: function(url, data, callback, type, dataType, ignoreCommonSuccessCheck, timeout, ignoreCommonLoadingHide, failCallback) {
            var self = this;
            var dtype = dataType? dataType : "json";
            var timelimit = timeout ? timeout : 15000;
            $.ajax({
                type : type? type : "GET",
                url : url,
                dataType : dtype,
                data : data,
                timeout : timelimit
            }).done(function (result) {
                if(!ignoreCommonLoadingHide) lgkorUI.hideLoading();

                if(dtype != "json") {
                    if(callback && typeof callback === 'function') callback(result);
                    return;
                }

                if(result.ssoCheckUrl != undefined && result.ssoCheckUrl != null && result.ssoCheckUrl != ""){
                    location.reload();                
                    return;
                }
                
                if(dtype == 'json' && result.status != 'success'){
                    //alert(result.message ? result.message : '오류발생');
                    if(ignoreCommonSuccessCheck) {
                        var data = result.data;
                        if(data && !Array.isArray(data) && typeof data === 'object') {
                            if(!data.success && !(typeof(data.success) === "boolean")) {
                                result.data.success = "N";
                            }
                        } else {
                            //     if(result.message) {
                            //         lgkorUI.alert("", {
                            //             title: result.message
                            //         });
                            //         //result.message = null;
                            //     }
                            //result.data = {"success" : "N"};
                            if(data && !data.success && !(typeof(data.success) === "boolean")) {
                                result.data.success = "N";
                            }
                        }
                        if(callback && typeof callback === 'function') callback(result); 
                    } else {
                        var data = result.data;
                        if(data && data.alert && !vcui.isEmpty(data.alert)) {
                            lgkorUI.alert("", {
                                title: data.alert.title
                            });
                        } else {
                            if(result.message) {
                                lgkorUI.alert("", {
                                    title: result.message
                                });
                            }
                        }
                        if(failCallback && typeof failCallback === 'function') failCallback();
                    }
                    return;
                }

                if(ignoreCommonSuccessCheck) {
                    var data = result.data;
                    if(data && !Array.isArray(data) && typeof data === 'object') {
                        if(!data.success && !(typeof(data.success) === "boolean")) {
                            result.data.success = "Y";
                        }
                    }
                    if(callback && typeof callback === 'function') callback(result); 
                } else {
                    var data = result.data;
                    //success가 비어 있으면 성공(Y) 라 친다
                    if(data && !Array.isArray(data) && typeof data === 'object') {
                        if(!data.success && !(typeof(data.success) === "boolean")) {
                            result.data.success = "Y";
                        }
                    }
                    /*
                    if(!data.success && !(typeof(data.success) === "boolean")) {
                        data.success = "Y";
                    }
                    */
                    if(data && !self.stringToBool(data.success) && data.alert) {
                        //에러
                        if(data && data.alert && !vcui.isEmpty(data.alert)) {
                            self.commonAlertHandler(data.alert);
                        }/* else {
                            if(result.message) {
                                lgkorUI.alert("", {
                                    title: result.message
                                });
                            }
                        }*/
                    } else {
                        if(callback && typeof callback === 'function') callback(result);
                    } 
                }                
            }).fail(function(err){
                //alert(url, err.message);
                if(!ignoreCommonLoadingHide) lgkorUI.hideLoading();
                if(failCallback && typeof failCallback === 'function') failCallback(err);

            });
        },

        requestAjaxDataFailCheck: function(url, data, successCallback, failCallback) {
            var self = this;
            self.requestAjaxData(url, data, successCallback, null, null, null, null, null, failCallback);
        },
        
        requestAjaxDataIgnoreCommonSuccessCheck: function(url, data, callback, type, dataType) {
            var self = this;
            self.requestAjaxData(url, data, callback, type, dataType, true);
        },

        requestAjaxDataAddTimeout: function(url, timeout, data, callback, type, dataType, ignoreCommonSuccessCheck){
            var self = this;
            self.requestAjaxData(url, data, callback, type, dataType, ignoreCommonSuccessCheck, timeout);
        },

        requestAjaxDataPost: function(url, data, callback, ignoreCommonSuccessCheck, ignoreCommonLoadingHide) {
            var self = this;
            self.requestAjaxData(url, data, callback, "POST", null, ignoreCommonSuccessCheck, null, ignoreCommonLoadingHide);
        },

        requestAjaxFileData: function(url, data, callback, type, dataType, ignoreCommonSuccessCheck, failcallback) {
            //BTCOSITE-6032 : failcallback  추가
            var self = this;
            var dtype = dataType? dataType : "json";
            $.ajax({
                type : type? type : "GET",
                url : url,
                dataType : dtype,
                data : data,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false
            }).done(function (result) {
                
                if(result.ssoCheckUrl != undefined && result.ssoCheckUrl != null && result.ssoCheckUrl != ""){
                    location.reload();                
                    return;
                }
                
                if(dtype == 'json' && result.status != 'success'){
                    //alert(result.message ? result.message : '오류발생');
                    console.log('resultStatusFail',url,result);
                    return;
                }

                if(ignoreCommonSuccessCheck) {
                    if(callback && typeof callback === 'function') callback(result); 
                } else {
                    var data = result.data;
                    //success가 비어 있으면 성공(Y) 라 친다
                    if(!data.success && !(typeof(data.success) === "boolean")) {
                        data.success = "Y";
                    }
                    if(data && !self.stringToBool(data.success) && data.alert) {
                        //에러
                        self.commonAlertHandler(data.alert);
                    } else {
                        if(callback && typeof callback === 'function') callback(result);
                    } 
                }   
            }).fail(function(err){
                //alert(url, err.message);
                console.log('ajaxFail',url,err);
                //failcallback 추가
                if( failcallback) {
                    failcallback();
                }
            });
        },

        requestCartCount: function(ajaxUrl) {

            lgkorUI.requestAjaxDataPost(ajaxUrl, null, function(result){
                var data = result.data;
                if(lgkorUI.stringToBool(data.success)) {
                    var cartCnt = data.cartCnt ? ((typeof data.cartCnt  === 'number') ? data.cartCnt : parseInt(data.cartCnt)) : 0;
                    var utility = $('div.header-wrap div.utility');
                    utility.find('.cart span.count').remove();
                    if(cartCnt == 0) {
                        //제거
                    } else if(cartCnt > 99) {
                        //99개 넘음
                        utility.find('.cart').append('<span class="count"><span class="blind">장바구니 제품 수</span>99+</span>');
                    } else {
                        //NN
                        utility.find('.cart').append('<span class="count"><span class="blind">장바구니 제품 수</span>' + cartCnt + '</span>');
                    }

                    $('.header-wrap .header-top .utility .cart a').attr('href', data.cartUrl);
                }
            }, true, true);
        },

        requestCart: function(ajaxUrl, param, isToast) {
            lgkorUI.showLoading();
            isToast = !(isToast) ? true : isToast;
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                var data = result.data;
                var typeFlag = self.$('.btn-cart').attr('data-type-flag'); //(PLP) BTOCSITE-10576 [사용자행태분석 개선사항] 장바구니 이동 경로 제공 / 품절 관련 무효클릭 및 안내 개선
                var pdpInfo = self.$('.product-detail-info'); //(PDP) BTOCSITE-10576 [사용자행태분석 개선사항] 장바구니 이동 경로 제공 / 품절 관련 무효클릭 및 안내 개선
                var wishTypeFlag = self.$('.info-tbl-wrap .box').attr('data-typeflag'); //(찜/최근) BTOCSITE-10576 [사용자행태분석 개선사항] 장바구니 이동 경로 제공 / 품절 관련 무효클릭 및 안내 개선

                if(data && lgkorUI.stringToBool(data.success)) {
                    var cartCnt = data.cartCnt ? ((typeof data.cartCnt  === 'number') ? data.cartCnt : parseInt(data.cartCnt)) : 0;
                    var utility = $('div.header-wrap div.utility');
                    utility.find('.cart span.count').remove();
                    if(cartCnt == 0) {
                        //제거
                    } else if(cartCnt > 99) {
                        //99개 넘음
                        utility.find('.cart').append('<span class="count"><span class="blind">장바구니 제품 수</span>99+</span>');
                    } else {
                        //NN
                        utility.find('.cart').append('<span class="count"><span class="blind">장바구니 제품 수</span>' + cartCnt + '</span>');
                    }
                    
                    $('.header-wrap .header-top .utility .cart a').attr('href', data.cartUrl);
                    
                    if(typeof fbq !== 'undefined') fbq('track', 'AddToCart'); //BTOCSITE-10872 페이스북 픽셀
                    if(isToast && lgkorUI.stringToBool(data.success)) {
                        $(window).trigger("toastshow", "선택하신 제품을 장바구니에 담았습니다.");
                        /* BTOCSITE-10576 [사용자행태분석 개선사항] 장바구니 이동 경로 제공 / 품절 관련 무효클릭 및 안내 개선 */
                        if( typeFlag == "CARESOLUTION" || pdpInfo.hasClass('rental') || wishTypeFlag == "A" ){
                            console.log('CARESOLUTION')
                            $('.toast-text').append('<br><a href="/add-to-cart/rental-care-solution" class="btn-link white sm">장바구니 이동하기</a>'); 
                        }else{
                            console.log('product')
                            $('.toast-text').append('<br><a href="/shop/checkout/cart/index/" class="btn-link white sm">장바구니 이동하기</a>');
                        }
                        /* //BTOCSITE-10576 [사용자행태분석 개선사항] 장바구니 이동 경로 제공 / 품절 관련 무효클릭 및 안내 개선 */
                    }
                } else {
                    if(data && data.alert && !vcui.isEmpty(data.alert)) {
                        if(isToast) {
                            $(window).trigger("toastshow",data.alert.title);
                        } else {
                            lgkorUI.alert("", {
                                title: data.alert.title
                            });
                        }
                    } else {
                        if(result.message) {
                            lgkorUI.alert("", {
                                title: result.message
                            });
                        }
                    }
                }
            }, true);
        },

        requestWish: function(param, wish, callbackSuccess, callbackFail, postUrl, opener) {
            console.log("opener:", opener)
            lgkorUI.showLoading();
            var self = this;
            param.wish = wish;
            lgkorUI.requestAjaxDataPost(postUrl, param, function(result){
                var data = result.data;
                if(data && lgkorUI.stringToBool(data.success)) {
                    if(wish) {
                        $(window).trigger("toastshow","선택하신 제품이 찜한 제품에 추가되었습니다.");
                    } else{
                        $(window).trigger("toastshow","찜한 제품 설정이 해제되었습니다.");
                    }
                    if(data.data && data.data.listData && data.data.listData.length > 0) {
                        callbackSuccess(data.data.listData[0]);
                    } else {
                        callbackSuccess({wishItemId:null});
                    }
                } else {
                    callbackFail(data);
                    if(data && data.alert && !vcui.isEmpty(data.alert)) {
                        if(data.alert.isConfirm && data.alert.okUrl) {
                            data.alert.okUrl = data.alert.okUrl + location.href;
                        }
                        self.commonAlertHandler(data.alert, opener);
                        /*
                        lgkorUI.alert("", {
                            title: data.alert.title
                        });
                        */
                    } else {
                        if(result.message) {
                            lgkorUI.alert("", {
                                title: result.message
                            }, opener);
                        }
                    }
                }
            }, true);
        },

        commonAlertHandler: function(alert, opener){
            if(!alert) {
                return;
            }
            var isConfirm = lgkorUI.stringToBool(alert.isConfirm);
            if(isConfirm) {
                //컨펌
                var obj ={title: alert.title,
                    typeClass: '',
                    cancelBtnName: alert.cancelBtnName ? alert.cancelBtnName : "취소",
                    okBtnName: alert.okBtnName ? alert.okBtnName : "확인",
                    ok: alert.okUrl ? function (){
                        location.href = alert.okUrl;
                    } : function (){},
                    cancel: alert.cancelUrl ? function (){
                        location.href = alert.cancelUrl;
                    } : function (){}
                };
    
                var desc = alert.desc ? alert.desc : null;
                if(alert.title && alert.desc) {
                    obj.typeClass = 'type2'
                }
                lgkorUI.confirm(desc, obj, opener);
            } else {
                //알림
                var obj ={title: alert.title,
                    typeClass: '',
                    okBtnName: alert.okBtnName ? alert.okBtnName : "확인",
                    ok: function (){}
                };
    
                var desc = alert.desc ? alert.desc : null;
                if(desc) {
                    obj.typeClass = 'type2'
                }
                lgkorUI.alert(desc, obj, opener);
            }
        },

        isString: function(value) {
            return typeof value === 'string' || value instanceof String;
        },

        stringToBool: function(str, returnNull) {
            if(!str) {
                return !(!returnNull);
            }
            if(typeof str === 'boolean') {
                return str;
            }
            if(str && (typeof str === 'string' || str instanceof String)) {
                var s = str.trim().toLowerCase();
                return (s == 'y' || s == 'yes' || s == 'true');
            }
            return str;
        },

        getHiddenInputData: function(iptname, wrapname, index){
            var hiddenWrapName = wrapname || "hidden-input-group";
            var hiddenIndex = index || "0";
            var hiddenWrap = $('.' + hiddenWrapName).eq(hiddenIndex);
            var data, str, name;

            if(iptname){
                if(vcui.isArray(iptname)){
                    data = {};
                    for(str in iptname){
                        name = iptname[str];
                        data[name] = hiddenWrap.find('input[name=' + name + ']').val();
                    }

                    return data;
                } else{
                    return hiddenWrap.find('input[name=' + iptname + ']').val();
                }
            } else{
                data = {};
                hiddenWrap.find('input[type=hidden]').each(function(idx, item){
                    name = $(item).attr('name');
                    data[name] = $(item).val();
                });

                return data;
            }
        },

        setHiddenInputData: function(iptname, value, wrapname, index){
            if(!iptname) return false;

            var hiddenWrapName = wrapname || "hidden-input-group";
            var hiddenIndex = index || "0";
            var hiddenWrap = $('.' + hiddenWrapName).eq(hiddenIndex);
            var str, val;

            if(typeof iptname === "object"){
                for(str in iptname){
                    hiddenWrap.find('input[name=' + str + ']').val(iptname[str]);
                }
            } else{
                val = vcui.isArray(value) ? value.join() : value;
                hiddenWrap.find('input[name=' + iptname + ']').val(val);
            }
        },

        addStickyModule: function(hei){
            var self = this;

            var moduleIDs = vcui.array.map(self.STICKY_MODULES, function(item){
                return item.uniqueID;
            });

            var uniqueID = self.setUniqueID();
            while(vcui.array.has(moduleIDs, uniqueID)) uniqueID = setUniqueID();

            self.STICKY_MODULES.push({
                uniqueID: uniqueID,
                moduleHeight: hei
            });

            return uniqueID;
        },

        setUniqueID: function(){
            var id = "";
            for(var i=0;i<10;i++){
                var ran = parseInt(Math.random()*10);
                id += ran.toString();
            }

            return id;
        },

        searchModelName: function(){
            var optionsTmpl =  '<option value="{{code}}">{{name}}</options>';

            var modelName = {
                options: {
                    text: '제품 카테고리를 선택하면, 해당 제품의 모델명 확인 방법을 안내해 드립니다.',
                    imgPath: '/kr/support/images/find-model/model-multi-air.jpg', //210818 BTOCSITE-4574 3in1 이미지로 변경
                    imgAlt: '모델명 및 제조번호 확인 예시 사진'
                },
                init: function() {
                    var self = this;

                    self.$modelButton = $('[data-href="#modelNamePopup"]');
                    self.$modelPopup = $('#modelNamePopup');
                    self.$category = self.$modelPopup.find('#select1');
                    self.$subCategory = self.$modelPopup.find('#select2');
                    self.$result = self.$modelPopup.find('.example-result');

                    self.searchModelNameUrl = self.$modelPopup.data('modelUrl');
                    self.searchSubCategoryUrl = self.$modelPopup.data('subCategoryUrl');

                    self.bindEvent();
                },
                setting: function() {
                    var self = this;
                    
                    self.category = self.$modelPopup.data('category');
                    self.subCategory = self.$modelPopup.data('subCategory');
                    
                    if (self.category) {
                        self.$category.find('option[value="'+self.category+'"]').prop('selected', true);
                        self.$category.vcSelectbox('update');
                        self.searchSubCategory(self.category, self.subCategory);
                        if (self.subCategory) {
                            self.searchModelName(self.category, self.subCategory);
                        }
                    } else {
                        var $resultTxt = self.$result.find('.txt'),
                            $resultImg = self.$result.find('.img img'),
                            $viewBtn = self.$result.find('.img .btn-img-view');
                        var options = self.options;

                        $resultTxt.html(options.text);
                        $resultImg.attr('src', options.imgPath);
                        $resultImg.attr('alt', options.imgAlt);
                        $viewBtn.attr('href', options.imgPath);

                        self.$category.find('option.placeholder').prop('selected', true);
                        self.$subCategory.prop('disabled', true);
                        self.$subCategory.find('option:not(.placeholder)').remove();

                        self.$category.vcSelectbox('update');
                        self.$subCategory.vcSelectbox('update');
                    }
                },
                searchSubCategory: function(category, subCategory) {
                    var self = this;
                    var subCategory = subCategory || '';
                    var param = {
                        cateSelect: category || self.$category.val()
                    };
                    
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxData(self.searchSubCategoryUrl, param, function(result) {
                        var data = result.data;
                        var html = '';

                        data.forEach(function(item) {
                            html += vcui.template(optionsTmpl, item);
                        });

                        self.$subCategory.find('option:not(.placeholder)').remove();
                        self.$subCategory.append(html).prop('disabled', false);
                        self.$subCategory.find('option[value="'+subCategory+'"]').prop('selected', true);
                        self.$subCategory.vcSelectbox('update');
                    }, 'POST');
                },
                searchModelName: function(category, subCategory) {
                    var self = this;
                    var param = {
                        category: category || self.$category.val(),
                        subCategory: subCategory || self.$subCategory.val()
                    };
                    
                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxData(self.searchModelNameUrl, param, function(result) {
                        var $resultTxt = self.$result.find('.txt'),
                            $resultImg = self.$result.find('.img img'),
                            $viewBtn = self.$result.find('.img .btn-img-view');
                        var data = result.data;
                        
                        $resultTxt.html(data.text);
                        $resultImg.attr('src', data.imgPath);
                        $resultImg.attr('alt', data.imgAlt);
                        $viewBtn.attr('href', data.imgPath);
                    }, 'POST');
                },
                bindEvent: function() {
                    var self = this;

                    self.$modelButton.on('click', function() {
                        self.setting();
                        self.$modelPopup.vcModal();
                    });

                    self.$category.on('change', function() {
                        self.searchSubCategory();
                    });

                    self.$subCategory.on('change', function() {
                        self.searchModelName();
                    });

                    self.$modelPopup.on('modalhidden', function() {
                        self.$modelButton.focus();
                    });
                }
            }

            modelName.init();
        },

        addLimitedInputEvent: function(ipt){
            ipt.on('input', function(){
                var maxleng = $(this).prop('maxlength');
                var str = $(this).val();
                if(str.length > maxleng){
                    $(this).val(str.slice(0, maxleng));
                }
            });
        },

        parseUrl: function (url) {
            var protocol = url.split('//')[0],
                comps = url.split('#')[0].replace(/^(https\:\/\/|http\:\/\/)|(\/)$/g, '').split('/'),
                host = comps[0],
                search = comps[comps.length - 1].split('?')[1],
                tmp = host.split(':'),
                port = tmp[1],
                hostname = tmp[0];

            search = typeof search !== 'undefined' ? '?' + search : '';

            var params = search
            .slice(1)
            .split('&')
            .map(function (p) { return p.split('='); })
            .reduce(function (obj, pair) {
                    pair[0] = pair[0] || '';
                    pair[1] = pair[1] || '';  

                    if(pair[0]) {
                        var parts = pair.map(function(param) {
                            return decodeURIComponent(param);
                        });
                        obj[parts[0]] = parts[1];
                    }
                return obj
            }, {});

            return {
                hash: url.indexOf('#') > -1 ? url.substring(url.indexOf('#')) : '',
                protocol: protocol,
                host: host,
                hostname: hostname,
                href: url,
                pathname: '/' + comps.splice(1).map(function (o) { return /\?/.test(o) ? o.split('?')[0] : o; }).join('/'),
                search: search,
                origin: protocol + '//' + host,
                port: typeof port !== 'undefined' ? port : '',
                searchParams: {
                    get: function(p) {
                        return p in params? params[p] : ''
                    },
                    getAll: function(){ return params; }
                }
            };
        },


        getParameterByName: function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        //현재 페이지의 찜하기 객체를 찾아서 갱신한다
        checkWishItem: function(ajaxUrl,checkAttr) {
            if(!checkAttr) {
                checkAttr = "data-wish-model-name";
            }

            var $wishItem = $('input['+checkAttr+']');

            if($wishItem.length > 0) {
                lgkorUI.requestAjaxData(ajaxUrl, {"type":"list"}, function(result){
                    var data = result.data.data;
                    if(data){
                        var listData = data.listData != undefined ? data.listData : [];
                        var wishListId = data.wishListId;
                        /*
                        $wishItem.each(function(idx, item){
                            var $item = $(item);
                            if(!$item.data('wishListId')) {
                                $item.data('wishListId', wishListId);
                            };
                        }); 
                        */
                        if(wishListId) {
                            $wishItem.each(function(idx, item){
                                var $item = $(item);
                                if(!$item.data('wishListId')) {
                                    $item.data('wishListId', wishListId);
                                };
                                var itemId = $item.attr(checkAttr);
                                for (var i = 0, len = listData.length; i < len; i++) {
                                    var listItem = listData[i];
                                    if (listItem.sku == itemId) {
                                        $item.data(listItem);
                                        $item.prop("checked",true);
                                        break;
                                    }
                                }
                            });
                            /*
                            listData.forEach(function(item,index){
                                var $wish = $wishItem.filter('[' + checkAttr + '="'+item.sku+'"]' );
                                console.log($wish);
                                if($wish.length > 0) {
                                    $wish.data(item);
                                    $wish.prop("checked",true);
                                }
                            });
                            */
                        }
                    }
                },"GET", null, true);
            }
        },

        stringCompress:function(str, asArray) {
            asArray = (asArray === true);
            var i,
                dictionary = {},
                uncompressed = str,
                c,
                wc,
                w = "",
                result = [],
                ASCII = '',
                dictSize = 256;
            for (i = 0; i < 256; i += 1) {
                dictionary[String.fromCharCode(i)] = i;
            }
        
            for (i = 0; i < uncompressed.length; i += 1) {
                c = uncompressed.charAt(i);
                wc = w + c;
                //Do not use dictionary[wc] because javascript arrays
                //will return values for array['pop'], array['push'] etc
               // if (dictionary[wc]) {
                if (dictionary.hasOwnProperty(wc)) {
                    w = wc;
                } else {
                    result.push(dictionary[w]);
                    ASCII += String.fromCharCode(dictionary[w]);
                    // Add wc to the dictionary.
                    dictionary[wc] = dictSize++;
                    w = String(c);
                }
            }
        
            // Output the code for w.
            if (w !== "") {
                result.push(dictionary[w]);
                ASCII += String.fromCharCode(dictionary[w]);
            }
            return asArray ? result : ASCII;
        },

        stringDecompress:function (str) {
            var i, tmp = [],
                dictionary = [],
                compressed = str,
                w,
                result,
                k,
                entry = "",
                dictSize = 256;
            for (i = 0; i < 256; i += 1) {
                dictionary[i] = String.fromCharCode(i);
            }
        
            if(compressed && typeof compressed === 'string') {
                // convert string into Array.
                for(i = 0; i < compressed.length; i += 1) {
                    tmp.push(compressed[i].charCodeAt(0));
                }
                compressed = tmp;
                tmp = null;
            }
        
            w = String.fromCharCode(compressed[0]);
            result = w;
            for (i = 1; i < compressed.length; i += 1) {
                k = compressed[i];
                if (dictionary[k]) {
                    entry = dictionary[k];
                } else {
                    if (k === dictSize) {
                        entry = w + w.charAt(0);
                    } else {
                        return null;
                    }
                }
        
                result += entry;
        
                // Add w+entry[0] to the dictionary.
                dictionary[dictSize++] = w + entry.charAt(0);
        
                w = entry;
            }
            return result;
        },

        obj2HashString:function(obj) {
            var compress = lgkorUI.stringCompress(JSON.stringify(obj));
            //console.log(compress);
            var result = compress.substring(1, compress.length-1);
            //var result = compress;
            return result;
        },

        hashString2Obj:function(str) {
            var orig =  decodeURIComponent("{"+str+"}"); //"{"+str+"}";
            var decompress = lgkorUI.stringDecompress(orig);
            var result = JSON.parse(decompress);
            return result;
        },

        //크레마로그인
        cremaLogin:function() {

            // 크레마 init 구조상 cremaAsyncInit 함수가 먼저 선언되 있어야 초기화 오류가 안난다.
            window.cremaAsyncInit = function () {
                if(typeof crema !== 'undefined') {
                    crema.init(cremaid, cremaname);
                }
            };

            (function(i,s,o,g,r,a,m){
                var isMobile = false;
                if(vcui.detect.isMobile){
                    isMobile = true;
                }
                
                if(location.hostname == "www.lge.co.kr") {
                    r = isMobile ? "//widgets.cre.ma/lge.co.kr/mobile/init.js" : "//widgets.cre.ma/lge.co.kr/init.js";
                } else {
                    r = isMobile ? "//swidgets.cre.ma/lge.co.kr/mobile/init.js" : "//swidgets.cre.ma/lge.co.kr/init.js";
                }
            
                if(s.getElementById(g)){
                    return
                };
                a=s.createElement(o),m=s.getElementsByTagName(o)[0];
                a.id=g;
                a.async=1;
                a.src=r;
                m.parentNode.insertBefore(a,m);
            })(window,document,'script','crema-jssdk','//widgets.cre.ma/lge.co.kr/init.js');


            window.cremaAsyncInit();

        },

        //크레마리플래쉬
        cremaReload:function() {
            if(typeof crema !== 'undefined' && typeof crema == "object" && typeof crema.run == 'function') {
                setTimeout(function(){
                    crema.run();
                },500);
            }
        },

        // 앱 하단 메뉴 컨트롤 부분

        // 앱 하단메뉴가 화면을 덮는 형태인지 아닌지 결정
        showAppBottomMenuOver:function(flag){
            if(isApplication) {
                if(isAndroid && android) {
                    android.showBottomMenuOver(flag);
                }
                if(isIOS){
                    var jsonString= JSON.stringify({command:'showBottomMenuOver', value:flag? "Y":"N"});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }
            }
        },
        // 앱 하단메뉴 스크롤 기능 사용 여부 설정
        setEnableAppScrollBottomMenu:function(flag){
            if(isApplication) {
                if(isAndroid && android) {
                    android.setEnableScrollBottomMenu(flag);
                }
                if(isIOS){
                    var jsonString= JSON.stringify({command:"setEnableScrollBottomMenu", value : flag? "Y" : "N"});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }
            }
        },
        // 앱 하단메뉴 노출 여부 설정
        showAppBottomMenu:function(flag){

            if(isApplication) {
                if(isAndroid && android) android.showBottomMenu(flag);
                if(isIOS) {
                    var jsonString= JSON.stringify({command:'showBottomMenu', value:flag? "Y" : 'N'});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }
            }
        },

        // 앱 isLayoutPopup
        appIsLayerPopup:function(flag){

            if(isApplication) {
                if(isAndroid && android) android.isLayerPopup(flag);
                if(isIOS) {
                    var jsonString= JSON.stringify({command:'isLayerPopup', value:flag? "Y" : 'N'});
                    webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                }
            }
        },

        // openAR 링크 보내기
        openAR:function(modelId){
            if(isApplication) {
                if(modelId){
                    if(isAndroid && android) android.openAR(modelId);
                    if(isIOS) {
                        var jsonString= JSON.stringify({command:'showAR', product:modelId});
                        webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                    }
                }
                return true;
            }else{
                //return false;
                if(modelId && vcui.detect.isMobile) {
                    var iosScheme = "lgeapp://goto?type=AR&product=" + modelId;
                    var androidScheme = "Intent://goto?type=AR&product=" + modelId;
                    if(location.hostname == "www.lge.co.kr") {
                        androidScheme += "#Intent;scheme=lgeapp;package=kr.co.lge.android;end";
                    } else {
                        androidScheme += "#Intent;scheme=lgeapp;package=kr.co.lge.android.stg;end";
                    }
                    //var androidScheme = "Intent://goto?type=AR&product=" + modelId + "#Intent;scheme=lgeapp;package=kr.co.lge.android;end"
                    lgkorUI.isAPPInstall(iosScheme, androidScheme);
                    return true;
                } else {
                    return false;
                }
            }
        },
        
        // history back 사용하기
        addHistoryBack:function(cid, callback){

            if(!isMobileDevice) return;

            var uid = '.history-back-'+cid;
            $(window).off('popstate'+uid).on('popstate'+uid, function(){      
                var state = window.history.state;
                if(state && state.data && state.data == uid){
                    if(callback && vcui.isFunction(callback)) callback.call(this);
                    $(window).off('popstate'+uid);
                }
            });

            window.history.replaceState({ data: uid }, null, null);
            window.history.pushState({ data: uid+'-open' }, null, null);

        },

        removeHistoryBack:function(cid){

            if(!isMobileDevice) return;

            var uid = '.history-back-'+cid;
            var state = window.history.state;
            if(state && state.data && state.data == uid+'-open'){
                window.history.back();
            }
            $(window).off('popstate'+uid);
        },

        //앱 설치 여부 체크

        //iOS, Android 앱 설치 여부 확인
        isAPPInstall:function(iosScheme, androidScheme) {
            var self = this;
            if (vcui.detect.isAndroid || vcui.detect.isIOS) {
                self.heartbeat = setInterval(function () {
                    console.log('interval', document.webkitHidden, document.hidden, document.mozHidden);
                    if(document.webkitHidden || document.hidden || document.mozHidden){
                        clearTimeout(self.appCheckTimer);
                        clearInterval(self.heartbeat);
                        console.log('앱이 설치 되어 있습니다.');
                    }
                }, 2);
            }

            if (vcui.detect.isAndroid) {
                self.appCheckTimer = setTimeout(function() {
                    clearInterval(self.heartbeat);
                    console.log('안드로이드 앱이 없습니다.');
                    $(window).trigger("appNotInstall");
                }, 3000);
                location.href = androidScheme;
            } else if (vcui.detect.isIOS) {
                self.appCheckTimer = setTimeout(function() {
                    clearInterval(self.heartbeat);
                    console.log('ios 앱이 없습니다.');
                    $(window).trigger("appNotInstall");
                }, 3000);
                location.href = iosScheme;
            }
        },

        /**
         * 기간일 설정
         * @param {String} startTime - 시작일
         * @param {String} endTime - 종료일
         * @param {String} nowTime - 현제시간 ( 서버 타임 넘어올경우, 나머지는 로컬타임 )
         * @returns {Boolean} true  - 행사중
         * @returns {Boolean} false - 행사기간 지남 
         * URL 파라미터형식 
         * ?dateTest=변경할 시간,행사 시작일,행사 종료일
         * ?dateTest=20200808,20200801,20200807 
         * 날짜 형식 : 년월일시분초 ex> 20200820 or 20200820230159
         */
         isShowDate: function(startTime, endTime, nowTime) {
            var self = this;
            var dateTest = self.getParameterByName("dateTest").split(",").filter(Boolean); // 테스트용 dateTest 파라미터 체크
            var debug = self.getParameterByName("debug"); 
        
            // 날짜 셋팅
            var setDate = function(time) {
                var limitTime = null;
            
                if (!time) {
                    limitTime = new Date();
                } else {
                    var regex = /^[0-9]*$/g;
                    if (!regex.test(time)) {
                      throw ("error : 형식 에러");
                    }
            
                    if (typeof time === 'number') {
                        time = time + '';
                    }
            
                    if (time.length < 8)  throw ("error : 형식 에러")
            
                    var year = time.slice(0, 4);
                    var month = time.slice(4, 6);
                    var day = time.slice(6, 8);
                    // 시간, 분 체크 필요시 사용
                    var hours = time.slice(8, 10) || '00';
                    var minutes = time.slice(10, 12) || '00';
                    var second = time.slice(12, 14) || '00';
            
                    limitTime = new Date(year+'/'+month+'/'+day+' '+hours+':'+minutes+':'+second);
                }

                return limitTime.getTime();
            };
            
            var printDate = function(time) {
                return new Date(time - new Date().getTimezoneOffset() * 60000).toISOString().replace('T',' ').slice(0,-5)
            };

            try {
                nowTime   = setDate(dateTest.length == 0 ? nowTime   : dateTest[0]);  // 현재시간
                startTime = setDate(dateTest.length <= 1 ? startTime : dateTest[1]);  // 행사 시작일
                endTime   = setDate(dateTest.length <= 1 ? endTime   : dateTest[2]);  // 행사 종료일
            } catch (e) {
                console.log(e);
                return false;
            }

            if(debug === 'y') {

                console.log('dateTest %o',dateTest);
                console.log(
                    "행사기간 : %o ~ %o"
                    ,printDate(startTime)
                    ,printDate(endTime)
                );

                console.log(
                    "현제날짜 : %o 결과값 :  %o"
                    , printDate(nowTime)
                    , nowTime >= startTime && nowTime < endTime ? "행사중" :"행사 종료"
                );

            }

            return nowTime >= startTime && nowTime < endTime ? true : false;
        },

        /**
         * goUrl 함수 : 링크 처리하는 함수 
         * 파라메타는 HTMLElement 또는 Object 
         * @param { HTMLElement } obj 
         * @param { href : '' , target:'', openMode : '' } obj 
         * 
         */
         goUrl: function(obj) {

            if(!obj || !obj instanceof Object) var obj = {};

            if(obj instanceof HTMLElement) {
                obj = $(obj).data();
            } 

            obj   = $.extend( { href : '',target : '',openMode : '' } , obj );

            if(obj.href) {
                if(isApp()) {
                    // 앱 케이스
                    switch(obj.openMode) {
                        case 'inAppBrowser' :

                            var url = lgkorUI.parseUrl(obj.href),
                                params = $.extend(url.searchParams.getAll(),{'openMode': obj.openMode});
                                obj.href = obj.href.split('?')[0] + '?' + $.param(params)+(url.hash || '');
    
                            if(vcui.detect.isIOS){
                                var jsonString = JSON.stringify({'command':'openInAppBrowser', 'url': obj.href, 'titlebar_show': 'N'});  
                                webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                            } else {
                                android.openNewWebview(obj.href);
                            }
                        break;
    
                        case 'outlink' : 
                            if(vcui.detect.isIOS){
                                var jsonString = JSON.stringify({'command':'openLinkOut', 'url': obj.href});
                                webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                            } else {
                                android.openLinkOut(obj.href);
                            }
                        break;
                        default : 
                            location.href = obj.href;
                        break;
                    }
                } else {
                    // 일반 브라우져
                    if(obj.target === '_blank') {
                        window.open(obj.href);
                    } else {
                        location.href = obj.href;
                    }
                }     
            }
        },
        // BTOCSITE-4852 [AppsFlyer] 앱어트리뷰션 툴 Event 태깅을 위한 회원가입완료 및 로그인 완료 정보 개발 요청건
        afLoginEvent: function(){
            var afLogin = vcui.Cookie.get('AF_LOGIN');
            if(isApp() && afLogin) {
                var eventName = "af_login";
                var eventValue = { "af_login_method" : "success", "af_unify_id" : afLogin };
                    eventValue = JSON.stringify(eventValue);

                var iframe = document.createElement("IFRAME");
                    iframe.setAttribute("src", "af-event://inappevent?eventName="+eventName+"&eventValue="+eventValue);
                    document.documentElement.appendChild(iframe);
                    iframe.parentNode.removeChild(iframe);
                    iframe = null;

                // vcui 도메인 세팅이 틀린경우 삭제가 안되어 과거로 돌려서 삭제함.
                vcui.Cookie.set('AF_LOGIN','',{
                    expires : new Date('1999/01/01'),
                    domain : location.host
                });
            }
        }
    }

    window.historyBack = lgkorUI._historyBack;

    document.addEventListener('DOMContentLoaded', function () {
        lgkorUI.init();

    });

    global.addEventListener('load', function(){
        vcui.require(['ui/sticky'], function () {
            $('.ui_sticky').vcSticky('update');
        });
    });

})(window);