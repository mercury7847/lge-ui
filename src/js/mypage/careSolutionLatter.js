(function() {
    var careSolutionLatterItemTemplate = '<li class="lists">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="title line2">' +

                    '{{#if typeof stateFlag !== "undefined"}}' +

                        '{{#if stateFlag == "Y"}}' +
                            '<em class="proceed">[진행중]</em> ' +
                            '{{title}}' +
                        '{{#else}}' +
                            '<em>[쿠폰종료]</em> ' +
                            '{{title}}' +
                        '{{/if}}' +

                    '{{#else}}' +

                        '{{title}}' +
                    '{{/if}}' +

                '</span>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="accord-cont ui_accord_content" style="display:none;">' +
            '<div class="latter-acrord_content">' +
                '<div>' +
                    '<p class="text">' +
                        '{{subTitle}}' +
                    '</p>' +
                    '<a href="/my-page/care-solution-letter/care-info-detail?letterId={{letterId}}" class="btn-link">자세히 보기</a>' +
                '</div>' +
                '<p class="thumb">' +
                    '<img src="{{imagePath}}{{imageNameM}}" alt="썸네일 이미지">' +
                '</p>' +
            '</div>' +
        '</div>' +
    '</li>';


    $(window).ready(function() {

        var coupon = {
            init: function() {
                var self = this;
                self.setting();
                self.bindEvents();

                /* 초기 데이터 출력 */
                self.requestCareLatterData('info', 1);
                self.requestCareLatterData('coupon', 1);

            },
            setting: function() {
                
                var self = this;
                self.listData = [];
                self.visibleCount = 12;
                // self.visibleCount = 1;
                self.$contents = $('div.lnb-contents');
                self.$tab = self.$contents.find('div.ui_tab');

                self.$tabInfo = self.$contents.find('#tab-info');
                self.$tabCoupon = self.$contents.find('#tab-coupon');

                self.$cl_detail_info = self.$contents.find('.cl_info_detail_bTn');
                self.$cl_detail_coupon = self.$contents.find('.cl_coupon_detail_bTn');

                self.$cl_info_OnList = self.$tabInfo.find('div.cl_list ul');
                self.$cl_coupon_OnList = self.$tabCoupon.find('div.cl_list ul');
                self.$cl_infoMore = self.$tabInfo.find('button.btn-moreview');
                self.$cl_infoMore.data("page", 2);
                self.$cl_infoMore.data("tabIndex", 0);

                self.$cl_couponMore = self.$tabCoupon.find('button.btn-moreview');
                self.$cl_couponMore.data("page", 2);
                self.$cl_couponMore.data("tabIndex", 1);


                self.currentTab = function() {
                    var el = self.$tab.find('.on > a');
                    return el.attr('aria-controls').replace('tab-', '');
                };

                // self.$cl_infoMore.hide();
                // self.$cl_couponMore.hide();
                //self.$couponOnNoData = self.$tabInfo.find('div.no-data'); //
                //self.$couponEndNoData = self.$tabCoupon.find('div.no-data'); //
                //self.$couponPopup = $('#couponPopup'); //
                
                //주영
                var tabName = lgkorUI.getParameterByName('tabName');
                var currentIndex = 0;
                console.log("tabName", tabName)
                if( tabName != "" && tabName != undefined && tabName == "coupon") {
                    currentIndex = 1;
                } 
                $('.tabs-wrap').vcTab('select', currentIndex, false);
            },

            bindEvents: function() {

                var self = this;
    
                self.$contents.find('button.btn-moreview').on('click', function(e) {

                    var page = $(this).data("page");
                    $(this).data('page', page + 1);
                    console.log(self.currentTab(), page);
                    self.requestCareLatterData(self.currentTab(), page);

                    // self.addCouponList(tabIndex, page+1);

                });

                
                self.$cl_detail_info.on('click', function(e) {
                    e.preventDefault();
                    $(location).attr("href", "/my-page/care-solution-letter");
                });
                self.$cl_detail_coupon.on('click', function(e) {
                    e.preventDefault();
                    $(location).attr("href", "/my-page/care-solution-letter?tabName=coupon");
                });
            },
            

            requestCareLatterData: function( cate , page ) {
                var self = this;
                /* ajax 인디케이터 시작 */
                lgkorUI.showLoading();

                var ajaxUrl = self.$contents.attr('data-clatter-list');

                var pageParam = (cate === 'info') ? 'infoPage' : 'couponPage';
                var ajaxParams = JSON.parse( '{ "' +  pageParam + '" : ' + page + '}' );

                //console.log("tttt", cate);
                
                lgkorUI.requestAjaxData(ajaxUrl, ajaxParams , function(result) {

                    var elList = (cate === 'info') ? self.$cl_info_OnList : self.$cl_coupon_OnList;
                    var data = (cate === 'info') ? result.data.infoList : result.data.couponList;

                    //console.log("test", tetete);
                    //console.log("리절트", result.data.infoList.listData[1].title);
                    //console.log("data??", data);

                    /* 비동기 데이터 출력 */
                    self.putList( elList, data );

                    //console.log("dnjTm", elList)
                    //console.log("dnjTm", data)

                    /* ajax 인디케이터 종료 */
                    lgkorUI.hideLoading();
                });
            },

            putList: function(el, rows) {
                var self = this;
                var pagination = rows.pagination;
                var moreBtn = el.closest('.tab-contents').attr('aria-labelledby').replace('tab-', '') === 'info' ? self.$cl_infoMore : self.$cl_couponMore;

                var isLast = self.visibleCount * pagination.page >= rows.totalCount;

                //console.log("더 보기", isLast);
                //console.log("page", pagination.page);
                //console.log("totalCount", rows.totalCount);
                //console.log("el", el);

                //console.log("rows", rows.infoList);

                /* 페이징  값이 null일 경우와 마지막 페이지 일 경우 버튼 감춤 처리 */
                if (pagination.page === null || isLast) {
                    moreBtn.hide();
                }
                $.each(rows.listData, function(idx, item) { //원래 이거 : rows.listData
                    el.append(vcui.template(careSolutionLatterItemTemplate, item));

                    //console.log("1111111",rows.listData);
                    //console.log("1111111",data);
                    //console.log("1111111",result);
                    //console.log("rows???", rows);

                    //each 돌고
                    //console.log("rows???", rows.listData[0].stateFlag);
                });
                
                
            }
        }
        coupon.init();
    });
})();