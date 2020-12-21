(function() {
    var restockItemTemplate = '<div class="row">' +
        '<div class="col-table">' +
            '<div class="col col1">' +
                '<span class="blind">제품정보</span>' +
                '<div class="product-info">' +
                    '<div class="thumb">' +
                        '<a href="#n"><img src="{{imageUrl}}" alt="{{imageAlt}}"></a>' +
                    '</div>' +
                    '<div class="infos">' +
                        '<p class="name"><a href="#n"><span class="blind">제품명</span>{{title}}</a></p>' +
                        '<p class="e-name"><span class="blind">영문제품번호</span>{{sku}}</p>' +
                        '<p class="count">구매 희망 수량 : {{quantity}}</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="col col2">' +
                '<p class="application-date"><span class="m-only">신청일 : </span>{{applyDay}}</p>' +
            '</div>' +
            '<div class="col col3">' +
                '<p class="application-date small"><span class="m-only">알림 발송 번호 : </span>{{tel}}</p>' +
            '</div>' +
            '<div class="col col4">' +
                '<p class="application-date small"><span class="m-only">SMS 발송일 : </span>{{notifyDay}}</p>' +
            '</div>' +
        '</div>' +
    '</div>';

    $(window).ready(function() {

        var myRestock = {         
            init: function() {
                var self = this;
                vcui.require(['ui/datePeriodFilter'], function () {
                    self.setting();
                    self.bindEvents();
                });
            },

            setting: function() {
                var self = this;                
                self.$contents = $('div.lnb-contents');
                self.$termFilter = self.$contents.find('.filters');
                self.$termFilter.vcDatePeriodFilter();
                self.$list = self.$contents.find('div.tbl-layout div.tbody');
                self.$btnMore = self.$contents.find('button.btn-moreview');
                self.$noData = self.$contents.find('div.no-data');

                self.checkNoData();
            },

            bindEvents: function() {
                var self = this;

                self.$termFilter.on('dateFilter_submit', function(e, data) {
                    var param = data;
                    param.page = 1;
                    self.requestData(data, false);
                });

                self.$btnMore.on('click', function(e) {
                    var param = self.$termFilter.vcDatePeriodFilter('getSelectOption');
                    if(param) {
                        var hiddenData = lgkorUI.getHiddenInputData();
                        param.page = parseInt(hiddenData.page) + 1;
                        self.requestData(param, true);
                    }
                });
            },

            requestData: function(param, isMore) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    var param = result.param;
                    self.setPageData(param.pagination);
                    if(!isMore) {
                        self.$list.empty();
                    }
                    var arr = data.listData instanceof Array ? data.listData : [];
                    arr.forEach(function(item, index) {
                        item.applyDay = vcui.date.format(item.applyDay,'yyyy.MM.dd');
                        item.notifyDay = vcui.date.format(item.notifyDay,'yyyy.MM.dd');
                        item.quantity = vcui.number.addComma(item.quantity);
                        self.$list.append(vcui.template(restockItemTemplate, item));
                    });
                    if(!isMore) {
                        self.checkNoData();
                    }
                });
            },

            setPageData: function(param) {
                var self = this;
                var page = parseInt(param.page);
                var totalCount = parseInt(param.totalCount);
                if (page < totalCount) {
                    self.$btnMore.show();
                } else {
                    //더이상 없다
                    self.$btnMore.hide();
                }

                lgkorUI.setHiddenInputData({
                    totalCount: totalCount,
                    page: page
                });
            },

            checkNoData: function() {
                var self = this;
                var $list = self.$list.find('div.row');
                if($list.length > 0) {
                    var param = lgkorUI.getHiddenInputData();
                    var page = parseInt(param.page);
                    var totalCount = parseInt(param.totalCount);
                    if (page < totalCount) {
                        self.$btnMore.show();
                    } else {
                        //더이상 없다
                        self.$btnMore.hide();
                    }
                    self.$noData.hide();
                } else {
                    self.$btnMore.hide();
                    self.$noData.show();
                }
            }
        }
        
        myRestock.init();
    });
})();