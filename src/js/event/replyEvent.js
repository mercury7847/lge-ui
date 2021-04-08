(function() {
    var replayEventItemTemplate = '<li>' +
        '<div>' +
            '<p class="tit">{{title}}</p>' +
            '<span class="writter">{{name}}</span>' +
            '<span class="date">{{date}}</span>' +
            '{{#if isApp}}<span class="app">APP<span class="blind">에서 작성</span></span>{{/if}}' +
        '</div>' +
    '</li>'
    var ReplyEvent = {
        init: function() {
            var self = this;
            vcui.require(['ui/pagination'], function () {
                self.setting();
                self.bindEvent();
                self.requestData(1);
            });
        },

        setting: function() {
            var self = this;
            self.$wrap = $('.reply-wrap');
            self.$pagination = self.$wrap.find('.pagination');
            self.$pagination.vcPagination({"scrollTarget":self.$wrap});
            self.btnWrap = $('.btn-wrap:eq(0)');
        },

        bindEvent: function() {
            var self = this;
            self.$pagination.on('page_click', function(e, data) {
                self.requestData(data);
            });

            self.btnWrap.on('click','a.write',function (e) {
                e.preventDefault();
            });

            self.btnWrap.on('click','a.result',function (e) {
                e.preventDefault();
                var ajaxUrl = self.$wrap.attr('data-check-url');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl,null,function(result) {
                    var data = result.data;
                    if(!lgkorUI.stringToBool(data.win)) {
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
                });
            });
        },

        requestData: function (page) {
            var self = this;
            var ajaxUrl = self.$wrap.attr('data-list-url');
            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, {"page":page}, function(result) {
                var data = result.data;
                self.$pagination.vcPagination('setPageInfo',data.pagination);
                $('#totalCount em').text(vcui.number.addComma(data.totalCnt));
                var $ul = self.$wrap.find('ul');
                $ul.empty();
                var arr = (data.listData && data.listData instanceof Array) ? data.listData : [];
                arr.forEach(function(item, index) {
                    item.isApp = lgkorUI.stringToBool(item.isApp);
                    $ul.append(vcui.template(replayEventItemTemplate, item));
                });
            });
        }
    }

    $(document).ready(function() {
        ReplyEvent.init();
    }); 
})();