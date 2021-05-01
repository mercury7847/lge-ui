(function() {
    var replayEventItemTemplate = '<li>' +
        '<div>' +
            '<p class="tit">{{title}}</p>' +
            '<span class="writter">{{name}}</span>' +
            '<span class="date">{{date}}</span>' +
            '{{#if isApp}} <span class="app">APP<span class="blind">에서 작성</span></span>{{/if}}' +
        '</div>' +
    '</li>'
    var ReplyEvent = {
        init: function() {
            var self = this;

            vcui.require(['ui/pagination','helper/textMasking'], function () {
                self.txtMasking = new vcui.helper.TextMasking();
                self.setting();
                self.bindEvent();
                self.requestData(1);
                
                var apply = self.$wrap.data('isApply');
                if(lgkorUI.stringToBool(apply)) {
                    self.$btns.addClass('apply');
                }
            });
        },

        setting: function() {
            var self = this;
            self.$wrap = $('.reply-wrap');
            self.$pagination = self.$wrap.find('.pagination');
            self.$pagination.vcPagination({"scrollTarget":self.$wrap});
            self.$btnWrap = $('.btn-wrap:eq(0)');
            self.$btns = self.$btnWrap.find('.btns');
            self.$replyPopup = $('#popupReply');
            self.$name = $('#popupReply').find('#name');
            self.$phone = $('#popupReply').find('#phone');
        },

        bindEvent: function() {
            var self = this;
            self.$pagination.on('page_click', function(e, data) {
                self.requestData(data);
            });


            if($('html').hasClass('app')) {
                //댓글쓰기 버튼
                self.$btnWrap.on('click','a.write',function (e) {
                    e.preventDefault();
    
                    if(self.$wrap.data('eventRestrictFlag') == "Y") {
                        lgkorUI.alert("", {title: "서버 점검중입니다."});
                        return;
                    }
    
                    if(lgkorUI.stringToBool($(this).data('isToday'))) {
                        //금일 이미 참여한 이벤트
                        lgkorUI.alert("", {title: '하루에 한번만 참여 가능합니다.'});
                        return;
                    }
    
                    //로그인을 해야 하는가
                    var login = self.$wrap.data('loginUrl');
                    if(login && login.length > 0) {
                        var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                            location.href = login;
                        }};
                        lgkorUI.confirm(null, obj);
                        return;
                    }
    
                    self.$replyPopup.find('#reply').val("");
                    self.$replyPopup.find('input[type="checkbox"]').prop('checked',false);
                    self.$replyPopup.vcModal({opener: this});
                });
            } else {
                lgkorUI.alert("", {title: "이벤트 참여는 모바일앱 에서만 가능합니다. <br>앱 다운로드 후 참여해주세요"});
            }

            //당첨확인
            self.$btnWrap.on('click','a.result',function (e) {
                e.preventDefault();

                if(self.$wrap.data('eventRestrictFlag') == "Y") {
                    lgkorUI.alert("", {title: "서버 점검중입니다."});
                    return;
                }

                //로그인을 해야 하는가
                var login = self.$wrap.data('loginUrl');
                if(login && login.length > 0) {
                    var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                        location.href = login;
                    }};
                    lgkorUI.confirm(null, obj);
                    return;
                }

                var param = {};
                var eventId = self.$wrap.data('eventId');
                param.eventId = eventId;
                param.userPhone = self.$phone.val();

                var ajaxUrl = self.$wrap.attr('data-check-url');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl,param,function(result) {
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.win)) {
                        var template = '<strong class="tit">축하드립니다!</strong>' +
                            '<span class="txt">{{#raw prizeWin}}</span>' +
                            '<span class="txt">사은품은 {{date}} 이후 참여하신<br>휴대폰 번호로 모바일 쿠폰 지급 예정입니다.</span>';
                        $('#popupEventWin').find('p.desc').html(vcui.template(template, data));
                        $('#popupEventWin').vcModal({opener: this});
                    } else {
                        var template = '<strong class="tit">아쉽습니다.</strong>' +
                            '<span class="txt">{{#raw prizeLose}}</span>' +
                            '<span class="txt">다음 이벤트에 참여하여 다시 한번 도전해보세요!</span>';
                        $('#popupEventLose').find('p.desc').html(vcui.template(template, data));
                        $('#popupEventLose').vcModal({opener: this});
                    }
                    self.$btns.removeClass('apply');
                });
            });

            //팝업 댓글쓰기
            self.$replyPopup.on('click','.pop-footer .btn-group button',function (e) {
                e.preventDefault();

                if(self.$wrap.data('eventRestrictFlag') == "Y") {
                    lgkorUI.alert("", {title: "서버 점검중입니다."});
                    return;
                }
                
                //로그인을 해야 하는가
                var login = self.$wrap.data('loginUrl');
                if(login && login.length > 0) {
                    var obj = {title:'로그인이 필요합니다.<br>이동하시겠습니까', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                        location.href = login;
                    }};
                    lgkorUI.confirm(null, obj);
                    return;
                }

                 //체크
                var param = {};
                var $chk = self.$replyPopup.find('#chk1-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 수집 이용 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk1 = "Y"
                    }
                }

                $chk = self.$replyPopup.find('#chk2-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 처리 위탁 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk2 = "Y"
                    }
                }

                $chk = self.$replyPopup.find('#chk3-1');
                if($chk.length) {
                    if(!$chk.is(':checked')) {
                        lgkorUI.alert("", {title: '개인정보 처리 위탁 동의는 필수입니다.'});
                        $chk.focus();
                        return;
                    } else {
                        param.chk3 = "Y"
                    }
                }

                var reply = self.$replyPopup.find('#reply').val();
                var checkReply = vcui.string.replaceAll(reply," ","");
                if(checkReply.length > 0) {
                    param.reply = reply;
                } else {
                    lgkorUI.alert("", {title: '댓글을 입력해주세요.'});
                    return;
                }

                var eventId = self.$wrap.data('eventId');
                param.eventId = eventId;

                var isApplication = isApp();
                param.isApp = isApplication ? "Y" : "N";

                var ajaxUrl = self.$wrap.data('replyUrl');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(ajaxUrl,param,function(result) {
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        lgkorUI.alert("", {title: "이벤트에 참여되었습니다.", ok: function(){
                            if(typeof dataLayer !== 'undefined' && dataLayer) {
                                dataLayer.push({				
                                'event': 'customEvent',				
                                'customEventCategory': '이벤트',				
                                'customEventAction': '이벤트 - 신청 완료',				
                                'customEventLabel': '컨텐츠 : ' + eventId
                                });
                            }
                        }});

                        self.$replyPopup.vcModal('close');
                        self.requestData(1);
                    }
                });
            });
        },

        requestData: function (page) {
            var self = this;

            var param = {};
            var eventId = self.$wrap.data('eventId');
            param.eventId = eventId;
            param.page = page;

            var ajaxUrl = self.$wrap.attr('data-list-url');
            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var data = result.data;
                self.$pagination.vcPagination('setPageInfo',data.pagination);
                $('#totalCount em').text(vcui.number.addComma(data.totalCnt));
                var $ul = self.$wrap.find('ul');
                $ul.empty();
                var arr = (data.listData && data.listData instanceof Array) ? data.listData : [];
                arr.forEach(function(item, index) {
                    item.isApp = lgkorUI.stringToBool(item.isApp);
                    item.name = self.txtMasking.name(item.name);
                    $ul.append(vcui.template(replayEventItemTemplate, item));
                });

                if(lgkorUI.stringToBool(data.isApply)) {
                    self.$btns.addClass('apply');
                } else {
                    self.$btns.removeClass('apply');
                }

                if(lgkorUI.stringToBool(data.isToday)) {
                    self.$btnWrap.find('a.write').data('isToday','Y');
                }

                if(data.userName) {
                    self.$name.val(data.userName);
                } else {
                    self.$name.val('');
                }

                if(data.userPhone) {
                    self.$phone.val(data.userPhone);
                } else {
                    self.$phone.val('');
                }

                var loginUrl = result.loginUrl;
                if(loginUrl) {
                    self.$wrap.data('loginUrl', loginUrl);
                } else {
                    self.$wrap.data('loginUrl', "");
                }
            });
        }
    }

    $(document).ready(function() {
        ReplyEvent.init();
    });
})();