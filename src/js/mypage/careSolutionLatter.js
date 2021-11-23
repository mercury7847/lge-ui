(function() {



    var couponItemTemplate = '<li class="lists">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="title line2">{{title}}</span>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="accord-cont ui_accord_content" style="display:none;">' +
            '<div class="latter-acrord_content">' +
                '<div>' +
                    '<p class="text">' +
                        '차로 마셔도 맛있고 요리에 첨가해도 좋은 여름 제철 과일 매실!<br>' +
                        '이번 케어솔루션 레터에서는 상큼상큼한 매실청 만드는 방법을 소개해 드립니다.' +
                    '</p>' +
                    '<a href="#n" class="btn-link">자세히 보기</a>' +
                '</div>' +
                '<p class="thumb">' +
                    '<img src="/lg5-common/images/MYC/care/thumbnail_img.jpg" alt="썸네일 이미지">' +
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
                self.requestCouponData('info', 1);
                self.requestCouponData('coupon', 1);


            },
            setting: function() {

                var self = this;
                self.listData = [];
                self.visibleCount = 3;
                // self.visibleCount = 1;
                self.$contents = $('div.lnb-contents');
                self.$tab = self.$contents.find('div.ui_tab');

                self.$tabCouponOn = self.$contents.find('#tab-info');
                self.$tabCouponEnd = self.$contents.find('#tab-coupon');
                self.$couponOnList = self.$tabCouponOn.find('div.cl_list ul');
                self.$couponEndList = self.$tabCouponEnd.find('div.cl_list ul');
                self.$couponOnMore = self.$tabCouponOn.find('button.btn-moreview');
                self.$couponOnMore.data("page", 2);
                self.$couponOnMore.data("tabIndex", 0);

                self.$couponEndMore = self.$tabCouponEnd.find('button.btn-moreview');
                self.$couponEndMore.data("page", 2);
                self.$couponEndMore.data("tabIndex", 1);


                self.currentTab = function() {
                    var el = self.$tab.find('.on > a');
                    return el.attr('aria-controls').replace('tab-', '');
                };

                // self.$couponOnMore.hide();
                // self.$couponEndMore.hide();
                //self.$couponOnNoData = self.$tabCouponOn.find('div.no-data'); //
                //self.$couponEndNoData = self.$tabCouponEnd.find('div.no-data'); //
                //self.$couponPopup = $('#couponPopup'); //
            },

            bindEvents: function() {


                var self = this;

                //주영 삭제
                // self.$contents.find('div.cl_list').on('click','li a', function(e){
                //     e.preventDefault();
                //     var $li = $(this).parent();
                //     var obj = JSON.parse($li.attr('data-json'));
                //     self.$couponPopup.html(vcui.template(couponPopupTemplate, obj));
                //     self.$couponPopup.vcModal({opener:$(this)});
                // });



                self.$contents.find('button.btn-moreview').on('click', function(e) {


                    var page = $(this).data("page");
                    $(this).data('page', page + 1);
                    console.log(self.currentTab(), page);
                    self.requestCouponData(self.currentTab(), page);

                    // self.addCouponList(tabIndex, page+1);


                });

                // self.$couponPopup.on('click','div.btn-group button', function(e){
                //     var url = $(this).attr("data-coupon-url");
                //     if(!(!url)) {
                //         location.href = url;
                //     }
                // });


            },

            requestCouponData: function(cate, page) {
                var self = this;
                /* ajax 인디케이터 시작 */
                lgkorUI.showLoading();

                var ajaxUrl = self.$contents.attr('data-clatter-list');


                lgkorUI.requestAjaxData(ajaxUrl, { "page": page }, function(result) {
                    var elList = (cate === 'info') ? self.$couponOnList : self.$couponEndList;
                    var data = (cate === 'info') ? result.data.infoList : result.data.couponList;

                    /* 비동기 데이터 출력 */
                    self.putList(elList, data);

                    /* ajax 인디케이터 종료 */
                    lgkorUI.hideLoading();
                });
            },

            putList: function(el, rows) {
                var self = this;
                var pagination = rows.pagination;
                //console.log("불러온 데이터", rows);
                var moreBtn = el.closest('.tab-contents').attr('aria-labelledby').replace('tab-', '') === 'info' ? self.$couponOnMore : self.$couponEndMore;
                console.log("ssss", moreBtn)

                var isLast = self.visibleCount * pagination.page >= pagination.totalCount;

                /* 페이징  값이 null일 경우와 마지막 페이지 일 경우 버튼 감춤 처리 */
                if (pagination.page === null || isLast) {
                    moreBtn.hide();
                }
                $.each(rows.listData, function(idx, item) {
                    el.append(vcui.template(couponItemTemplate, item));
                });
            }
        }
        coupon.init();
    });
})();