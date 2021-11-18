
(function(){
    var couponItemTemplate = '<li class="lists">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="title line2">제목 타이틀 : 제목을 입력해 주세요</span>' +
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
                '<li class="b-txt">온라인 전용 사용가능 / 쿠폰 중복 할인 불가능</li>' +
                '<li class="b-txt">제품에 따라 일부 제품에서 쿠폰 사용이 불가능 할 수 <br>있습니다.</li>' +
                '<li class="b-txt">장바구니 주문 결제 시 쿠폰 확인 여부를 확인 할 수 있습니다.</li>' +
            '</ul>' +
        '</section>' +
        '<footer class="pop-footer center" ui-modules="Footer">' +
            '<div class="btn-group">' +
                '{{#if end}}' +
                    '<button type="button" class="btn pink" disabled><span>기간만료/사용불가</span></button>' +
                '{{#else}}' +
                    '<button type="button" class="btn pink" data-coupon-url="{{url}}"><span>쿠폰 사용 하러 가기</span></button>' +
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

                self.visibleCount = 12;

                self.$contents = $('div.lnb-contents');

                self.$tab = self.$contents.find('div.ui_tab');
                self.$tabCouponOn = self.$contents.find('#tab-info'); //
                self.$tabCouponEnd = self.$contents.find('#tab-coupon'); //

                self.$couponOnList = self.$tabCouponOn.find('div.cl_list ul');
                self.$couponEndList = self.$tabCouponEnd.find('div.cl_list ul');

                self.$couponOnMore = self.$tabCouponOn.find('button.btn-moreview');
                self.$couponOnMore.data("page", 0);
                self.$couponOnMore.data("tabIndex", 0);

                self.$couponEndMore = self.$tabCouponEnd.find('button.btn-moreview');
                self.$couponEndMore.data("page", 0);
                self.$couponEndMore.data("tabIndex", 1);

                self.$couponOnMore.hide();
                self.$couponEndMore.hide();

                //self.$couponOnNoData = self.$tabCouponOn.find('div.no-data'); //

                //self.$couponEndNoData = self.$tabCouponEnd.find('div.no-data'); //

                //self.$couponPopup = $('#couponPopup'); //
            },

            bindEvents: function() {
                var self = this;

                console.log("ssss", self.$couponOnList);
                //주영 삭제
                // self.$contents.find('div.cl_list').on('click','li a', function(e){
                //     e.preventDefault();
                //     var $li = $(this).parent();
                //     var obj = JSON.parse($li.attr('data-json'));
                    
                //     self.$couponPopup.html(vcui.template(couponPopupTemplate, obj));
                //     self.$couponPopup.vcModal({opener:$(this)});
                // });

                self.$contents.find('button.btn-moreview').on('click',function(e){
                    var tabIndex = $(this).data("tabIndex");
                    var page = $(this).data("page");

                    $(this).data('page', page+1);

                    self.addCouponList(tabIndex, page+1);
                });

                // self.$couponPopup.on('click','div.btn-group button', function(e){
                //     var url = $(this).attr("data-coupon-url");
                //     if(!(!url)) {
                //         location.href = url;
                //     }
                // });
            },

            requestCouponData: function() {
                var self = this;    

                lgkorUI.showLoading();            

                var ajaxUrl = self.$contents.attr('data-clatter-list');
                lgkorUI.requestAjaxData(ajaxUrl, {}, function(result) {
                    //self.listData.push(result.data.onListData);
                    //self.listData.push(result.data.endListData);
                    self.listData.push(result.data.listData);

                    //console.log("zzzzz", result.data);
                    //console.log("kkkkk", result.data.listData);

                    self.$couponOnMore.hide(); 
                    self.$couponEndMore.hide();

                    self.setCouponList(0);
                    //self.setCouponList(1);

                    console.log("gggg", self.setCouponList);

                    lgkorUI.hideLoading();
                });
            },

            setCouponList: function(idx){
                var self = this;

                var targetList;

                if(idx){
                    targetList = self.$couponEndList;
                    //noData = self.$couponEndNoData;
                } else{
                    targetList = self.$couponOnList;
                    //noData = self.$couponOnNoData;
                }

                targetList.empty();

                // var t = self.listData[idx];

                // for(var i=0; i<count ; i++) {
                //     console.log("test " + t[i].typeFlag);
                // }

                var count = self.listData[idx].length;

                //주영 테스트 흔적
                console.log("count_.length:", count);
                console.log("count_1_[idx]:", self.listData[idx]);
                console.log("count_2_listData:", self.listData);
                console.log("count_3_typeFlag:", self.listData.typeFlag);
                console.log("count_3:", self.listData[0].typeFlag);

                if(count > 0){
                    //noData.hide();
                    targetList.show();
                    //self.$tab.find('ul li').eq(idx).find('.count').text("(" + self.listData[idx].length + ")");

                    self.addCouponList(idx, 0);
                } else{
                    //noData.show();
                    targetList.hide();
                    //self.$tab.find('ul li').eq(idx).find('.count').text("");

                    //if(idx) self.$tabCouponEnd.find('.coupon-end-txt').hide();
                }
                //self.addCouponList(idx, 0); //여기에 추가
            },

            addCouponList: function(idx, page){
                var self = this;

                var targetList = idx ? self.$couponEndList : self.$couponOnList;
                var moreButton = idx ? self.$couponEndMore : self.$couponOnMore;
                var listbottom = targetList.offset().top + targetList.height();
                var totalList = self.listData[idx].length;
                var start = page*self.visibleCount;
                var end = start + self.visibleCount;

                console.log("totalList:", totalList);
                console.log("page:", page)

                if(end > totalList) end = totalList;

                for(var i=start;i<end;i++){
                    var item = self.listData[idx][i];
                    item.startDate = !item.startDate ? null : vcui.date.format(item.startDate,'yyyy.MM.dd');
                    item.endDate = !item.endDate ? null : vcui.date.format(item.endDate,'yyyy.MM.dd');
                    item.jsonString = JSON.stringify(item);
                    
                    targetList.append(vcui.template(couponItemTemplate, item));
                }
                
                console.log("addCouponList - item:", item);

                if(end >= totalList) moreButton.hide();
                else moreButton.show();

                if(page > 0){
                    $('html, body').stop().animate({scrollTop:listbottom}, 420);
                }
            }
        }

        coupon.init();
    });
})();