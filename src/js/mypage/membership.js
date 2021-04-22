(function() {
    /*
    function cardNumber(str) {
        return str.replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
    }
    function phoneNumber(str) {
        return str.replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1-$2-$3');
    }
*/

    var listItemTemplate = '<li class="item">' +
        '{{#if (pdpUrl && pdpUrl.length > 0)}}<a href="{{pdpUrl}}">{{/if}}' +
            '<div class="inner">' +
                // '<div class="product-image">' +
                //     '<span class="img"><img src="{{imageUrl}}" alt="{{imageAlt}}"></span>' +
                // '</div>' +
                '<div class="product-info">' +
                    '<div class="product-name">' +
                        '<strong>{{#raw produncName}}</strong><span class="model-num">{{sku}}</span>' +
                    '</div>' +
                    '<div class="info-area"><ul>' +
                        '<li>{{#if quantity!=null}}구매수량 : {{quantity}}{{/if}}</li>' +
                        '{{#if store}}<li>{{store}}</li>{{/if}}' +
                        '{{#if date}}<li>{{date}}{{#if type}} {{type}}{{/if}}</li>{{/if}}' +
                        '{{#if serviceDt}}<li>서비스 기간 :<br>{{serviceDt}}</li>{{/if}}' +
                    '</ul></div>' +
                '</div>' +
            '</div>' +
        '{{#if (pdpUrl && pdpUrl.length > 0)}}</a>{{/if}}' +
    '</li>'

    var dataTypeBuy = 0;
    var dataTypeFree = 1;

    var myMembership = {
        init: function() {
            var self = this;
            
            self.setting();
            vcui.require(['ui/pagination', 'ui/datePeriodFilter'], function () {
                self.$pagination.eq(dataTypeBuy).vcPagination({scrollTarget:self.titWrap.eq(dataTypeBuy)});
                self.$pagination.eq(dataTypeFree).vcPagination({scrollTarget:self.titWrap.eq(dataTypeFree)});
                self.$dateFilter.vcDatePeriodFilter({"dateBetweenCheckValue":"3m","dateBetweenCheckEnable":false});
                self.bindEvents();

                self.$inquiryButton.trigger('click');
            });

            //self.checkNoData();
        },

        setting: function() {
            var self = this;
            self.$contWrap = $('div.cont-wrap');
            self.$editButton = self.$contWrap.find('#membershipEditButton');
            self.$dateFilter = self.$contWrap.find('div.filters');
            self.$inquiryButton = self.$dateFilter.find('button.calendarInquiry-btn');
            self.$memberlist = self.$contWrap.find('div.member-lists');
            self.$noData = self.$contWrap.find('div.no-data');
            self.$pagination =  self.$contWrap.find('div.pagination');
            self.titWrap = self.$memberlist.parents('.sects').find('.tit-wrap');
        },

        bindEvents: function() {
            var self = this;

            self.$editButton.on('click', function (e) {
                var url = $(this).attr('data-link-url');
                location.href = url;
            });

            //조회 버튼
            self.$inquiryButton.on('click',function (e) {
                self.requestData(dataTypeBuy, 1, false);
                self.requestData(dataTypeFree, 1, true);
            });

            //멤버십 포인트 종류 라디오버튼
            self.$dateFilter.on('change','.select-list-wrap input[type=radio]',function(e){
                self.$inquiryButton.trigger('click');
            });

            //페이지
            self.$pagination.eq(dataTypeBuy).on('page_click', function(e, data) {
                self.requestData(dataTypeBuy, data, true);
            });

            self.$pagination.eq(dataTypeFree).on('page_click', function(e, data) {
                self.requestData(dataTypeFree, data, true);
            });
        },

        requestData: function(dataType, page, showLoading) {
            var self = this;
            var isBuy = (dataType == dataTypeBuy);
            
            var param = self.$dateFilter.vcDatePeriodFilter('getSelectOption');
            param.page = page;

            if(showLoading) lgkorUI.showLoading();
            var ajaxUrl = isBuy ? self.$contWrap.attr('data-buy-url') : self.$contWrap.attr('data-free-url');
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                var data = result.data;
                //페이지
                self.$pagination.eq(dataType).vcPagination('setPageInfo',result.param.pagination);

                var arr = data instanceof Array ? data : [];
                var $list = self.$memberlist.eq(dataType).find('ul');
                $list.empty();
                if(arr.length > 0) {
                    arr.forEach(function(item, index) {
                        item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                        item.store = item.store ? item.store : null; 
                        item.serviceDt = item.serviceDt ? item.serviceDt : null;
                        $list.append(vcui.template(listItemTemplate, item));
                    });
                }
                self.checkNoData(dataType);
            });
        },

        checkNoData: function(dataType) {
            var self = this;
            var $list = self.$memberlist.eq(dataType).find('li.item');
            if($list.length > 0) {
                self.$memberlist.eq(dataType).show();
                self.$pagination.eq(dataType).show();
                self.$noData.eq(dataType).hide();
            } else {
                self.$memberlist.eq(dataType).hide();
                self.$pagination.eq(dataType).hide();
                self.$noData.eq(dataType).show();
            }
        },
    };

    $(document).ready(function() {
        myMembership.init();                
    });
})();