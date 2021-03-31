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
            
            self.$KRP0005 = $('.KRP0005');
            self.$floatingWrap = self.$KRP0005.parents('.btn-floating-wrap');
            self.moreButton = self.$KRP0005.find('.more-plus-linker a');

            self.$popup = $('#KRP0032');
            self.$list = self.$popup.find('div.lately-list ul');
        },

        getChatPinCode: function() {
            var self = this;
            var $chat = self.$KRP0005.find('div.floating-linker.chat a');
            if($chat.length > 0) {
                var ajaxUrl = self.$KRP0005.data('pincodeUrl');
                lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ajaxUrl, null, function(result) {
                    var pinCode = null;
                    var data = result.data;
                    if(data) {
                        var receveResult = data.result;
                        if(receveResult && receveResult.code) {
                            pinCode = receveResult.code;
                        }
                    }

                    var chatUrl = self.$KRP0005.data('chatUrl');
                    var isApplication = isApp();
                    chatUrl += (isApplication ? "?channel=lg_app" : "?channel=lg_homepage");
                    if(pinCode) {
                        chatUrl += ("&code="+pinCode);
                    }

                    $chat.attr('href',chatUrl);
                });
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
                } else {
                    self.$floatingWrap.addClass('open');
                }
            });

            self.$KRP0005.on('click','div.floating-linker > a',function(e){
                e.preventDefault();
                var $div = $(this).parents('div.floating-linker');
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
                    if(href) {
                        location.href = href;
                    }
                }
            });

            self.$popup.on('click','.ui_modal_close',function(e){
                e.preventDefault();
                self.closePopup();
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
            if(!self.ignoreOverflowForce){
                self.bodyOvewflow = $('body').css('overflow').toLowerCase();
                $('html, body').css({
                    overflow:"hidden"
                });
            } else {
                self.bodyOvewflow = $('body').css('overflow').toLowerCase();
                self.ignoreOverflow = (self.bodyOvewflow != "hidden");
                if(vcui.detect.isMobile) { 
                    if(self.ignoreOverflow){
                        $('html, body').css({
                            overflow:"hidden"
                        });
                    }
                }
            }
        },

        //리스트 닫기
        closePopup: function() {
            var self = this;
            self.$popup.addClass('close');
            self.$popup.removeClass('open');
            self.$popup.hide();
            //
            if(self.ignoreOverflowForce) {
                if(self.bodyOvewflow) {
                    $('html, body').css({
                        overflow:self.bodyOvewflow
                    });
                } else {
                    $('html, body').css({
                        overflow:"visible"
                    });
                }
            } else if(vcui.detect.isMobile){
                if(self.ignoreOverflow) {
                    if(self.bodyOvewflow) {
                        $('html, body').css({
                            overflow:self.bodyOvewflow
                        });
                    } else {
                        $('html, body').css({
                            overflow:"visible"
                        });
                    }
                }
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

            lgkorUI.requestAjaxDataPost(ajaxUrl, null/*{"id":cookieValue}*/, function(result) {
				var data = result.data;
				var arr = data instanceof Array ? data : [];
                self.listData = arr;
				self.$list.empty();

                var popuplistItemTemplate = '<li>' +
                    '<div class="img"><a href="{{modelUrlPath}}"><img data-temp-src="{{smallImageAddr}}" alt="{{imageAltText}}"></a></div>' +
                    '<dl><a href="{{modelUrlPath}}"><dt>{{#raw modelDisplayName}}</dt><dd>{{#if price}}{{price}}원{{/if}}</dd></a></dl>' +
                '</li>'

				arr.forEach(function(item, index) {
                    item.price = item.obsTotalDiscountPrice ? vcui.number.addComma(item.obsSellingPrice) : null;
					self.$list.append(vcui.template(popuplistItemTemplate, item));
                });

                self.checkNoData();
                
                if(openPopup) {
                    self.openPopup();
                }
			});
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

    $(document).ready(function(){
        if(!document.querySelector('.KRP0005')) return false;
        //$('.KRP0005').buildCommonUI();
	    KRP0005.init();
    });
})();