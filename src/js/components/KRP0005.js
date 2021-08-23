(function() {
	var KRP0005 = {
		init: function(){
            var self = this;
            self._setting();
            self._bindEvent();

            // BTOCSITE-659
            if(location.href.indexOf('/story/') > -1 ) self.addAWSStory();
		},

        _setting: function setting() {
            var self = this;

            self.$el = $('#quickMenu'); //BTOCSITE-2958 : 플로팅 배너(퀵메뉴) 공통 파일로 변경 2021-08-20
            self.$topBtn = self.$el.find('.btn-top');

            self.$service = self.$el.find('.service-menu');
            self.$serviceBtn = self.$service.find('.btn-expand');
            self.$history = self.$el.find('.history');
            self.$historyBtn = self.$history.find('.btn-expand');
            self.$closeBtn = self.$el.find('.btn-close');
            self.$historyPopup = $('#history-popup');

            ///퀵메뉴 쿠키 생성
            if( lgkorUI.getCookie('accessPageFirst') != "done") {
                lgkorUI.setCookie("accessPageFirst", "done", false, 365);
            }

            /* BTOCSITE-2958 : 플로팅 배너(퀵메뉴) 공통 파일로 변경 2021-08-20 */
            //모바일 디바이스 일때 고객센터 전화하기 배너 노출
            var $serviceCenterBan = self.$service.find('.service-menu-list li.serviceCenter-call');
            if (vcui.detect.isMobileDevice) {
                $serviceCenterBan.show();
            }
        },
        _altChange : function($target, boolean){
            var $altText = $target.find('.blind');
            var altValue = $altText.text();

            if (!boolean) { //on 클래스가 있을때 (닫을때)
                $altText.text(altValue.replace('닫기', '열기'));
            } else { //on 클래스가 없을때 (열때)
                $altText.text(altValue.replace('열기', '닫기'));
            }
        },
        _changeService: function(flag) {
            var self = this;
            if (!flag) {
                self.$service.removeClass('on');
                self.$serviceBtn.attr('aria-expanded', false);
                //self.$el.removeClass('dim');
                self._altChange(self.$serviceBtn, false);
            } else {
                self.$history.removeClass('on');
                self.$service.addClass('on');
                self.$serviceBtn.attr('aria-expanded', true);
                //self.$el.addClass('dim');
                self._altChange(self.$serviceBtn, true);
            }
        },
        _changeHistory: function(flag) {
            var self = this;
            
            /* BTOCSITE-2958 : 플로팅 배너(퀵메뉴) 공통 파일로 변경 2021-08-20 */
            if (self.$history.find('.history-list').length) {
                if (flag) {
                    self.$service.removeClass('on');
                    self.$history.addClass('on');
                    //self.$el.addClass('dim');
                } else {
                    self.$history.removeClass('on');
                    //self.$el.removeClass('dim');
                }
            }
        },
        _bindEvent: function _bindEvent() {
            var self = this;

            self.$service.find('.solutions-btn').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingSolutionsClick.do', '/acecount/floatingSolutionsClickm.do');
            });
            self.$service.find('.manuals-btn').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingDriverClick.do', '/acecount/floatingDriverClickm.do');
            });
            self.$service.find('.center-btn').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingCenterClick.do', '/acecount/floatingCenterClickm.do');
            });
            self.$service.find('.chatbot-btn').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingChatClick.do', '/acecount/floatingChatClickm.do');
            });
            self.$history.find('.history-list a').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingModelClick.do', '/acecount/floatingModelClickm.do');
            }); 
            self.$historyPopup.find('.lately-list a').on('click', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/floatingModelClick.do', '/acecount/floatingModelClickm.do');
            });

            self.$serviceBtn.on('click', function() {
                self._changeService($(this).parent().hasClass('on') ? false : true);
            });

            /* BTOCSITE-2958 : 플로팅 배너(퀵메뉴) 공통 파일로 변경 2021-08-20 */
            self.$historyBtn.on('click', function() {
                self.$history.find('.history-list li').one('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function() {
                    self.$history.find('.history-list li:first-child a')[0].focus();
                    self.$history.find('.btn-expand').focus();
                });
                self._changeHistory(true);
            });

            self.$closeBtn.on('click', function() {
                self._changeHistory(false);
                self.$historyBtn.focus();
            });

            self.$topBtn.on('click', function (e) {
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
            });

            $(document).on('click', function(e) {
                if (!$(e.target).closest(self.$el).length) {
                    self._changeService(false);
                    self._changeHistory(false);
                }
            });

            $(window).on('scroll resize', function(){
                self._changeService(false);
                self._changeHistory(false);

                if ($(this).scrollTop() > 100) {
                    self.$el.addClass('top');
                } else {
                    self.$el.removeClass('top');
                }
            });

            /* BTOCSITE-2958 : 플로팅 배너(퀵메뉴) 공통 파일로 변경 2021-08-20 */
            //self.$history.trigger('click');
            setTimeout(function () {
                self.$history.removeClass('info-text');
            }, 2000);
            //console.log("-------------------");
            //console.log(self.$history);
            
            /* BTOCSITE-2958 : 플로팅 배너(퀵메뉴) 공통 파일로 변경 2021-08-20 */
            self.$history.hide();

            var $findLocation_cs = window.location.href.toUpperCase().indexOf("CS"); //로컬 확인용
            var $findLocation_support = window.location.href.toUpperCase().indexOf("support");

            if ($findLocation_cs > -1 || $findLocation_support > -1) {
                self.$history.show();
            }
        },
        // BTOCSITE-659 [UI개발]마이컬렉션 추천 서비스로 개편 : story 상세
        addAWSStory: function () {
               
            // story 상세페잊 파라메터로 넘긴다
            // /mkt/commonModule/addAWSStory.lgajax
            // 파라미터
            // itemId : storyurl (/story/only-and-best/all-in-one-generation)


            var depth = location.pathname.split('/');
            console.log('story %o',location.pathname);
            console.log('story %o',depth);

            if(depth.length === 4) {
                lgkorUI.requestAjaxData("/mkt/commonModule/addAWSStory.lgajax", {"itemId":location.href.replace(/https?:\/\//,'').replace(location.host,'')}, function(result) {
                    console.log("result %o",result);
                });

            }
        }


	};

    $(document).ready(function(){
        //if(!document.querySelector('.KRP0005')) return false;
        //$('.KRP0005').buildCommonUI();

        // BTOCSITE-27 :: 플로팅 바 swipe 대응        
        var isSwipe = !!$('#sw_con').length;

        if (isSwipe && $('#floatBox').length == 0){
            //$('.swiper-container').after('<div id="floatBox"></div>');
            // 20210810 BTOCSITE-1814
            $('#sw_con').after('<div id="floatBox"></div>');
        }
        
        if (isSwipe && $('#floatBox').find('.floating-wrap').length < 1){
            setTimeout(function(){
                //console.log('krp0005 init');
                var floatingWrap = $('.floating-wrap').remove();
                var btnFloatingWrap = $('.btn-floating-wrap').remove();
                $('#floatBox').append(btnFloatingWrap);
                $('#floatBox').append(floatingWrap);

                // preload 대응 현재 슬라이드가 고객지원일때는 숨김처리
                if ($('.swiper-slide-active').data().hash == 'support'){
                    $(floatingWrap).hide();
                    $(btnFloatingWrap).hide();
                }
                $('.back-to-top button').off('click').on('click', function (e) {
                    e.preventDefault();
                    $(window).trigger('floatingTop');
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 400);
                });
    
                KRP0005.init();
    
                $(document).trigger('appInit');
                
            },100);
        }
        
        // 스와이프 아닌 페이지
        if (isSwipe == false){
            KRP0005.init();
        }
        
        // BTOCSITE-27 :: 플로팅 바 swipe 대응


        //KRP0005.init();
        
    });
})();