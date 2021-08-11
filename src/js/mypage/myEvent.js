(function() {
    var eventItemList = '<li class="lists"><div class="list-inner" data-event-id="{{eventID}}">' +
        '<a href="{{url}}">' +
            '<span class="thumb">' +
                '<img src="{{imageUrl}}" alt="{{imageAlt}}" aria-hidden="true">' +
                '{{#if endEvent}}<span class="event-end"><em>종료된 이벤트</em></span>{{/if}}' +
                '<span class="flag-wrap bg-type">{{#each item in categoryFlag}}<span class="flag"><span class="blind">제품 카테고리</span>{{item}}</span>{{/each}}</span>' +
            '</span>' +
            // BTOCSITE-3367 마이페이지 > 활동 관리 > 참여 이벤트 : 당첨자발표일 노출관련 "winViewFlag" : "Y", "winViewFlag" : "N"
            '<div class="info">' +
                '<div class="flag-wrap bar-type">{{#each item in eventFlag}}<span class="flag"><span class="blind">이벤트 구분</span>{{item}}</span>{{/each}}</div>' +
                '<p class="tit"><span class="blind">이벤트 제목</span>{{title}}</p>' +
                '<p class="date"><span class="blind">이벤트 기간</span>'+
                '{{#if winViewFlag === "Y"}}'+
                '<p class="date">{{date}}</p>'+
                '{{/if}}'+
                '{{#if winViewFlag === "N"}}'+
                '<p class="date"></p>'+
                '{{/if}}'+
                +'</p>' +
            '</div>' +
            // BTOCSITE-3367 마이페이지 > 활동 관리 > 참여 이벤트 : 당첨자발표일 노출관련 "winViewFlag" : "Y", "winViewFlag" : "N"
        '</a>' +
        '{{#if showEndEventUrl}}<a href="{{#if endEventUrl}}{{endEventUrl}}{{#else}}#{{/if}}" class="btn-link"><span>당첨자 발표</span></a>{{/if}}' +
    '</div></li>'

    $(document).ready(function() {
        var myEvent = {
            init: function() {
                var self = this;
                
                self.setting();
                self.bindEvents();
                self.checkNoData();
                self.requestMoreData(1);
            },

            setting: function() {
                var self = this;
                self.$contWrap = $('div.cont-wrap');
                self.$lnbContents = self.$contWrap.find('div.lnb-contents');
                self.$list = self.$lnbContents.find('div.box-list');
                self.$btnMore = self.$lnbContents.find('button.btn-moreview');
                self.$noData = self.$lnbContents.find('div.no-data');
                self.$evtBox = self.$lnbContents.find('div.lg-evt-box');
            },

            bindEvents: function() {
                var self = this;

                self.$list.on('click', 'div.list-inner a.btn-link', function(e) {
                    e.preventDefault();
                    self.requestModal(this);
                });

                self.$btnMore.on('click', function(e) {
                    var hiddenData = lgkorUI.getHiddenInputData();
                    var page = parseInt(hiddenData.page) + 1;
                    self.requestMoreData(page);
                });
            },

            checkNoData: function() {
                var self = this;
                var $list = self.$list.find('li');
                if($list.length > 0) {
                    var param = lgkorUI.getHiddenInputData();
                    var page = parseInt(param.page);
                    var totalCount = parseInt(param.totalCount);
                    if (page < totalCount) {
                        self.$btnMore.css('display','block');
                    } else {
                        //더이상 없다
                        self.$btnMore.css('display','none');
                    }
                    self.$noData.hide();
                    self.$evtBox.hide();
                    self.$list.show();
                } else {
                    self.$btnMore.css('display','none');

                    self.$noData.show();
                    self.$evtBox.show();
                    self.$list.hide();
                }
            },

            requestMoreData: function(page) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-more-url');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, {'page':page}, function(result){
                    var data = result.data;
                    var param = result.param;
                    self.setPageData(param.pagination);

                    var arr = data instanceof Array ? data : [];
                    var $ul = self.$list.find('ul');
                    arr.forEach(function(item, index) {
                        $ul.append(vcui.template(eventItemList, item));
                    });
                    self.checkNoData();
                });
            },

            setPageData: function(param) {
                var self = this;
                var page = parseInt(param.page);
                var totalCount = parseInt(param.totalCount);
                if (page < totalCount) {
                    self.$btnMore.css('display','block');
                } else {
                    //더이상 없다
                    self.$btnMore.css('display','none');
                }

                lgkorUI.setHiddenInputData({
                    totalCount: totalCount,
                    page: page
                });
            },

            requestModal: function(dm) {
                var self = this;
                var ajaxUrl = $(dm).attr('href');
                lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                    self.openModalFromHtml(result,dm); // BTOCSITE-372 마이페이지-참여이벤트 리스트 노출 오류
                }, null, "html");
            },

            openModalFromHtml: function(html,dm) {
                $('#event-modal').html(html).vcModal($(dm)); // BTOCSITE-372 마이페이지-참여이벤트 리스트 노출 오류
            },
        };

        myEvent.init();
    });
})();