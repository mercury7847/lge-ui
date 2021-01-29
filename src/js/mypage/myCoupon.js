
(function(){
    var couponItemTemplate = '<li class="lists" data-json="{{jsonString}}">' +
        '<a href="#n" class="coupon-box{{#if type}} {{type}}{{/if}}{{#if end}} disabled{{/if}}" title="쿠폰 자세히 보기">' +
            '<div class="coupon-cont">' +
                '<div class="top">' +
                    '<p class="name">{{title}}</p>' +
                    '{{#if sale}}<p class="discount"><em>{{sale}}%</em> 할인</p>{{/if}}' +
                '</div>' +
                '<p class="desc">[{{desc}}]</p>' +
                '<div class="bottom">' +
                    '{{#if validDate}}<p>유효기간 : {{validDate}}</p>{{/if}}' +
                    '{{#if (startDate||endDate)}}<p>유효기간 : {{startDate}}~{{endDate}}</p>{{/if}}' +
                    '{{#if more}}<p class="more">{{more}}</p>{{/if}}' +
                '</div>' +
                '{{#if end}}<div class="end-flags">사용완료</div>{{/if}}' +
            '</div><span class="coupon-bg" aria-hidden="true"><em>LGE COUPON</em></span>' +
        '</a>' +
    '</li>'

    var couponPopupTemplate = '<header class="pop-header">' +
            '<h1 class="tit" id="modal_6_title"><span>{{title}}</span></h1>' +
        '</header>' +
        '<section class="pop-conts common-pop mypage" id="modal_6_content">' +
            '<div class="coupon-info-moreview">' + 
                '<p class="title">[{{desc}}]</p>' +
                '{{#if sale}}<p class="desc"><em>{{sale}}%</em>할인</p>{{/if}}' +
                '{{#if validDate}}<p class="info">유효기간 : {{validDate}}</p>{{/if}}' +
                '{{#if (startDate||endDate)}}<p class="info">유효기간 : {{startDate}}~{{endDate}}</p>{{/if}}' +
                '{{#if more}}<p class="info">{{more}}</p>{{/if}}' +
            '</div>' +
            '<ul class="bullet-list">' +
                '{{#each item in notice}}<li class="b-txt">{{item}}</li>{{/each}}' +
            '</ul>' +
        '</section>' +
        '<footer class="pop-footer center" ui-modules="Footer">' +
            '<div class="btn-group">' +
                '{{#if end}}' +
                    '<button type="button" class="btn pink" disabled><span>기간만료/사용불가</span></button>' +
                '{{#else}}' +
                    '<button type="button" class="btn pink" data-coupon-url={{url}}><span>쿠폰 사용 하러 가기</span></button>' +
                '{{/if}}' +
            '</div>' +
        '</footer>' +
    '<button type="button" class="btn-close ui_modal_close"><span class="blind">닫기</span></button>'

    $(window).ready(function() {
        var coupon = {
            init: function(){
                var self = this;
                self.setting();
                self.bindEvents();

                self.requestCouponData();
            },

            setting: function() {
                var self = this;

                self.listData = [];

                self.showListLength = 12;

                self.$contents = $('div.lnb-contents');

                self.$tab = self.$contents.find('div.ui_tab');
                self.$tabCouponOn = self.$contents.find('#tab-coupon-on');
                self.$tabCouponEnd = self.$contents.find('#tab-coupon-end');

                self.$couponOnList = self.$tabCouponOn.find('div.coupon-lists ul');
                self.$couponOnList.data("page", 0);

                self.$couponEndList = self.$tabCouponEnd.find('div.coupon-lists ul');
                self.$couponEndList.data("page", 0);

                self.$couponOnMore = self.$tabCouponOn.find('button.btn-moreview');
                self.$couponEndMore = self.$tabCouponEnd.find('button.btn-moreview');

                self.$couponOnNoData = self.$tabCouponOn.find('div.no-data');
                self.$couponEndNoData = self.$tabCouponEnd.find('div.no-data');

                self.$couponPopup = $('#couponPopup');
            },

            bindEvents: function() {
                var self = this;

                self.$contents.find('div.coupon-lists').on('click','li a', function(e){
                    e.preventDefault();
                    var $li = $(this).parent();
                    var obj = JSON.parse($li.attr('data-json'));
                    self.$couponPopup.html(vcui.template(couponPopupTemplate, obj));
                    self.$couponPopup.vcModal();
                });

                self.$contents.find('button.btn-moreview').on('click',function(e){
                    var selectIdx = self.$tab.vcTab('getSelectIdx');
                    var hiddenData = lgkorUI.getHiddenInputData(null,null,selectIdx);
                    var page = parseInt(hiddenData.page) + 1;
                    self.requestCouponData(selectIdx,page);
                });

                self.$couponPopup.on('click','div.btn-group button', function(e){
                    var url = $(this).attr("data-coupon-url");
                    if(!(!url)) {
                        location.href = url;
                    }
                });
            },

            requestCouponData: function() {
                var self = this;    

                lgkorUI.showLoading();            

                var ajaxUrl = self.$contents.attr('data-coupon-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, {}, function(result) {
                    
                    self.listData.push(result.data.onListData);
                    self.listData.push(result.data.endListData);

                    self.setCouponList(0);
                    self.setCouponList(1);

                    lgkorUI.hideLoading();
                });
            },

            setCouponList: function(idx){
                var self = this;

                self.$couponOnMore.hide();
                self.$couponEndMore.hide();

                var targetList, noData;
                if(idx){
                    targetList = self.$couponEndList;
                    noData = self.$couponEndNoData;
                } else{
                    targetList = self.$couponOnList;
                    noData = self.$couponOnNoData;
                }

                targetList.empty();
                if(self.listData[idx].length){
                    noData.hide();
                    targetList.show();
                    
                    self.$tab.find('ul li').eq(idx).find('.count').text("(" + self.listData[idx].length + ")");

                    self.addCouponList(idx, 0);
                } else{
                    noData.show();
                    targetList.hide();

                    if(idx) self.$tabCouponEnd.find('.coupon-end-txt').hide();
                }
            },

            addCouponList: function(idx, page){
                var self = this;

                var targetList = idx ? self.$couponEndList : self.$couponOnList;
                var moreButton = idx ? self.$couponEndMore : self.$couponOnMore;
                var totalList = self.listData[idx].length;
                var leng = page + self.showListLength;
                if(leng > totalList) leng = totalList;
                for(var i=page;i<leng;i++){
                    var item = self.listData[idx][i];
                    item.startDate = !item.startDate ? null : vcui.date.format(item.startDate,'yyyy.MM.dd');
                    item.endDate = !item.endDate ? null : vcui.date.format(item.endDate,'yyyy.MM.dd');
                    item.jsonString = JSON.stringify(item);
                    targetList.append(vcui.template(couponItemTemplate, item));
                }
                console.log(leng, totalList, moreButton);
                
                if(leng >= totalList) moreButton.hide();
                else moreButton.show();
            }
        }

        coupon.init();
    });
})();