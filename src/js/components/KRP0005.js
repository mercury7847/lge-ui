(function() {
	var KRP0005 = {
		init: function(){
            var self = this;
            self.listData = null;
            self.setting();
            self.bindEvents();

            self.getChatPinCode();

            var cookieValue = lgkorUI.getCookie(lgkorUI.RECENT_PROD_COOKIE_NAME);
            if(cookieValue) {
                self.requestData(false);
            } else {
                //최근본 제품이 없으면 최근본 제품 버튼을 숨긴다
                self.$KRP0005.find('.floating-linker.recently').hide();
            }
		},

        setting: function() {
            var self = this;		
            
            self.$floatingWrap = $('.btn-floating-wrap');
            self.$KRP0005 = $('.KRP0005.floating-menu');
            self.$morePlus = $('.KRP0005.floating-menu.more-plus');
            self.moreButton = self.$KRP0005.find('.more-plus-linker a');

            self.$popup = $('#KRP0032:eq(0)');
            self.$list = self.$popup.find('div.lately-list ul');
        },        

        getChatPinCode: function() {
            var self = this;
            var $chat = self.$KRP0005.find('div.floating-linker.chat a');
            if($chat.length > 0) {
                var ajaxUrl = self.$morePlus.data('pincodeUrl');
                if(ajaxUrl) {
                    lgkorUI.requestAjaxData(ajaxUrl, null, function(result) {
                        var pinCode = null;
                        var data = result.data;
                        if(data) {
                            var receveResult = data.result;
                            if(receveResult && receveResult.code) {
                                pinCode = receveResult.code;
                            }
                        }

                        var chatUrl = self.$morePlus.data('chatUrl');
                        var isApplication = isApp();
                        chatUrl += (isApplication ? "?channel=lg_app" : "?channel=lg_homepage");
                        if(pinCode) {
                            chatUrl += ("&code="+pinCode);
                        }

                        $chat.attr('href',chatUrl);
                    },"GET", "json", true, null, true);
                }
            }
        },

        bindEvents: function() {
            var self = this;

            self.moreButton.on('click',function(e){
                e.preventDefault();
                var isOpen = self.$floatingWrap.hasClass('open');
                if(isOpen) {
                    if(self.$popup.hasClass('open')) {
                        //만약 최근본 제품 팝업이 열려 있으면 닫는다/
                        self.closePopup();
                    }
                    self.$floatingWrap.removeClass('open');
                    //닫기
                    self.moreButton.attr('aria-expanded',false);
                    self.moreButton.find('span').text('서비스 메뉴 열기'); //BTOCSITE-5223 : 플로팅 버튼 GA 수정 2021-09-14
                } else {
                    self.$floatingWrap.addClass('open');
                    //열기
                    self.moreButton.attr('aria-expanded',true);
                    self.moreButton.find('span').text('서비스 메뉴 닫기'); //BTOCSITE-5223 : 플로팅 버튼 GA 수정 2021-09-14
                }
            });

            self.$KRP0005.on('click','div.floating-linker > a',function(e){
              
                e.preventDefault();
                var $div = $(this).parents('div.floating-linker');

                if ($div.hasClass('faq')){
                    window.open('/support/usage-guide-faq','_blank');
                    return;
                }

                if($div.hasClass('chat')) {
                    //상담쳇
                } else if($div.hasClass('recently')) {
                    //최근본 제품
                    if(!self.listData) {
                        self.requestData(true);
                    } else {
                        self.openPopup();
                    }
                } else {
                    //
                    e.preventDefault();
                    var href = $(this).attr('href');
                    if(href && href.replace("#", "").length > 0) {
                        location.href = href;
                    }
                }
            });

            self.$popup.on('click','.ui_modal_close',function(e){
                e.preventDefault();
                self.closePopup();
            });

            // BTOCSITE-12128 메인 성능개선
            $(window).on('floatingTopHide', function(e){
                if(self.$floatingWrap.hasClass('scroll')) self.$floatingWrap.removeClass('scroll');
            }); 

            $(window).on('floatingTopShow', function(e){
                if(!self.$floatingWrap.hasClass('scroll')) self.$floatingWrap.addClass('scroll');
            }); 
        },

        //최근본 제품 처리

        //리스트 열기
        openPopup: function() {
            var self = this;
            self.resetImage();
            self.$popup.show();
            self.$popup.removeClass('close');
            self.$popup.addClass('open');

            self.ignoreOverflowForce = $('body').hasClass('ignore-overflow-hidden');
            if(!self.ignoreOverflowForce && vcui.detect.isMobile){
                $('html, body').css({
                    overflow:"hidden"
                });
            } 
        },

        //리스트 닫기
        closePopup: function() {
            var self = this;
            self.$popup.addClass('close');
            self.$popup.removeClass('open');
            self.$popup.hide();

            self.ignoreOverflowForce = $('body').hasClass('ignore-overflow-hidden');
            if(!self.ignoreOverflowForce && vcui.detect.isMobile) {
                
                $('html, body').css({
                    overflow:"visible"
                });

            } 
        },

        resetImage: function() {
            var self = this;
            var $img = self.$popup.find('img[data-temp-src]');
            $img.each(function(idx,obj){
                if(!obj.src.length || obj.src.length == "") {
                    obj.src = obj.dataset.tempSrc;
                }
            });
        },

        //최근본 제품 리스트 가져오기
        requestData: function(openPopup) {
			var self = this;
			var ajaxUrl = self.$popup.attr('data-list-url');

            lgkorUI.requestAjaxDataPost(ajaxUrl, null, function(result) {
				var data = result.data;
				var arr = data instanceof Array ? data : [];
                self.listData = arr;
				self.$list.empty();

                var popuplistItemTemplate = '<li{{#if disabledReason}} class="disabled"{{/if}}>' +
                    '<div class="img"><a href="{{modelUrlPath}}"><img data-temp-src="{{smallImageAddr}}" alt="{{imageAltText}}"></a></div>' +
                    '<dl><a href="{{modelUrlPath}}"><dt>{{#raw modelDisplayName}}</dt><dd>{{#if disabledReason}}{{disabledReason}}{{#else}}{{#if price}}{{price}}원{{/if}}{{/if}}</dd></a></dl>' +
                '</li>'

				arr.forEach(function(item, index) {
                    var price = item.obsSellingPrice ? (item.obsSellingPrice > 0 ? item.obsSellingPrice : null) : null;
                    item.price = price ? vcui.number.addComma(price) : null;
                    item.disabledReason = item.disabledReason && item.disabledReason.length > 0 ? item.disabledReason : null;
					self.$list.append(vcui.template(popuplistItemTemplate, item));
                });

                self.checkNoData();
                
                if(openPopup) {
                    self.openPopup();
                }
			}, null, true);
        },
        
        //최근본 제품 noData 체크
        checkNoData: function() {
            var self = this;
            if(self.$list.find('li').length > 0) {
                self.$KRP0005.find('.floating-linker.recently').show();
            } else {
                self.$KRP0005.find('.floating-linker.recently').hide();
            }
        }

	};

    // BTOCSITE-2838 : 매니저 정보로 이동 s
    var managerInfoLink= 'managerInfoLink';
    $('.btn-manager-info').on('click', function(e){
        e.preventDefault();
        lgkorUI.setStorage(managerInfoLink, true);
        location.href='/my-page/care-solution-contract-status';
    });
    // BTOCSITE-2838 :매니저 정보로 이동 e 


    $(document).ready(function(){
        // if(!document.querySelector('.KRP0005')) return false;
        //$('.KRP0005').buildCommonUI();

        // BTOCSITE-27 :: 플로팅 바 swipe 대응        
        var isSwipe = !!$('#sw_con').length;

        if (isSwipe && $('#floatBox').length == 0){
            // 20210810 BTOCSITE-1814
            $('#sw_con').after('<div id="floatBox"></div>');
        }
        
        if (isSwipe && $('#floatBox').find('.floating-wrap').length < 1){
            var domInsertCheck = false;
            $('#sw_con .swiper-slide').one('DOMNodeInserted', function(e) {
                // console.log("dom insert %o",e.target);

                if(!domInsertCheck) {
                    // console.log('krp0005 init');
                    var floatingWrap = $('.floating-wrap').remove();
                    var btnFloatingWrap = $('.btn-floating-wrap').remove();
                    $('#floatBox').append(btnFloatingWrap);
                    $('#floatBox').append(floatingWrap);

                    // preload 대응 현재 슬라이드가 고객지원일때는 숨김처리
                    if ($('.swiper-slide-active').data().hash == 'support'){
                        $(floatingWrap).hide();
                        $(btnFloatingWrap).hide();
                    }
                    
                    KRP0005.init();
                    $(document).trigger('appInit');
                    domInsertCheck = true;
                }

            });
        }
        
        // 스와이프 아닌 페이지
        if (isSwipe == false){
            KRP0005.init();
        }
        
        // BTOCSITE-27 :: 플로팅 바 swipe 대응
    });
})();